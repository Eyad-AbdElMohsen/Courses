"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = "mongodb://localhost:27017";
mongoose_1.default.connect(DB_URL).then(() => console.log('mongodb server start'));
const courseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true }
});
exports.Course = mongoose_1.default.model('Course', courseSchema);
