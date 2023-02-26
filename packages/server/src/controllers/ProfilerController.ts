import { Request, Response } from 'express';
import Profile from '../db/models/Profile';

export default {
    update: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { nome, sobreNome, avatar, documento } = req.body;

            const profile = await Profile.findByPk(id);

            if (!profile) {
                return res.status(404).send('Data Not found');
            }

            profile.nome = nome;
            profile.sobreNome = sobreNome;
            profile.avatar = avatar;
            profile.documento = documento;

            await profile.save();

            return res.status(200).send(profile);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    findById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const profile = await Profile.findByPk(id);

            if (!profile) {
                return res.status(404).send('Data Not found');
            }

            return res.status(200).send(profile);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
};
