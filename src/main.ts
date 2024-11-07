import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // Elimina las propiedades no declaradas en los DTOs
        forbidNonWhitelisted: true, // Lanza una excepción si se encuentran propiedades no declaradas
        transform: true, // Transforma automáticamente las propiedades a los tipos especificados en los DTOs
    }),
);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
