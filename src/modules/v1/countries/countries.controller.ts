import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountryDto, CountryInfoResponseDto, CountryParamDto } from './dto/country.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';

@ApiTags('Countries')
@Controller('v1/countries')
@UseInterceptors(TransformInterceptor)
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Get()
    @ApiOperation({ summary: 'Get list of available countries' })
    @ApiResponse({
        status: 200,
        description: 'List of countries retrieved successfully',
        type: [CountryDto],
    })
    async getAvailableCountries(): Promise<CountryDto[]> {
        return this.countriesService.getAvailableCountries();
    }

    @Get(':countryCode')
    @ApiOperation({ summary: 'Get detailed information about a specific country' })
    @ApiParam({
        name: 'countryCode',
        description: 'ISO-3166-1 alpha-2 country code',
        example: 'UA',
    })
    @ApiResponse({
        status: 200,
        description: 'Country information retrieved successfully',
        type: CountryInfoResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Country not found',
    })
    async getCountryInfo(@Param() params: CountryParamDto): Promise<CountryInfoResponseDto> {
        return this.countriesService.getCountryInfo(params.countryCode);
    }
}
