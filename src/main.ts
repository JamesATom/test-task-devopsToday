import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Countries API')
        .setDescription('API for retrieving country information including borders, population data, and flags')
        .setVersion('1.0')
        .addTag('Countries')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const PORT = process.env.PORT;
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(`App server is running on port => ${PORT}`);
    });
}

bootstrap().catch(error => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
