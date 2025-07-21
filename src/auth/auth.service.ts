import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/user.schema';
import { Model } from 'mongoose';
import { signupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt'
import { loginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './Schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'rxjs';
import { nanoid } from 'nanoid';
import { ResetToken } from './Schemas/reset-token.dto';
import { MailService } from 'src/Services/mail.service';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel:Model<User>,
        @InjectModel(RefreshToken.name) private RefreshTokenModel:Model<RefreshToken>,
        @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
        private jwtService: JwtService,
        private mailService: MailService,
        private rolesService: RolesService
    ){}

    async Signup(SignupData:signupDto){
        const {email, name, password} = SignupData
        //check if email Is in Use
        const emailInUse = await this.UserModel.findOne({email})
        if(emailInUse) {
            throw new BadRequestException('email already exists')
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        //creat userdocument ane save in mongodb
        await this.UserModel.create({
            name,
            email,
            password: hashedPassword
        })
    }

    async login(Credential:loginDto){
        const {email, password} = Credential
        //Find if user exists by email
        const user = await this.UserModel.findOne({email})
        if(!user){
            throw new UnauthorizedException('wrong Credentials')
        }
        //compare entered password with existing password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            throw new UnauthorizedException('wrong Credentials')
        }
        //generate JWT tokens
        return this.generateUserTokens(user.id)

    }
    async refreshTokens(refershToken:string){
        const token = await this.RefreshTokenModel.findOne({
            token:refershToken,
            expiryDate:{$gte: new Date()}
        })
        if(!token){
            throw new UnauthorizedException('Refresh Token Invalid')
        }
        return this.generateUserTokens(token.id)

    }
    
    async generateUserTokens(_id: string){
    const accessToken = await this.jwtService.sign({_id},{expiresIn: '1h'})
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken,_id)

    return {
        accessToken,
        refreshToken
    }
 }

    async storeRefreshToken (token:string, _id: string) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.updateOne(
      { _id },
      { $set: { expiryDate, token } },
      {
        upsert: true,
      },
    );
  }

    async changePassword(userId: string, oldPassword: string, newPassword: string){
        //Find the User
        const user = await this.UserModel.findById(userId)
    
        if(!user){
            throw new NotFoundException('user not found')
        }
        //compare the old password with the password in DB
        const passwordMatch = await bcrypt.compare(oldPassword,user.password)
        if(!passwordMatch){
            throw new UnauthorizedException('Wrong credentials')
        }
        //change user's password 
        const newHashedPassword = await bcrypt.hash(newPassword,10)
        user.password = newHashedPassword
        await user.save()
        
  }

    async forgotPassword(email: string){
        //check that user exists
        const user = await this.UserModel.findOne({email})
        if(user){
        //If user exists, generats password reset link
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

        const resetToken = nanoid(64)
        await this.ResetTokenModel.create({
            token:resetToken,
            userId:user._id,
            expiryDate,
        })

        //send the link to the user by email
        this.mailService.sendPasswordResetEmail(email, resetToken)

    }
        return {message : 'If this user exists, they will recive an email'}
  
}
    async resetPassword(newPassword:string , resetToken:string){
        //Find a valid reset token document
        const token = await this.ResetTokenModel.findOneAndDelete({
            token: resetToken,
            expiryDate:{$gte: new Date()}
        })
        if(!token){
            throw new UnauthorizedException('Invalid link')
        }
        //change user password 
        const user = await this.UserModel.findById(token.userId)
        if(!user){
            throw new InternalServerErrorException()
        }
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
    }

    async getUserPermissions(_id: string){
        const user = await this.UserModel.findById(_id);

        if(!user) throw new BadRequestException();
        
            const role = await this.rolesService.getRoleById(user.roleId.toString())

            if (!role) {
                throw new BadRequestException('Role not found');
}
            return role.permissions;
    }
}  