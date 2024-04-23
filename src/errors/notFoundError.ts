import { IAppError } from './IAppError';

export class NotFoundError extends Error implements IAppError {
    constructor(message: string = 'Not found') {
        super(message);
        this.name = 'NotFoundError';
    }
}