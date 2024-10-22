"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateJWT_1 = require("../utils/generateJWT");
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            if (generateJWT_1.secretKey) {
                const user = jsonwebtoken_1.default.verify(token, generateJWT_1.secretKey);
                req.currentUser = user;
                next();
            }
            else {
                throw new Error('secretKey must be a string');
            }
        }
        catch (err) {
            throw new Error('error' + err);
        }
    }
    else {
        throw new api_error_1.default('token is required ', 401);
    }
};
exports.verifyToken = verifyToken;
