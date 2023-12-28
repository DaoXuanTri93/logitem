import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from './authGuard';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>,@Res({passthrough : true}) response : Response) {
    return this.authService.signIn(signInDto,response);
  }

  @UseGuards(AuthGuard)
  @Get('user')
   async getProfile(@Request() req) {
    return req.user;
  }


  @Post('logout')
  logOut(@Res({passthrough : true}) response:Response) {
      response.clearCookie('jwt');
      return {messeage : " Logout success"}
  }

  @UseGuards(AuthGuard)
  @Post('changePassword')
  async changePassword(@Request() req, @Body() body : any){
    
    return await this.authService.changePassword(req,body);
  }
}

