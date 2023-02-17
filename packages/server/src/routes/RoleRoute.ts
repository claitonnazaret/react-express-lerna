import express from 'express';
import Authorization from '../middleware/Authorization';
import RoleController from '../controllers/RoleController';

const route = express.Router();

route
    .route('/role')
    .get(Authorization.Authenticated, Authorization.Cliente, RoleController.findAll)
    .post(Authorization.Authenticated, Authorization.Prestador, RoleController.create);

route
    .route('/role/:id')
    .post(Authorization.Authenticated, Authorization.Prestador, RoleController.update)
    .delete(Authorization.Authenticated, Authorization.Admin, RoleController.delete)
    .get(Authorization.Authenticated, Authorization.Cliente, RoleController.findById);

export default route;
