import express from "express";
const app = express();
import dotEnv from 'dotenv';
dotEnv.config();
import morgan from "morgan";
import 'express-async-errors';
import { connectDB } from "./db/connection";
import { errorHandler } from "./middlewares/errors";
import { bookRouter } from './routers/book';
import { authRouter } from "./routers/auth";
import { NotFoundError } from "./utils/errors";

// as this is helpful in development
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', authRouter);
app.use('/api/v1/books', bookRouter);


//middleware for not found 404
app.all('*', (req, res, next) => {
    throw new NotFoundError(`${req.originalUrl} route not found`);
});

app.use(errorHandler);


// async is used here to connect db first and then start
const start = async () => {
    try{
        const port = process.env.PORT || 8000;
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }catch(error){
        console.log(error);
    }
}

start();