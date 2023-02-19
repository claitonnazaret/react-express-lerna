import { literal, object, string, TypeOf } from 'zod';

export const registerSchema = object({
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string()
        .nonempty('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export type RegisterInput = TypeOf<typeof registerSchema>;
