import express from 'express';
import Authorization from '../middleware/Authorization';
import ProfilerController from '../controllers/ProfilerController';

const route = express.Router();

route
    .route('/profile/:id')
    .put(Authorization.Authenticated, ProfilerController.update)
    .get(Authorization.Authenticated, ProfilerController.findById);

export default route;
