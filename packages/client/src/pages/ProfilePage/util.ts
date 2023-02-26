import { object, string, TypeOf } from 'zod';

export const registerSchema = object({
    nome: string().nonempty('Nome é obrigatório'),
    sobreNome: string().nonempty('Sobrenome é obrigatório'),
    documento: string().nonempty('CPF/CNPJ é obrigatório'),
    password: string()
        .nonempty('Senha é obrigatório')
        .min(8, 'Senha deve conter mais de 8 caracteres')
        .max(32, 'Senha deve conter no máximo 32 caracteress'),
});

export type RegisterInput = TypeOf<typeof registerSchema>;
