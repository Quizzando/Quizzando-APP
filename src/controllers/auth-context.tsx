import { MOCK_USER } from '@/constants/mock'
import type { Auth } from '@/models/@types'
import { authService } from '@/models/services/auth-service'
import { createContext, useEffect, useState } from 'react'

export type AuthProviderState = Auth & {
  isLoading: boolean
  error: string | null
  register: (username: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const initialState: AuthProviderState = {
  user: null,
  isLoading: false,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
}

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<Auth['user']>(initialState.user)
  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [error, setError] = useState<string | null>(initialState.error)

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true)
      setError(null)

      const newUser = await authService.register({ username, email, password })
      setUser(newUser)
    } catch (error) {
      console.error(error)
      setError('Erro ao registrar usuário')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const loggedUser = await authService.login({ email, password })
      setUser(loggedUser)

      // === MOCKAGEM PARA TESTES =========================================== //
      // 1. Simulação da API com atraso de 3 segundos
      // await new Promise((resolve) => setTimeout(resolve, 3000))
      // 2. retorno do token
      // authService.setToken('token-100-por-cento-autentico-confia')
      // 3. retorno do usuário mockado
      // setUser(MOCK_USER)
    } catch (error) {
      console.error(error)
      setError('Erro ao logar usuário')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authService.setToken(null)
    setUser(null)
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // === MOCKAGEM PARA TESTES === //
        // setUser(MOCK_USER)
        const token = authService.getToken()
        if (token) {
          const { id } = authService.decryptToken(token)
          const loggedUser = await authService.getUser(id)

          setUser(loggedUser)
        } else {
          logout()
        }
      } catch (error) {
        console.error(error)
        setError('Erro ao carregar usuário')
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  return (
    <AuthProviderContext.Provider
      value={{ user, isLoading, error, register, login, logout }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}
