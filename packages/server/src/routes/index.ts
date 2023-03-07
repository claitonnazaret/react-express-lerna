import express from 'express';
import RoleRoute from './RoleRoute';
import UserRoute from './UserRoute';
import ProfileRoute from './ProfileRoute';

const router = express.Router();

router.use('/api', RoleRoute, UserRoute, ProfileRoute);

export default router;
