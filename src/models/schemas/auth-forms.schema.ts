import { z } from 'zod'

export const baseSchema = z.object({
  email: z.string().email({ message: 'Email é um campo obrigatório.' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve conter no mínimo 8 caracteres.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
    }),
})

export const registerSchema = baseSchema
  .extend({
    name: z.string().min(3).max(50),
    confirmPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message:
          'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
      }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'Senhas não coincidem.',
    path: ['confirmPassword'],
  })

export type LoginFormSchema = z.infer<typeof baseSchema>
export type RegisterFormSchema = z.infer<typeof registerSchema>
