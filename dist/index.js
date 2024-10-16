"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_route_1 = require("./routes/course.route");
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/courses", course_route_1.courseRouter);
app.listen(port, () => {
    console.log("running on port 8000");
});
