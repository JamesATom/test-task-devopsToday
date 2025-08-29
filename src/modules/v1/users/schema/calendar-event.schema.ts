import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CalendarEventDocument = HydratedDocument<CalendarEvent>;

@Schema({ timestamps: true })
export class CalendarEvent extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    date: Date;

    @Prop()
    description: string;

    @Prop()
    countryCode: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ default: false })
    isHoliday: boolean;
}

export const CalendarEventSchema = SchemaFactory.createForClass(CalendarEvent);
