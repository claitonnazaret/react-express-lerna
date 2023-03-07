import Validator from 'validatorjs';
import { type Request, type Response, type NextFunction } from 'express';
import User from '../../db/models/User';

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        const data = {
            name,
            email,
            password,
            confirmPassword,
        };

        const rules: Validator.Rules = {
            name: 'required|string|max:50',
            email: 'required|email',
            password: 'required|min:8',
            confirmPassword: 'required|same:password',
        };

        const validate = new Validator(data, rules);

        if (validate.fails()) {
            return res.status(400).send(validate.errors);
        }

        const user = await User.findOne({
            where: {
                email: data.email,
            },
        });

        if (user != null) {
            return res.status(400).send('Email já cadastrado!');
        }

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
};

export default { RegisterValidation };
