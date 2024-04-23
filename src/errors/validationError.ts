import { IAppError } from './IAppError';

export class ValidationError extends Error implements IAppError {
    constructor(message: string = 'Validation error') {
        super(message);
        this.name = 'ValidationError';
    }
}