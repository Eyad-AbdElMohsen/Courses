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
exports.postSignUp = exports.postLogIn = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const httpStatusText_1 = require("../utils/httpStatusText");
const api_error_1 = __importDefault(require("../errors/api.error"));
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateJWT_1 = require("../utils/generateJWT");
dotenv_1.default.config();
const getAllUsers = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const users = yield user_model_1.User.find({}, { "__v": false, "password": false }).limit(limit).skip(skip);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { users }
    });
}));
exports.getAllUsers = getAllUsers;
const postSignUp = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const password = req.body.password;
    const user = yield user_model_1.User.findOne({ email: req.body.email });
    if (user) {
        throw new api_error_1.default('email already exists', 409, user);
    }
    const hashedPass = yield bcrypt_1.default.hash(password, 10);
    const newUser = new user_model_1.User(Object.assign(Object.assign({}, req.body), { avatar: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename, password: hashedPass }));
    const token = yield (0, generateJWT_1.generateJWT)({
        email: newUser.email,
        role: newUser.role,
        id: newUser._id.toString(),
    });
    newUser.token = token;
    yield newUser.save();
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newUser }
    });
}));
exports.postSignUp = postSignUp;
const postLogIn = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new api_error_1.default('email is not found', 404);
    }
    let correctPasword = yield bcrypt_1.default.compare(password, user.password);
    if (!correctPasword) {
        throw new api_error_1.default("Password isn't correct", 400);
    }
    // login successfully
    const token = yield (0, generateJWT_1.generateJWT)({ email: user.email, id: user._id.toString(), role: user.role });
    user.token = token;
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
