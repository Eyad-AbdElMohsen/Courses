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
exports.postLogIn = exports.correctPassword = exports.postSignUp = exports.getUser = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = require("../utils/generateJWT");
const getAllUsers = (limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({}, { "__v": false, "password": false }).limit(limit).skip(skip);
    return users;
});
exports.getAllUsers = getAllUsers;
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    return user;
});
exports.getUser = getUser;
const postSignUp = (data, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPass = yield bcrypt_1.default.hash(data.password, 10);
    const newUser = new user_model_1.User(Object.assign(Object.assign({}, data), { avatar: fileName, password: hashedPass }));
    const token = yield (0, generateJWT_1.generateJWT)({
        email: newUser.email,
        role: newUser.role,
        id: newUser._id.toString(),
    });
    newUser.token = token;
    yield newUser.save();
    return newUser;
});
exports.postSignUp = postSignUp;
const correctPassword = (password, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, user.password);
});
exports.correctPassword = correctPassword;
const postLogIn = (email, user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, generateJWT_1.generateJWT)({ email: user.email, id: user._id.toString(), role: user.role });
    user.token = token;
    return token;
});
exports.postLogIn = postLogIn;
