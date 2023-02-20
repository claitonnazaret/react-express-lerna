import express from 'express';
import RoleRoute from './RoleRoute';
import UserRoute from './UserRoute';

const router = express.Router();

router.use('/api', RoleRoute, UserRoute);

export default router;
