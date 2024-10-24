"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateJWT_1 = require("../utils/generateJWT");
const asyncWrapper_1 = require("./asyncWrapper");
dotenv_1.default.config();
exports.verifyToken = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new api_error_1.default('token is required ', 401);
    }
    const token = authHeader.split(' ')[1];
    if (!generateJWT_1.secretKey) {
        throw new api_error_1.default('internal server error', 500);
    }
    const user = jsonwebtoken_1.default.verify(token, generateJWT_1.secretKey);
    req.currentUser = user;
    next();
}));
