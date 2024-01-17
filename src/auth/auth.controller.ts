import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from './authGuard';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>,@Res({passthrough : true}) response : Response) {

    let datetime = new Date(new Date().toLocaleString())
    let time = datetime.getHours().toString() + ":" + datetime.getMinutes().toString()+ ":" + datetime.getSeconds().toString();
    console.log(time);
    let datetime1 = new Date(Date.now())
    let time1 = datetime1.toLocaleTimeString()
    console.log(time1);
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

