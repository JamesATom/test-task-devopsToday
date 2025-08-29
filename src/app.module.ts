// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './modules/v1/countries/countries.module';
import { UsersModule } from './modules/v1/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CountriesModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
