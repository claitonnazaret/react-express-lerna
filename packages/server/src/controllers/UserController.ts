import { type Request, type Response } from 'express';
import Profile from '../db/models/Profile';
import Role from '../db/models/Role';
import User from '../db/models/User';
import Helper, { type UserData } from '../helpers/Helper';
import PasswordHelper from '../helpers/PasswordHelper';

export default {
  register: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password, roleId } = req.body;

      const hashed = await PasswordHelper.PasswordHashing(password);

      const user = await User.create({
        email,
        password: hashed,
        active: true,
        verified: true,
        roleId,
      });

      const nameStruct = name.split(' ');
      let sobreNome = '';
      if (nameStruct.length > 1) {
        sobreNome = nameStruct[1];
      }
      await Profile.create({
        nome: name,
        sobreNome,
      });

      return res.status(201).send(user);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
          active: true,
        },
        include: {
          model: Role,
          as: 'role',
          attributes: ['roleName'],
        },
      });

      if (user == null) {
        return res.status(401).send('Unauthorized');
      }

      const matched = await PasswordHelper.PasswordCompare(password, user.password);
      if (!matched) {
        return res.status(401).send('Unauthorized');
      }

      const role = await Role.findOne({
        attributes: ['roleName'],
        where: {
          id: user.roleId,
        },
      });

      const dataUser: UserData = {
        id: user.id,
        email: user.email,
        role: role?.roleName ?? null,
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
        id: user.id,
        email: user.email,
        role: role?.roleName,
        verified: user.verified,
        active: user.active,
        accessToken,
      };

      return res.status(200).send(responseUser);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
  refreshToken: async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).send('Unauthorized');
      }

      const decodedUser = Helper.ExtractRefreshToken(refreshToken);
      if (decodedUser == null) {
        return res.status(401).send('Unauthorized decodedUser');
      }

      const accessToken = Helper.GenerateToken({
        id: decodedUser.id,
        email: decodedUser.email,
        role: decodedUser.role,
        verified: decodedUser.verified,
        active: decodedUser.active,
      });

      const resultUser = {
        id: decodedUser.id,
        email: decodedUser.email,
        role: decodedUser.role,
        verified: decodedUser.verified,
        active: decodedUser.active,
        accessToken,
      };

      return res.status(200).send(resultUser);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
  userDetail: async (req: Request, res: Response): Promise<Response> => {
    try {
      const email = res.locals.userEmail;
      const user = await User.findOne({
        where: {
          email,
        },
        include: {
          model: Role,
          attributes: ['id', 'roleName'],
        },
      });

      if (user == null) {
        return res.status(404).send('User not found');
      }

      user.password = '';
      user.accessToken = '';

      return res.status(200).send(user);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (user == null) {
        return res.status(404).send('Data Not found');
      }

      user.active = false;

      await user.save();

      return res.status(204);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
  logout: async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(204).send('User Logout');
      }

      const email = res.locals.userEmail;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user == null) {
        res.clearCookie('refreshToken');
        return res.status(404).send('User not found');
      }

      await User.update({ accessToken: null }, { where: { email } });
      res.clearCookie('refreshToken');

      return res.status(204).send('User Logout');
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
};
