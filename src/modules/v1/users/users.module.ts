import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schema/user.schema';
import { CalendarEvent, CalendarEventSchema } from './schema/calendar-event.schema';
import { CountriesModule } from '../countries/countries.module';
import { MongoUserRepository } from './repository/user.repository';
import { MongoCalendarEventRepository } from './repository/calendar-event.repository';
import { BaseRepository, BaseCalendarEventRepository } from './repository/base.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: CalendarEvent.name, schema: CalendarEventSchema },
        ]),
        CountriesModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: BaseRepository,
            useClass: MongoUserRepository,
        },
        {
            provide: BaseCalendarEventRepository,
            useClass: MongoCalendarEventRepository,
        },
    ],
    exports: [UsersService],
})
export class UsersModule {}
