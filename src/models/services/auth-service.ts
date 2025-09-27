import { decodeJwt } from 'jose'
import type { User } from '../@types'
import type {
  LoginFormSchema,
  RegisterFormSchema,
} from '@/models/schemas/auth-forms.schema'

const AUTH_TOKEN_KEY = 'auth-token'

export const authService = {
  // === SET AUTH TOKEN FUNCTION === //
  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  },
  // === GET AUTH TOKEN FUNCTION === //
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },
  // === DECRYPT TOKEN FUNCTION === //
  decryptToken(token: string) {
    const payload = decodeJwt(token)
    console.log(payload)

    // ID do usuário está dentro deste claim:
    return {
      id: payload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
      ] as string,
    }
  },
  // === REGISTER FUNCTION === //
  async register({
    username,
    email,
    password,
  }: Omit<RegisterFormSchema, 'confirmPassword'>): Promise<User | null> {
    try {
      // 1. Chama a API do backend
      const response = await fetch(`/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      // 2. Lança erros caso a requisição tenha falhado
      if (!response.ok) {
        throw new Error(`Erro ao registrar: ${response.status}`)
      }

      // 3. Se deu certo, armazena o token no localStorage
      // const { token } = await response.json()
      // this.setToken(token)

      // 3. Se deu certo, tenta executar o login automático
      return await this.login({ email, password })

      // 4. Extrai as informações de dentro do token (nesse caso, o ID)
      // const { id } = this.decryptToken(token) as { id: string }

      // 5. Busca usuário por ID e retorna
      // return await this.getUser(id)
    } catch (error) {
      console.error('Erro ao registrar usuário: ', error)
      return null
    }
  },

  // === LOGIN FUNCTION === //
  async login({ email, password }: LoginFormSchema): Promise<User | null> {
    try {
      // 1. Chama a API do backend
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      // 2. Lança erros caso a requisição tenha falhado
      if (!response.ok) {
        throw new Error(`Erro ao logar: ${response.status}`)
      }

      // 3. Se deu certo, armazena o token no localStorage
      const { token } = await response.json()
      this.setToken(token)

      // 4. Extrai as informações de dentro do token (nesse caso, o ID)
      const { id } = this.decryptToken(token) as { id: string }

      // 5. Busca usuário por ID e retorna
      return await this.getUser(id)
    } catch (error) {
      console.error('Erro ao logar usuário: ', error)
      return null
    }
  },

  // === GET USER FUNCTION === //
  async getUser(id: string): Promise<User | null> {
    try {
      const token = this.getToken()

      if (!token) {
        console.warn('Token não encontrado')
        return null
      }

      const response = await fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Falha na requisição: ${response.status}`)
      }

      return (await response.json()) as User
    } catch (error) {
      console.error('Erro ao retornar usuário: ', error)
      return null
    }
  },
}
