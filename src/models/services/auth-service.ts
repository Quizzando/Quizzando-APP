import type {
  LoginFormSchema,
  RegisterFormSchema,
} from '../schemas/auth-forms.schema'

export const authService = {
  // === REGISTER FUNCION === //
  async register({
    name,
    email,
    password,
  }: Omit<RegisterFormSchema, 'confirmPassword'>) {
    try {
      console.log('Registrando Usuário: ', name, email, password)
    } catch (error) {}
  },

  // === LOGIN FUNCTION === //
  async login({ email, password }: LoginFormSchema) {
    try {
      console.log('Logando Usuário: ', email, password)
    } catch (error) {}
  },
}
