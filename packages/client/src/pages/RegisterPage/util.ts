import { object, string, number, TypeOf } from 'zod';

export const registerSchema = object({
    name: string().nonempty('Nome é obrigatório'),
    email: string().nonempty('Email é obrigatório').email('Email inválido'),
    password: string()
        .nonempty('Senha é obrigatório')
        .min(8, 'Senha deve conter mais de 8 caracteres')
        .max(32, 'Senha deve conter no máximo 32 caracteress'),
    confirmPassword: string()
        .nonempty('Você deve confirmar a senha')
        .min(8, 'Senha deve conter mais de 8 caracteres')
        .max(32, 'Senha deve conter no máximo 32 caracteress'),
    roleId: number().gte(1, { message: 'Você deve informar o Tipo de cadastro' }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
});

export type RegisterInput = TypeOf<typeof registerSchema>;
