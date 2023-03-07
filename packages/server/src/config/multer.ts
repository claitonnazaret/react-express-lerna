import multer, { type Options, type StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS,
  AWS_DEFAULT_REGION,
  STORAGE_TYPE,
  AWS_BUCKET,
} = process.env;

interface IStorageType {
  local: StorageEngine;
  s3: StorageEngine;
}

export const S3ClientInstance = new S3Client({
  region: AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SECRET_ACCESS as string,
  },
});

const storageTypes: IStorageType = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'avatar'));
    },
    filename: (req, file: any, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err != null) cb(err, '');

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: S3ClientInstance,
    bucket: AWS_BUCKET as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err != null) cb(err, '');

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};

const profile: Options = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'avatar'),
  storage: storageTypes[STORAGE_TYPE as keyof IStorageType],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};

export const MulterOptions = {
  profile,
};
