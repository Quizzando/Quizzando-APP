import type { User } from '../@types'
import type {
  LoginFormSchema,
  RegisterFormSchema,
} from '@/models/schemas/auth-forms.schema'
import { handleApiResponse } from '@/utils/handleApiResponse'
import { decryptToken, getToken, setToken } from '@/utils/token'

export const authService = {
  // === REGISTER === //
  async register({
    username,
    email,
    password,
  }: Omit<RegisterFormSchema, 'confirmPassword'>): Promise<User | null> {
    try {
      await handleApiResponse(
        await fetch(`/api/user/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        }),
      )

      return await this.login({ email, password })
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      throw error
    }
  },

  // === LOGIN === //
  async login({ email, password }: LoginFormSchema): Promise<User | null> {
    try {
      const { token } = await handleApiResponse<{ token: string }>(
        await fetch(`/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }),
      )

      setToken(token)
      const { id } = decryptToken(token)
      return await this.getUser(id)
    } catch (error) {
      console.error('Erro ao logar usuário:', error)
      throw error
    }
  },

  // === GET USER === //
  async getUser(id: string): Promise<User | null> {
    try {
      const token = getToken()
      if (!token) throw new Error('Token não encontrado')

      return await handleApiResponse<User>(
        await fetch(`/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      )
    } catch (error) {
      console.error('Erro ao retornar usuário:', error)
      throw error
    }
  },
}
