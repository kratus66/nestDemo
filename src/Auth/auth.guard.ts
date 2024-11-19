import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        // Verificar que el encabezado Authorization esté presente
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        // Verificar que el encabezado Authorization siga el formato "Basic: <email>:<password>"
        const [scheme, credentials] = authHeader.split(' ');
        if (scheme !== 'Basic' || !credentials) {
            throw new UnauthorizedException('Authorization header format is invalid');
        }

        // Verificar que las credenciales contengan un email y una contraseña
        const [email, password] = credentials.split(':');
        if (!email || !password) {
            throw new UnauthorizedException('Authorization header must contain email and password');
        }

        // En este punto, el header Authorization tiene el formato correcto "Basic: <email>:<password>"
        return true;
    }
}
