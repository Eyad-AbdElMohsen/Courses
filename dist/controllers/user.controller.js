"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.postSignUp = exports.postLogIn = exports.getAllUsers = void 0;
const httpStatusText_1 = require("../utils/httpStatusText");
const api_error_1 = __importDefault(require("../errors/api.error"));
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const dotenv_1 = __importDefault(require("dotenv"));
const usersServices = __importStar(require("../services/users.service"));
dotenv_1.default.config();
const getAllUsers = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const users = yield usersServices.getAllUsers(limit, skip);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { users }
    });
}));
exports.getAllUsers = getAllUsers;
const postSignUp = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield usersServices.getUser(req.body.email);
    if (user) {
        throw new api_error_1.default('email already exists', 409, user);
    }
    const newUser = yield usersServices.postSignUp(req.body, (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newUser }
    });
}));
exports.postSignUp = postSignUp;
const postLogIn = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersServices.getUser(req.body.email);
    if (!user) {
        throw new api_error_1.default('email is not found', 404);
    }
    let correctPasword = yield usersServices.correctPassword(req.body.password, user);
    if (!correctPasword) {
        throw new api_error_1.default("Password isn't correct", 400);
    }
    // login successfully
    const token = usersServices.postLogIn(req.body.email, user);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: {
            email: user.email,
            Name: user.firstName + ' ' + user.lastName,
            role: user.role,
            token
        }
    });
}));
exports.postLogIn = postLogIn;
