import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { BorderCountryDto, CountryDto, PopulationEntryDto } from './dto/country.dto';
import { ApiResponse, CountryMapRecord, Holiday } from './interfaces/api.interface';

@Injectable()
export class CountriesService {
    private readonly logger = new Logger(CountriesService.name);

    private readonly dateNagerAvailableCountriesUrl: string;
    private readonly dateNagerCountryInfoUrl: string;
    private readonly dateNagerPublicHolidaysUrl: string;
    
    private readonly countriesNowPopulationUrl: string;
    private readonly countriesNowFlagUrl: string;
    
    private readonly countryMap: CountryMapRecord = {
        UA: 'Ukraine',
        US: 'United States',
        GB: 'United Kingdom',
        DE: 'Germany',
        FR: 'France',
        CA: 'Canada',
        JP: 'Japan',
        CN: 'China',
        IN: 'India',
        BR: 'Brazil',
        AU: 'Australia',
    };

    constructor(private readonly httpService: HttpService) {
        this.dateNagerAvailableCountriesUrl = process.env.DATE_NAGER_API_AVAILABLE_COUNTRIES;
        this.dateNagerCountryInfoUrl = process.env.DATA_NAGER_API_COUNTRY_INFO;
        this.dateNagerPublicHolidaysUrl = process.env.DATE_NAGER_API_PUBLIC_HOLIDAYS;
        this.countriesNowPopulationUrl = process.env.DATA_NAGER_API_COUNTRY_POPULATION;
        this.countriesNowFlagUrl = process.env.DATA_NAGER_API_COUNTRY_IMAGE;
    }

    async getAvailableCountries(): Promise<CountryDto[]> {
        const response = await this.makeGetRequest<any[]>(
            this.dateNagerAvailableCountriesUrl,
            'Failed to fetch available countries'
        );
        
        if (!response.success || !response.data) {
            return [];
        }
        
        return response.data.map(country => ({
            countryCode: country.countryCode,
            name: country.name || this.countryMap[country.countryCode] || country.countryCode
        }));
    }

    async getCountryInfo(countryCode: string) {
        const [borderData, populationData, flagData] = await Promise.all([
            this.getCountryBorders(countryCode),
            this.getCountryPopulation(countryCode),
            this.getCountryFlag(countryCode),
        ]);

        return {
            borders: borderData,
            population: populationData,
            flag: flagData,
        };
    }

    private async getCountryBorders(countryCode: string): Promise<BorderCountryDto[]> {
        interface CountryInfoResponse {
            borders: any[];
            [key: string]: any;
        }
        
        const response = await this.makeGetRequest<CountryInfoResponse>(
            `${this.dateNagerCountryInfoUrl}/${countryCode}`,
            'Failed to fetch country borders'
        );
        
        if (!response.success || !response.data || !response.data.borders) {
            return [];
        }
        
        return this.mapBorderData(response.data.borders);
    }
    
    private mapBorderData(borders: any[]): BorderCountryDto[] {
        return borders.map(border => ({
            commonName: border.commonName,
            officialName: border.officialName,
            countryCode: border.countryCode,
        }));
    }

    private async getCountryPopulation(countryCode: string): Promise<PopulationEntryDto[]> {
        const payload = {
            country: this.getCountryNameByCode(countryCode)
        };
        
        const response = await this.makePostRequest<any>(
            this.countriesNowPopulationUrl,
            payload,
            'Failed to fetch country population'
        );
        
        if (!response.success || !response.data || !response.data.data || !response.data.data.populationCounts) {
            return [];
        }
        
        return this.mapPopulationData(response.data.data.populationCounts);
    }
    
    private mapPopulationData(populationCounts: any[]): PopulationEntryDto[] {
        return populationCounts.map(count => ({
            year: count.year,
            value: count.value,
        }));
    }

    private async getCountryFlag(countryCode: string): Promise<string | null> {
        const payload = {
            iso2: countryCode
        };
        
        const response = await this.makePostRequest<any>(
            this.countriesNowFlagUrl,
            payload,
            'Failed to fetch country flag'
        );
        
        if (!response.success || !response.data || !response.data.data) {
            return null;
        }
        
        return response.data.data.flag || null;
    }

    async getCountryHolidays(
        countryCode: string,
        year: number,
        holidayFilter?: string[],
    ): Promise<Holiday[]> {
        const response = await this.makeGetRequest<any[]>(
            `${this.dateNagerPublicHolidaysUrl}/${year}/${countryCode}`,
            'Failed to fetch country holidays'
        );
        
        if (!response.success || !response.data || !Array.isArray(response.data)) {
            return [];
        }
        
        const holidays = this.mapHolidayData(response.data, countryCode);
        
        return this.filterHolidays(holidays, holidayFilter);
    }
    
    private mapHolidayData(holidayData: any[], countryCode: string): Holiday[] {
        return holidayData.map(holiday => ({
            name: holiday.name,
            localName: holiday.localName,
            date: new Date(holiday.date),
            countryCode: countryCode,
        }));
    }
    
    private filterHolidays(holidays: Holiday[], holidayFilter?: string[]): Holiday[] {
        if (!holidayFilter || holidayFilter.length === 0) {
            return holidays;
        }
        
        return holidays.filter(holiday => 
            holidayFilter.some(name => 
                holiday.name.toLowerCase().includes(name.toLowerCase())
            )
        );
    }

    private async makeGetRequest<T>(url: string, errorMessage: string): Promise<ApiResponse<T>> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(url).pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(`${errorMessage}: ${error.message}`);
                        throw error;
                    }),
                ),
            );
            
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            this.logger.error(`${errorMessage}: ${errorMsg}`);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        }
    }

    private async makePostRequest<T>(url: string, payload: any, errorMessage: string): Promise<ApiResponse<T>> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(url, payload).pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(`${errorMessage}: ${error.message}`);
                        throw error;
                    }),
                ),
            );
            
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            this.logger.error(`${errorMessage}: ${errorMsg}`);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        }
    }

    private getCountryNameByCode(countryCode: string): string {
        return this.countryMap[countryCode] || countryCode;
    }
}
