import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles || roles.length === 0) {
            return true; // Si no se requiere rol, se permite el acceso
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new ForbiddenException('Authorization header is missing');
        }

        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer' || !token) {
            throw new ForbiddenException('Invalid authorization header format');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
            if (!roles.includes(payload.role)) {
                throw new ForbiddenException('Access denied. Insufficient role');
            }
            return true;
        } catch (error) {
            throw new ForbiddenException('Access denied. Invalid token or role');
        }
    }
}

