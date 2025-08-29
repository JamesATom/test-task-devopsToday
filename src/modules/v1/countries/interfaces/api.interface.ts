import { AxiosError, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

export interface Holiday {
  name: string;
  localName: string;
  date: Date;
  countryCode: string;
}

export interface CountryMapRecord {
  [key: string]: string;
}
