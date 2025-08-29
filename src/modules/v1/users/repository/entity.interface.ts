import { Types } from 'mongoose';

export interface IEntity {
    _id?: any;
}

export interface IUser extends IEntity {
    name: string;
    email: string;
    calendarEvents: Types.ObjectId[];
}

export interface ICalendarEvent extends IEntity {
    name: string;
    date: Date;
    description: string;
    countryCode: string;
    userId: Types.ObjectId;
    isHoliday: boolean;
}
