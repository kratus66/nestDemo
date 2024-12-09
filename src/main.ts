import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurar pipes globales
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Elimina propiedades no declaradas en los DTOs
            forbidNonWhitelisted: true, // Lanza excepciones para propiedades no permitidas
            transform: true, // Transforma automáticamente los valores según los DTOs
        }),
    );

    // Configuración de CORS
    app.enableCors({
        origin: '*', // Permitir acceso desde cualquier origen (ajusta según tu necesidad)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    // Configuración de Swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('demo-db')
        .setDescription('API construida con Nest para ser empleada en la demo del bootcamp backend módulo 4')
        .setVersion('1.0')
        .addBearerAuth() // Autenticación mediante Bearer Token
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    // Configurar el punto de acceso de Swagger
    SwaggerModule.setup('api', app, document);

    // Configuración del puerto
    const port = process.env.PORT ?? 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
