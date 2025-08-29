import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class AddHolidaysToCalendarDto {
    @ApiProperty({
        description: 'ISO-3166-1 alpha-2 country code',
        example: 'US',
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    countryCode: string;

    @ApiProperty({
        description: 'Year of holidays',
        example: 2025,
    })
    @IsNotEmpty()
    year: number;

    @ApiProperty({
        description: 'List of holiday names to filter by (optional)',
        example: ["New Year's Day", 'Independence Day'],
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    holidays?: string[];
}
