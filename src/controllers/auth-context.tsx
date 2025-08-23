import type { Auth } from '@/models/@types'
import { authService } from '@/models/services/auth-service'
import { createContext, useEffect, useState } from 'react'

export type AuthProviderState = Auth & {
  isLoading: boolean
  error: string | null
  register: (name: string, email: string, password: string) => Promise<void>
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

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const newUser = await authService.register({ name, email, password })
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
    console.log(user)
  }, [user])

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true)
      setError(null)

      const token = authService.getToken()
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const { id } = authService.decryptToken(token) as { id: string }

        // ... fazer a lógica de expiração do token / implementar estratégia de refresh

        const user = await authService.getUser(id)

        if (!user) {
          setError('usuário não encontrado')
          return
        }

        setUser(user)
      } catch (error) {
        console.error(error)
        setError('Erro ao carregar usuário')
        // logout()
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
