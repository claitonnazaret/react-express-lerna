import { Request, Response } from 'express';
import Role from '../db/models/Role';
import User from '../db/models/User';
import Helper from '../helpers/Helper';
import PasswordHelper from '../helpers/PasswordHelper';

export default {
    register: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, email, password, confirmPassword, roleId } = req.body;

            const hashed = await PasswordHelper.PasswordHashing(password);

            const user = await User.create({
                name,
                email,
                password: hashed,
                active: true,
                verified: true,
                roleId: roleId,
            });
            return res.status(201).send(Helper.ResponseData('Created', undefined, user));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    login: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                return res.status(401).send(Helper.ResponseData('Unauthorized', undefined, undefined));
            }

            const matched = await PasswordHelper.PasswordCompare(password, user.password);
            if (!matched) {
                return res.status(401).send(Helper.ResponseData('Unauthorized', undefined, undefined));
            }

            const dataUser = {
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                verified: user.verified,
                active: user.active,
            };
            const accessToken = Helper.GenerateToken(dataUser);
            const refreshToken = Helper.GenerateRefreshToken(dataUser);

            user.accessToken = refreshToken;
            await user.save();

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            const responseUser = {
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                verified: user.verified,
                active: user.active,
                accessToken: accessToken,
            };
            return res.status(200).send(Helper.ResponseData('OK', undefined, responseUser));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    refreshToken: async (req: Request, res: Response): Promise<Response> => {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(401).send(Helper.ResponseData('Unauthorized refreshToken', undefined, undefined));
            }

            const decodedUser = Helper.ExtractRefreshToken(refreshToken);
            if (!decodedUser) {
                return res
                    .status(401)
                    .send(Helper.ResponseData('Unauthorized decodedUser', ['REFRESH_TOKEN_TIMEOUT'], undefined));
            }

            const accessToken = Helper.GenerateToken({
                name: decodedUser.name,
                email: decodedUser.email,
                roleId: decodedUser.roleId,
                verified: decodedUser.verified,
                active: decodedUser.active,
            });

            const resultUser = {
                name: decodedUser.name,
                email: decodedUser.email,
                roleId: decodedUser.roleId,
                verified: decodedUser.verified,
                active: decodedUser.active,
                accessToken: accessToken,
            };

            return res.status(200).send(Helper.ResponseData('OK', undefined, resultUser));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    userDetail: async (req: Request, res: Response): Promise<Response> => {
        try {
            const email = res.locals.userEmail;
            const user = await User.findOne({
                where: {
                    email: email,
                },
                include: {
                    model: Role,
                    attributes: ['id', 'roleName'],
                },
            });

            if (!user) {
                return res.status(404).send(Helper.ResponseData('User not found', undefined, undefined));
            }

            user.password = '';
            user.accessToken = '';

            return res.status(200).send(Helper.ResponseData('OK', undefined, user));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    logout: async (req: Request, res: Response): Promise<Response> => {
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                return res.status(200).send(Helper.ResponseData('User Logout', undefined, undefined));
            }

            const email = res.locals.userEmail;
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                res.clearCookie('refreshToken');
                return res.status(200).send(Helper.ResponseData('User not found', undefined, undefined));
            }

            await User.update({ accessToken: null }, { where: { email: email } });
            res.clearCookie('refreshToken');

            return res.status(200).send(Helper.ResponseData('User Logout', undefined, undefined));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
};
