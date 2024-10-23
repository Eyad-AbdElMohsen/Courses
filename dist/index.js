"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const notFound_middleware_1 = __importDefault(require("./middlewares/notFound.middleware"));
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
const port = process.env.port || 4000;
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/courses", course_route_1.default);
app.use('/api/users', user_route_1.default);
//global middleware
app.all('*', notFound_middleware_1.default);
//global error handler
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
