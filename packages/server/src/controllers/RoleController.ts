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

            return res.status(200).send(Helper.ResponseData('OK', undefined, roles));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { roleName, active } = req.body;

            const create = await Role.create({
                roleName,
                active,
            });

            return res.status(201).send(Helper.ResponseData('Created', undefined, create));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { roleName, active } = req.body;

            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).send(Helper.ResponseData('Data Not found', undefined, null));
            }

            role.roleName = roleName;
            role.active = active;

            await role.save();

            return res.status(200).send(Helper.ResponseData('OK', undefined, role));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).send(Helper.ResponseData('Data Not found', undefined, null));
            }

            await role.destroy();

            return res.status(200).send(Helper.ResponseData('No Content', undefined, undefined));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
    findById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).send(Helper.ResponseData('Data Not found', undefined, null));
            }

            return res.status(200).send(Helper.ResponseData('OK', undefined, role));
        } catch (error: any) {
            return res.status(500).send(Helper.ResponseData('', error, undefined));
        }
    },
};
