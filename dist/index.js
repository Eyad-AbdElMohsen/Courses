"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/courses", course_route_1.default);
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log("running on port 8000");
});
