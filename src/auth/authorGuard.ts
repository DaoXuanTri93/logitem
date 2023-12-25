import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/enum/role.enum';


@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('request', request);
        
        const role_demo = request.user.role;
        console.log('requiredRoles', requiredRoles);
        if (requiredRoles.includes(role_demo)) {
            
            
            return true;
        }
        return false;
    }
}