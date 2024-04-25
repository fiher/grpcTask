import { IAppError } from './IAppError';

export const REQUIRED_FIELD_ERROR = 'This field is required.';
export const MUST_BE_STRING_ERROR=  'This field must be a string.';
export const INVALID_DATE_ERROR = 'Date must be a valid ISO date string, such as YYYY-MM-DD.';

export class ValidationError extends Error implements  IAppError{
    field: string;
    details?: string;  // Optional details about the validation error

    constructor(message: string, field: string, details?: string) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
        this.details = details;
    }
}
