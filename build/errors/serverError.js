"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(message = 'Internal server error') {
        super(message);
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
