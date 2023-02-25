import { Request, Response } from 'express';
import Role from '../db/models/Role';
import Helper from '../helpers/Helper';

export default {
    findAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const roles = await Role.findAll({
                where: {
                    active: true,
                },
            });

            return res.status(200).send(roles);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { roleName, active } = req.body;

            const create = await Role.create({
                roleName,
                active,
            });

            return res.status(201).send(create);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { roleName, active } = req.body;

            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).send('Data Not found');
            }

            role.roleName = roleName;
            role.active = active;

            await role.save();

            return res.status(200).send(role);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).send('Data Not found');
            }

            await role.destroy();

            return res.status(204);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    findById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).send('Data Not found');
            }

            return res.status(200).send(role);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
};
