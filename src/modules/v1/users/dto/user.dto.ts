import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserIdParamDto {
    @ApiProperty({
        description: 'User ID',
        example: '656f4a4f27c37dcc789d27f8',
    })
    @IsMongoId()
    userId: string;
}

export class UserResponseDto {
    @ApiProperty({
        description: 'User ID',
        example: '656f4a4f27c37dcc789d27f8',
    })
    _id: string;

    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'john.doe@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'Array of calendar event IDs',
        type: [String],
        example: ['656f4a4f27c37dcc789d27f9', '656f4a4f27c37dcc789d27fa'],
    })
    calendarEvents: string[];
}
