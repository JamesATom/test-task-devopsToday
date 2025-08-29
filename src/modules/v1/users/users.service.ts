import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CountriesService } from '../countries/countries.service';
import { AddHolidaysToCalendarDto } from './dto/add-holidays.dto';
import { BaseRepository, BaseCalendarEventRepository } from './repository/base.repository';
import { IUser, ICalendarEvent } from './repository/entity.interface';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private readonly userRepository: BaseRepository<IUser>,
        private readonly calendarEventRepository: BaseCalendarEventRepository<ICalendarEvent>,
        private readonly countriesService: CountriesService,
    ) {}

    async findUserById(userId: string): Promise<IUser> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return user;
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    async addEventsToUserCalendar(
        userId: string,
        events: Array<{ name: string; date: Date; description?: string; countryCode: string; isHoliday: boolean }>,
    ): Promise<{ addedEvents: number }> {
        await this.findUserById(userId);

        const eventsToCreate = events.map(event => ({
            name: event.name,
            date: event.date,
            description: event.description || '',
            countryCode: event.countryCode,
            userId: new Types.ObjectId(userId),
            isHoliday: event.isHoliday,
        }));

        const createdEvents = await this.calendarEventRepository.createMany(eventsToCreate);
        await this.userRepository.updateUserCalendarEvents(
            userId,
            createdEvents.map(event => event._id),
        );

        return { addedEvents: createdEvents.length };
    }

    async addHolidaysToCalendar(
        userId: string,
        addHolidaysDto: AddHolidaysToCalendarDto,
    ): Promise<{ message: string; addedEvents: number }> {
        const holidays = await this.countriesService.getCountryHolidays(
            addHolidaysDto.countryCode,
            addHolidaysDto.year,
            addHolidaysDto.holidays,
        );

        if (holidays.length === 0) {
            return { message: 'No matching holidays found', addedEvents: 0 };
        }

        const calendarEvents = holidays.map(holiday => ({
            name: holiday.name,
            date: holiday.date,
            description: `National holiday: ${holiday.localName}`,
            countryCode: holiday.countryCode,
            isHoliday: true,
        }));

        const result = await this.addEventsToUserCalendar(userId, calendarEvents);

        return {
            message: `Successfully added ${result.addedEvents} holidays to user's calendar`,
            addedEvents: result.addedEvents,
        };
    }
}
