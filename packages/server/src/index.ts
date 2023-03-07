import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import Validator from 'validatorjs';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';

Validator.useLang('pt');
dotenv.config();

const { APP_NAME, APP_PORT } = process.env;

const app = express();

// use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(compression());

app.use('/avatar', express.static(path.resolve(__dirname, '..', 'tmp', 'avatar')));

app.use(
    cors({
        credentials: true,
        origin: true,
    })
);

// disabled
app.disable('x-powered-by');

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({
        response: 'Express TypeScript',
    });
});

app.use(router);

app.listen(APP_PORT, () => {
    console.log(`${APP_NAME} Running on port ${APP_PORT}`);
});
