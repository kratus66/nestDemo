import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // Elimina las propiedades no declaradas en los DTOs
        forbidNonWhitelisted: true, // Lanza una excepción si se encuentran propiedades no declaradas
        transform: true, // Transforma automáticamente las propiedades a los tipos especificados en los DTOs
    }),
    
);

  const swaggerConfig= new DocumentBuilder()
                                          .setTitle('demo-db')
                                          .setDescription('Api construida con Nest para ser empleadas en la demo del bootcamp backend modulo 4')
                                          .setVersion('1.0')
                                          .addBearerAuth()
                                          .build()
                                          
  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
