import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Verificamos que el token esté presente
    if (!authHeader) {
        throw new UnauthorizedException('Authorization header is missing');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw new UnauthorizedException('Authorization header format is invalid');
    }

    try {
        // Verificamos el token usando el secreto del JWT
        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

        // Incluimos la fecha de expiración en el request
        (request as any).user = { ...payload, exp: new Date(payload.exp * 1000) };
        return true;
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
}
}


