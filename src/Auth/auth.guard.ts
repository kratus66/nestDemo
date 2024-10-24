import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Verificar que el header Authorization esté presente
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Verificar que el header tenga la estructura adecuada
    const [scheme, credentials] = authHeader.split(' ');

    if (scheme !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Authorization header format is invalid');
    }

    // Verificar que contenga email y password separados por ":"
    const [email, password] = credentials.split(':');
    if (!email || !password) {
      throw new UnauthorizedException('Email or password missing');
    }

    // Aquí podrías agregar validaciones adicionales si es necesario
    return true;
  }
}
