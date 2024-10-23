import express , {Express , Request , Response}from "express" 
import path from "path"
import cors from 'cors';
import  dotenv from "dotenv";
import  courseRouter  from './routes/course.route';
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import userRouter from "./routes/user.route";

dotenv.config()

const port = process.env.port || 4000;

const app : Express = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors())
app.use(express.json())

app.use("/api/courses", courseRouter)
app.use('/api/users', userRouter)

//global middleware
app.all('*', notFoundMiddleware);

//global error handler
app.use(errorMiddleware)


app.listen(port , () => {
    console.log(`running on port ${port}`);
})