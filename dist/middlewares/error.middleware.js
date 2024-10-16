"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../errors/api.error"));
const errorMiddleware = (err, req, res, next) => {
    let message = "Internal Server Error", code = 500, data;
    if (err instanceof api_error_1.default) {
        message = err.message;
        code = err.status;
        data = err.data;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    else if (typeof err == "string") {
        message = err;
    }
    res.status(code).json({
        status: 'Error',
        code: code,
        message: message,
        data: data
    });
};
exports.default = errorMiddleware;