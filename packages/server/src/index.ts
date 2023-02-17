import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import Validator from 'validatorjs';
import cookieParser from 'cookie-parser';
import compression from 'compression';

Validator.useLang('pt');
dotenv.config();

const { APP_NAME, APP_PORT } = process.env;

const app = express();

//use
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());

//disabled
app.disable('x-powered-by');

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ foo: 'bar' });
});

app.use(router);

app.listen(APP_PORT, () => {
    console.log(`${APP_NAME} Running on port ${APP_PORT}`);
});
