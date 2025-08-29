import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AddHolidaysToCalendarDto } from './dto/add-holidays.dto';
import { UserIdParamDto, UserResponseDto } from './dto/user.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';

@ApiTags('Users')
@Controller('v1/users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Returns all users',
        type: [UserResponseDto],
    })
    async getAllUsers() {
        const users = await this.usersService.getAllUsers();
        return {
            message: 'Users retrieved successfully',
            data: users,
            count: users.length,
        };
    }

    @Post(':userId/calendar/holidays')
    @ApiOperation({ summary: "Add national holidays of a specific country to the user's calendar" })
    @ApiParam({
        name: 'userId',
        description: 'ID of the user',
        example: '656f4a4f27c37dcc789d27f8',
    })
    @ApiResponse({
        status: 201,
        description: 'Holidays added to user calendar successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    async addHolidaysToCalendar(@Param() params: UserIdParamDto, @Body() addHolidaysDto: AddHolidaysToCalendarDto) {
        return this.usersService.addHolidaysToCalendar(params.userId, addHolidaysDto);
    }
}
