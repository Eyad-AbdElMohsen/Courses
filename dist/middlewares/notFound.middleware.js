"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../errors/api.error"));
const notFoundMiddleware = (req, res, next) => {
    next(new api_error_1.default('This resource is unavailable', 404));
};
exports.default = notFoundMiddleware;