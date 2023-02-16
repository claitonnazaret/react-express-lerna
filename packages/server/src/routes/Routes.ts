import express from 'express';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import UserValidation from '../middleware/validation/UserValidation';
import Authorization from '../middleware/Authorization';

const router = express.Router();

router.get('/role', Authorization.Authenticated, RoleController.findAll);
router.post('/role', RoleController.create);
router.post('/role/:id', RoleController.update);
router.delete('/role/:id', RoleController.delete);
router.get('/role/:id', RoleController.findById);

router.post('/user/signup', UserValidation.RegisterValidation, UserController.register);
router.post('/user/login', UserController.login);
router.get('/user/refresh-token', UserController.refreshToken);

export default router;
