"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
exports.default = ApiError;
