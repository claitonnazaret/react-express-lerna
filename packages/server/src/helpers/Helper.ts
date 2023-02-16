import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface UserData {
    name: string | null;
    email: string | null;
    roleId: string | null;
    verified: boolean | null;
    active: boolean | null;
}

const { JWT_TOKEN, JWT_REFRESH_TOKEN, JWT_TOKEN_TIMEOUT, JWT_REFRESH_TOKEN_TIMEOUT } = process.env;

const ResponseData = (status: number, message: string | undefined, error: any | null, data: any | null) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: error.message,
            errors: error,
            data: null,
        };

        return response;
    }

    return {
        status,
        message,
        errors: error,
        data: data,
    };
};

const GenerateToken = (data: any): string => {
    const token = jwt.sign(data, JWT_TOKEN as string, { expiresIn: JWT_TOKEN_TIMEOUT as string });

    return token;
};

const GenerateRefreshToken = (data: any): string => {
    const token = jwt.sign(data, JWT_REFRESH_TOKEN as string, { expiresIn: JWT_REFRESH_TOKEN_TIMEOUT as string });

    return token;
};

const ExtractToken = (token: string): UserData | null => {
    const secretKey: string = JWT_TOKEN as string;

    let resData: any;

    const res = jwt.verify(token, secretKey, (err, decoded) => {
        resData = err ? null : decoded;
    });

    if (resData) {
        const result: UserData = <UserData>resData;
        return result;
    }

    return null;
};

const ExtractRefreshToken = (token: string): UserData | null => {
    const secretKey: string = JWT_REFRESH_TOKEN as string;

    let resData: any;

    const res = jwt.verify(token, secretKey, (err, decoded) => {
        resData = err ? null : decoded;
    });

    if (resData) {
        const result: UserData = <UserData>resData;
        return result;
    }

    return null;
};

export default { ResponseData, GenerateToken, GenerateRefreshToken, ExtractToken, ExtractRefreshToken };
