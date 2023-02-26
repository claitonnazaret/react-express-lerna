import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import _ from 'lodash';

dotenv.config();

interface UserData {
    name: string | null;
    email: string | null;
    roleId: string | null;
    verified: boolean | null;
    profileId: number | null;
    active: boolean | null;
}

const { JWT_TOKEN, JWT_REFRESH_TOKEN, JWT_TOKEN_TIMEOUT, JWT_REFRESH_TOKEN_TIMEOUT } = process.env;

export default {
    GenerateToken: (data: any): string => {
        const accessToken = jwt.sign(data, JWT_TOKEN as string, { expiresIn: JWT_TOKEN_TIMEOUT as string });

        return accessToken;
    },
    GenerateRefreshToken: (data: any): string => {
        const accessToken = jwt.sign(data, JWT_REFRESH_TOKEN as string, {
            expiresIn: JWT_REFRESH_TOKEN_TIMEOUT as string,
        });

        return accessToken;
    },
    ExtractToken: (accessToken: string): UserData | null => {
        const secretKey: string = JWT_TOKEN as string;

        let resData: any;

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            resData = err ? null : decoded;
        });

        if (resData) {
            const result: UserData = <UserData>resData;
            return result;
        }

        return null;
    },
    ExtractRefreshToken: (accessToken: string): UserData | null => {
        const secretKey: string = JWT_REFRESH_TOKEN as string;

        let resData: any;

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            resData = err ? null : decoded;
        });

        if (resData) {
            const result: UserData = <UserData>resData;
            return result;
        }

        return null;
    },
};
