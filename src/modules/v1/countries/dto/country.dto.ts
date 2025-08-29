import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CountryParamDto {
    @ApiProperty({
        description: 'ISO-3166-1 alpha-2 country code',
        example: 'UA',
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    countryCode: string;
}

export class CountryDto {
    @ApiProperty({
        description: 'ISO-3166-1 alpha-2 country code',
        example: 'UA',
    })
    countryCode: string;

    @ApiProperty({
        description: 'Name of the country',
        example: 'Ukraine',
    })
    name: string;
}

export class BorderCountryDto {
    @ApiProperty({
        description: 'Common name of the border country',
        example: 'Poland',
    })
    commonName: string;

    @ApiProperty({
        description: 'Official name of the border country',
        example: 'Republic of Poland',
    })
    officialName: string;

    @ApiProperty({
        description: 'ISO-3166-1 alpha-2 country code',
        example: 'PL',
    })
    countryCode: string;
}

export class PopulationEntryDto {
    @ApiProperty({
        description: 'Year of population data',
        example: '2020',
    })
    year: string;

    @ApiProperty({
        description: 'Population value',
        example: 44134693,
    })
    value: number;
}

export class CountryInfoResponseDto {
    @ApiProperty({
        description: 'List of border countries',
        type: [BorderCountryDto],
    })
    borders: BorderCountryDto[];

    @ApiProperty({
        description: 'Historical population data',
        type: [PopulationEntryDto],
    })
    population: PopulationEntryDto[];

    @ApiProperty({
        description: 'URL to the country flag image',
        example: 'https://example.com/flag.png',
    })
    flag: string;
}
