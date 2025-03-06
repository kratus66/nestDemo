import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/Users/constants/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        // Si no se especifican roles, permitir el acceso
        if (!roles || roles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Si no hay usuario autenticado, lanzar un error
        if (!user || !user.role) {
            throw new ForbiddenException("No user found or no roles assigned.");
        }

        // Verificar si el usuario tiene alguno de los roles requeridos
        const hasRole = roles.some((role) => user.role.includes(role));

        if (!hasRole) {
            throw new ForbiddenException("You do not have permission to access this resource.");
        }

        return true;
    }
}


