import type { TypeLoginFormSchema, TypeRegisterFormSchema } from "../types";


export const loginService = async ({email, password}: TypeLoginFormSchema) => 
{
    console.log(`Login Enviado: ${email} | ${password}`);
};

export const registerService = async ({name, email, password}: Omit<TypeRegisterFormSchema, 'confirmPassword'>) => 
{
    console.log(`Registro Enviado: ${name} | ${email} | ${password}`);
};