import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/Routes';
import Validator from 'validatorjs';
import cookieParser from 'cookie-parser';

Validator.useLang('pt');
dotenv.config();

const { APP_NAME, APP_PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ foo: 'bar' });
});

app.use(router);

app.listen(APP_PORT, () => {
    console.log(`${APP_NAME} Running on port ${APP_PORT}`);
});
