import {
    CanActivate,
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from './constant';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        try {
            // const cookie = request.cookies['jwt']
            const data = await this.jwtService.verifyAsync(token,
                {
                    secret: jwtConstants.secret
                });
            if (!data) {
                throw new UnauthorizedException();
            }
            request['user'] = data;
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}