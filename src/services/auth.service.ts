import { HttpException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserServices } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/models/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserServices,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto, response) {

    let user = new Users();
    user = await this.usersService.findOneByUserName(signInDto.username);
    if (user == null) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }
    if (user?.password !== signInDto.password || user == null) {

      throw new HttpException('Password is not correct, please try again', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }

    if (signInDto.isWeb) {
      if (user.role != "DRIVER") {
        const payload = { sub: user.id, username: user.username, password: user.password, MAC: user.MAC, role: user.role };
        const jwt = await this.jwtService.signAsync(payload);
        response.cookie('jwt', jwt, { httpOnly: true })
        return { jwt };
      } else {
        throw new HttpException('Login failed, account has not been set up to log in', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
      }
    } else {                          
      if (user.MAC !== null) {
        if (user.MAC !== signInDto.MAC) {
          throw new HttpException('The account is not authenticated on this device', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
      }
      if (user.role == "DRIVER") {
        user.MAC = signInDto.MAC;
        console.log(user.MAC);
        this.usersService.updateUser(user);
        const payload = { sub: user.id, username: user.username, role: user.role };
        const jwt = await this.jwtService.signAsync(payload);
        response.cookie('jwt', jwt, { httpOnly: true })
        return { jwt };
      } else {
        throw new HttpException('Login failed, account has not been set up to log in', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
      }
    }

  }

  async changePassword(req, body) {
    let id = req.user.sub;
    let data = await this.usersService.findOne(id)
    if(body.passwordNew != body.passwordNewConfirm){
      throw new UnauthorizedException('The new password does not match')
    }
    if(data.password != body.passwordOld){
      throw new UnauthorizedException('The old password is incorrect')
    }

    if(data.password == body.passwordNew){
      throw new UnauthorizedException('This password already exists')
    }
      data.password = body.passwordNew;
      return await this.usersService.updatePassword(data);
  }
}
