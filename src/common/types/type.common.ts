import { ResponseStatus } from '../enum/common.enum';

export interface ApiResponse<T> {
    status: ResponseStatus;
    data: T;
    timestamp: string;
}

export interface ApiErrorResponse {
    status: ResponseStatus;
    message: string;
    timestamp: string;
}
