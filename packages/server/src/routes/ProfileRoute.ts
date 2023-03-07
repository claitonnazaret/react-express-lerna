import express from 'express';
import Authorization from '../middleware/Authorization';
import ProfilerController from '../controllers/ProfilerController';
import multer from 'multer';
import { MulterOptions } from '../config/multer';

const route = express.Router();

route
  .route('/profile/:id')
  // .put(Authorization.Authenticated, multer(MulterOptions.profile).single('avatar'), ProfilerController.update)
  .put(multer(MulterOptions.profile).single('file'), ProfilerController.update)
  .get(Authorization.Authenticated, ProfilerController.findById);

export default route;
