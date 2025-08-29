import { Types } from 'mongoose';
import { IEntity, ICalendarEvent } from './entity.interface';

export abstract class BaseRepository<T extends IEntity> {
    abstract findById(id: string): Promise<T | null>;
    abstract findAll(): Promise<T[]>;
    abstract updateUserCalendarEvents(userId: string, eventIds: any[]): Promise<void>;

    async exists(id: string): Promise<boolean> {
        const entity = await this.findById(id);
        return !!entity;
    }

    async findByIds(ids: string[]): Promise<T[]> {
        const entities: T[] = [];
        for (const id of ids) {
            const entity = await this.findById(id);
            if (entity) {
                entities.push(entity);
            }
        }
        return entities;
    }
}

export abstract class BaseCalendarEventRepository<T extends ICalendarEvent> {
    abstract createMany(
        events: Array<{
            name: string;
            date: Date;
            description: string;
            countryCode: string;
            userId: Types.ObjectId;
            isHoliday: boolean;
        }>,
    ): Promise<T[]>;

    async createOne(event: {
        name: string;
        date: Date;
        description: string;
        countryCode: string;
        userId: Types.ObjectId;
        isHoliday: boolean;
    }): Promise<T> {
        const [createdEvent] = await this.createMany([event]);
        return createdEvent;
    }

    async bulkCreate(events: Partial<ICalendarEvent>[]): Promise<T[]> {
        const formattedEvents = events.map(event => ({
            name: event.name,
            date: event.date,
            description: event.description || '',
            countryCode: event.countryCode,
            userId: event.userId,
            isHoliday: event.isHoliday || false,
        }));

        return this.createMany(formattedEvents as any);
    }
}
