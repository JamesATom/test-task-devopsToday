// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const config = new DocumentBuilder()
        .setTitle('[App Name] API')
        .setDescription('The [App Name] API description')
        .setVersion('1.0')
        .addTag('[App Name]')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: true,
    });


    const PORT = process.env.PORT;
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(`Weather App server is running on port => ${PORT}`);
    });
}

bootstrap();