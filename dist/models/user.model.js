"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URL = process.env.MONGO_URL;
if (typeof DB_URL == 'string')
    mongoose_1.default.connect(DB_URL).then(() => console.log('mongodb server start'));
else
    throw new Error('DB_URL must be a string');
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, required: true },
    token: { type: String }
});
exports.User = mongoose_1.default.model('User', userSchema);
