import { Request, Response } from 'express';

export default {
    uploadImage: async (req: Request, res: Response): Promise<Response> => {
        try {
            // const {image} = req.;

            // if(!image) {
            return res.status(400).send('Data not Found');
            // }

            return res.status(200).send(null);
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
};

// yarn sequelize-cli model:generate --name Servico --attributes descricao:string
// yarn sequelize-cli model:generate --name Profile --attributes nome:string,sobreNome:string,avatar:string,documento:string,servicoId:number
