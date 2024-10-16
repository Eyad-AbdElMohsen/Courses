import express , {Express , Request , Response}from "express" 
import { courseRouter } from './routes/course.route';

const port = 8000;

const app : Express = express();

app.use(express.json())

app.use("/api/courses", courseRouter)



app.listen(port , () => {
    console.log("running on port 8000");
})