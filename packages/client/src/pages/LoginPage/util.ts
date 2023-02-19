import { object, string, TypeOf } from 'zod';

export const registerSchema = object({
    email: string().nonempty('Email é obrigatório').email('Email inválido'),
    password: string()
        .nonempty('Senha é obrigatório')
        .min(8, 'Senha deve conter mais de 8 caracteres')
        .max(32, 'Senha deve conter no máximo 32 caracteress'),
});

export type RegisterInput = TypeOf<typeof registerSchema>;
