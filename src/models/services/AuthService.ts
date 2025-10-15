import type { User } from '@/@types'
import { API_BASE_URL } from '@/constants/api'
import type {
  LoginFormSchema,
  RegisterFormSchema,
} from '@/models/schemas/auth-forms.schema'
import { handleApiResponse } from '@/utils/handleApiResponse'
import { decryptToken, getToken, setToken } from '@/utils/token'

export const authService = {
  async register({
    username,
    email,
    password,
  }: Omit<RegisterFormSchema, 'confirmPassword'>): Promise<User | null> {
    try {
      await handleApiResponse(
        await fetch(`${API_BASE_URL}/user/register`, {
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

  async login({ email, password }: LoginFormSchema): Promise<User | null> {
    try {
      const { token } = await handleApiResponse<{ token: string }>(
        await fetch(`${API_BASE_URL}/user/login`, {
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

  async getUser(id: string): Promise<User | null> {
    try {
      const token = getToken()
      if (!token) throw new Error('Token não encontrado')

      return await handleApiResponse<User>(
        await fetch(`${API_BASE_URL}/user/${id}`, {
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
