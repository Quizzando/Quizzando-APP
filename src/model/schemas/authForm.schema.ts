import {z} from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Email inválido.' }).nonempty(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    , {message: 'Senha não cumpre os critérios.'}).nonempty()
});


const registerFormFields = z.object({
    name: z.string().min(3, {message:'Nome de usuário deve possuir no mínimo 3 caracteres'}),
    confirmPassword: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    , {message: 'Senha não cumpre os critérios.'}).nonempty()
})

export const registerFormSchema = registerFormFields.merge(loginFormSchema)
.refine((value) =>  value.confirmPassword === value.password, {message: 'Senhas não coincidem.'});