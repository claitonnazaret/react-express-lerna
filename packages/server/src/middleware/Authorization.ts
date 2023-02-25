import { Request, Response, NextFunction } from 'express';
import Helper from '../helpers/Helper';

export default {
    Authenticated: (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.headers['authorization'];
            const accessToken = authToken && authToken.split(' ')[1];

            if (accessToken === null) {
                return res.status(401).send('Unauthorized');
            }

            const result = Helper.ExtractToken(accessToken!);

            if (!result) {
                return res.status(401).send('Unauthorized');
            }

            res.locals.userEmail = result?.email;
            res.locals.roleId = result?.roleId;

            next();
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    Admin: (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId;
            if (roleId !== 1) {
                return res.status(403).send('Forbidden');
            }

            next();
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    Prestador: (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId;
            if (roleId !== 2) {
                return res.status(403).send('Forbidden');
            }

            next();
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    Cliente: (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId;
            if (roleId !== 3) {
                return res.status(403).send('Forbidden');
            }

            next();
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
};
