import { Body, CanActivate, Controller, Post, Get, Req, UseGuards, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dtos/signup.dto';
import { loginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async SignUp(@Body() SignupData: signupDto){
    return this.authService.Signup(SignupData)
  }

  @Post('login')
  async Login(@Body() Credential: loginDto){
    return this.authService.login(Credential)
  }

  @Post('refresh')
  async refershToken(@Body() refreshTokenDto: RefreshTokenDto){
    return this.authService.refreshTokens(refreshTokenDto.refreshToken)
  }

  @UseGuards(AuthenticationGuard)
  @Get()
      someProtectedRoute(@Req() req) {
          return { message: 'Accessed Resource', userId: req.userId };
    }


  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto:ChangePasswordDto, @Req() req) {

    return this.authService.changePassword(
    req.userId,
    changePasswordDto.oldPassword,
    changePasswordDto.newPassword
    )
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Put('reset-password')
   async resetPassword (@Body() resetPasswordDto: ResetPasswordDto){
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken
    )}


  @Get('user-role/:id')
    async GetUserPermissions(@Param('id') id:string){
      return this.authService.getUserPermissions(id)

      }
    
}

