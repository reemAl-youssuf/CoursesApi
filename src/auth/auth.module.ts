import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from './Schemas/user.schema';
import { RefreshToken, RefreshTokenSchema } from './Schemas/refresh-token.schema';
import { ResetToken, ResetTokenSchema } from './Schemas/reset-token.dto';
import { MailService } from 'src/Services/mail.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[
    RolesModule,
    MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  },
  {
    name: RefreshToken.name,
    schema: RefreshTokenSchema
  },
  {
    name: ResetToken.name,
    schema: ResetTokenSchema
  }
])],
  controllers: [AuthController],
  providers: [AuthService, MailService],
  exports:[AuthService]
})
export class AuthModule {}
