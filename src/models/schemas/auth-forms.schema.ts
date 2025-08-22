import { z } from 'zod'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

export const baseSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido.' })
    .nonempty({ message: 'Email é um campo obrigatório.' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve conter no mínimo 8 caracteres.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
      message:
        'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
    }),
})

export const registerSchema = z
  .object({
    name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Email inválido.' })
      .nonempty({ message: 'Email é um campo obrigatório.' }),
    password: z
      .string()
      .min(8, { message: 'Senha deve conter no mínimo 8 caracteres.' })
      .regex(PASSWORD_REGEX, {
        message:
          'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Senha deve conter no mínimo 8 caracteres.' })
      .regex(PASSWORD_REGEX, {
        message:
          'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
      }),
  })

export type LoginFormSchema = z.infer<typeof baseSchema>
export type RegisterFormSchema = z.infer<typeof registerSchema>
