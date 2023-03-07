import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';

dotenv.config();

export interface UserData {
  id: number;
  email: string | null;
  role: string | null;
  verified: boolean | null;
  active: boolean | null;
}

const {
  JWT_TOKEN,
  JWT_REFRESH_TOKEN,
  JWT_TOKEN_TIMEOUT,
  JWT_REFRESH_TOKEN_TIMEOUT,
  STORAGE_TYPE,
  AWS_BUCKET,
  AWS_DEFAULT_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS,
} = process.env;

aws.config.update({
  region: AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SECRET_ACCESS as string,
  },
});

const S3 = new aws.S3();

export default {
  GenerateToken: (data: UserData): string => {
    const accessToken = jwt.sign(data, JWT_TOKEN as string, { expiresIn: JWT_TOKEN_TIMEOUT as string });

    return accessToken;
  },
  GenerateRefreshToken: (data: UserData): string => {
    const accessToken = jwt.sign(data, JWT_REFRESH_TOKEN as string, {
      expiresIn: JWT_REFRESH_TOKEN_TIMEOUT as string,
    });

    return accessToken;
  },
  ExtractToken: (accessToken: string): UserData | null => {
    const secretKey: string = JWT_TOKEN as string;

    let resData: any;

    jwt.verify(accessToken, secretKey, (err, decoded) => {
      resData = err != null ? null : decoded;
    });

    if (resData) {
      return resData as UserData;
    }

    return null;
  },
  ExtractRefreshToken: (accessToken: string): UserData | null => {
    const secretKey: string = JWT_REFRESH_TOKEN as string;

    let resData: any;

    jwt.verify(accessToken, secretKey, (err, decoded) => {
      resData = err != null ? null : decoded;
    });

    if (resData) {
      return resData as UserData;
    }

    return null;
  },
  deleteFile: (key: string, folder: string) => {
    if (key !== '') {
      if (STORAGE_TYPE === 's3') {
        S3.deleteObject({
          Bucket: AWS_BUCKET as string,
          Key: key,
        });
      } else {
        const file = path.resolve(__dirname, '..', '..', 'tmp', folder, key);
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      }
    }
  },
};
