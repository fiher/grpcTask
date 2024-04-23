import { IAppError } from './IAppError';

export class ServerError extends Error implements IAppError {
    constructor(message: string = 'Internal server error') {
        super(message);
        this.name = 'ServerError';
    }
}