import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/constants/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()

        ]);

        if (!roles || roles.length === 0) {
            return true; // ✅ Si no se especifica un rol, permitir el acceso
        }

        const request = context.switchToHttp().getRequest();
        const user= request.user;

        const hashRole=()=>{
            roles.some((role)=>user?.role?.includes(role));
            const valid=user&&user.roles&&hashRole;

            if(!valid){
                throw new ForbiddenException("you dont have permission ")
            }
        return valid;

        }

    }
}

