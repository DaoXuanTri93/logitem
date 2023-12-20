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
    console.log(signInDto.isWeb);
    let user = new Users();
    user = await this.usersService.findOneByUserName(signInDto.username);
    if (user == null) {
      console.log("a");
      throw new HttpException('Tài khoản không tồn tại', HttpStatus.NOT_FOUND);
    }
    if (user?.password !== signInDto.password || user == null) {
     
      throw new HttpException('Mật khẩu chưa chính xác, vui lòng thử lại', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }
 
    
    if (signInDto.isWeb) {
      if (user.role != "DRIVER") {
        const payload = { sub: user.id, username: user.username, password:user.password,MAC:user.MAC};
        const jwt = await this.jwtService.signAsync(payload);
        response.cookie('jwt', jwt, {httpOnly: true})
        return {jwt} ;
      } else {
        throw new HttpException('Đăng nhập thất bại, tài khoản chưa được setting quyền đăng nhập', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
      }
    } else {
      if (user.MAC !== null) {
        if (user.MAC !== signInDto.MAC) {
          throw new HttpException('Tài khoản không được xác thực trên thiết bị này', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
      }
      if (user.role == "DRIVER") {
        user.MAC = signInDto.MAC;
        this.usersService.updateUser(user);

        const payload = { sub: user.id, username: user.username , role:user.role};
        const jwt = await this.jwtService.signAsync(payload);
        response.cookie('jwt', jwt, { httpOnly: true })
        return { jwt };
      } else {
        throw new HttpException('Đăng nhập thất bại, tài khoản chưa được setting quyền đăng nhập', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
      }
    }
    
  }
}
