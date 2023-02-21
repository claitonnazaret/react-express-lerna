import express from 'express';
import UserController from '../controllers/UserController';
import UserValidation from '../middleware/validation/UserValidation';
import Authorization from '../middleware/Authorization';

const route = express.Router();

route.post('/user/signup', UserValidation.RegisterValidation, UserController.register);
route.post('/user/login', UserController.login);
route.get('/user/refresh-token', UserController.refreshToken);
route.get('/user/current-user', Authorization.Authenticated, UserController.userDetail);
route.get('/user/logout', Authorization.Authenticated, UserController.logout);

export default route;
