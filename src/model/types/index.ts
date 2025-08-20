import type z from "zod";
import type { loginFormSchema, registerFormSchema } from "../schemas/authForm.schema";

export interface User {
    id?: string;

    username: string;
    email: string;
    
    score: number;
    admin: boolean;
};

export interface Auth {
    user: User | null;
    token: string | null;
}

export type TypeLoginFormSchema = z.infer<typeof loginFormSchema>;
export type TypeRegisterFormSchema = z.infer<typeof registerFormSchema>;