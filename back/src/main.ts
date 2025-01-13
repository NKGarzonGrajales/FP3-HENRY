import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pg from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/stripe/webhook', 
    bodyParser.raw({ type: 'application/json' })
);

  app.useGlobalPipes( new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Huellas Unidas')
  .setDescription('API DEL PROYECTO FINAL')
  .setVersion('1.0')
  .addBearerAuth(
    { 
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT' 
    },
    'access-token',
  )
  .build();



  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Proyecto Huellas Unidas',
  });

   new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  })

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true, 
  });
  
  

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });


  const PORT = parseInt(process.env.PORT) || 4000;

  await app.listen(PORT);
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}/`);
}
bootstrap();