import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CalendarEvent } from '../schema/calendar-event.schema';
import { BaseCalendarEventRepository } from './base.repository';
import { ICalendarEvent } from './entity.interface';

@Injectable()
export class MongoCalendarEventRepository extends BaseCalendarEventRepository<ICalendarEvent> {
    constructor(@InjectModel(CalendarEvent.name) private readonly calendarEventModel: Model<CalendarEvent>) {
        super();
    }

    async createMany(
        events: Array<{
            name: string;
            date: Date;
            description: string;
            countryCode: string;
            userId: Types.ObjectId;
            isHoliday: boolean;
        }>,
    ): Promise<ICalendarEvent[]> {
        return this.calendarEventModel.insertMany(events);
    }
}
