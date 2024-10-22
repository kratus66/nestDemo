import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentTime = new Date().toISOString(); // Obtiene la fecha y hora actual
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`); // Loguea método, ruta y fecha-hora
    next(); // Pasa al siguiente middleware o controlador
  }
}
export default LoggerMiddleware;
