import express from 'express';
import RoleRoute from './RoleRoute';
import UserRoute from './UserRoute';

const router = express.Router();

router.use(RoleRoute);
router.use(UserRoute);

export default router;
