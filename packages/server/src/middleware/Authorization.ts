import { Request, Response, NextFunction } from 'express';
import Helper from '../helpers/Helper';

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers['authorization'];
        const token = authToken && authToken.split(' ')[1];

        if (!token) {
            return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', undefined, undefined));
        }

        const result = Helper.ExtractToken(token!);

        if (!result) {
            return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', undefined, undefined));
        }
        next();
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, '', error, undefined));
    }
};

export default { Authenticated };
