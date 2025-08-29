import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { BaseRepository } from './base.repository';
import { IUser } from './entity.interface';

@Injectable()
export class MongoUserRepository extends BaseRepository<IUser> {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super();
    }

    async findById(userId: string): Promise<IUser | null> {
        return this.userModel.findById(userId);
    }

    async findAll(): Promise<IUser[]> {
        return this.userModel.find().exec();
    }

    async updateUserCalendarEvents(userId: string, eventIds: any[]): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, {
            $push: { calendarEvents: { $each: eventIds } },
        });
    }
}
