import { type Request, type Response } from 'express';
import Profile from '../db/models/Profile';
import dotenv from 'dotenv';
import Helper from '../helpers/Helper';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const { BASE_URL, STORAGE_TYPE } = process.env;

interface MulterRequest extends Request {
  file: any;
}

export default {
  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { nome, sobreNome, documento } = req.body;
      const file = (req as MulterRequest).file;

      const profile = await Profile.findByPk(id);

      if (profile == null) {
        return res.status(404).send('Data Not found');
      }

      profile.nome = nome;
      profile.sobreNome = sobreNome;
      profile.documento = documento;

      if (file) {
        Helper.deleteFile(profile.arquivo, 'avatar');

        const { key, location: url = '' } = file;
        profile.avatar =
          STORAGE_TYPE === 's3' ? url : `${BASE_URL}/avatar/${key}`;
        profile.arquivo = key;
      }

      await profile.save();

      return res.status(StatusCodes.OK).send(profile);
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  },
  findById: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const profile = await Profile.findOne({
        where: {
          userId: id,
        },
      });

      if (profile == null) {
        return res.status(404).send('Data Not found');
      }

      return res.status(200).send(profile);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
};
