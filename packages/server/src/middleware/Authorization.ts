import { Request, Response, NextFunction } from 'express';
import Helper from '../helpers/Helper';

export default {
    Authenticated: (req: Request, res: Response, next: NextFunction) => {
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

            res.locals.userEmail = result?.email;
            res.locals.roleId = result?.roleId;

            next();
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData(500, '', error, undefined));
        }
    },
    Admin: (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId;
            if (roleId !== 1) {
                return res.status(401).send(Helper.ResponseData(401, 'Forbidden', undefined, undefined));
            }

            next();
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData(500, '', error, undefined));
        }
    },
    Prestador: (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId;
            if (roleId !== 2) {
                return res.status(401).send(Helper.ResponseData(401, 'Forbidden', undefined, undefined));
            }

            next();
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData(500, '', error, undefined));
        }
    },
    Cliente: (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId;
            if (roleId !== 3) {
                return res.status(401).send(Helper.ResponseData(401, 'Forbidden', undefined, undefined));
            }

            next();
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData(500, '', error, undefined));
        }
    },
};
