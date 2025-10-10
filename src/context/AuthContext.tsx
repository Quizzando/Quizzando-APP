import type { Auth } from '@/@types'
import { authService } from '@/models/services/AuthService'
import { decryptToken, getToken, setToken } from '@/utils/token'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

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

  // === REGISTER === //
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
      toast.success('Conta criada com sucesso!', {
        description: `Bem-vindo(a), ${newUser?.username || 'usuário'}!`,
      })
    } catch (err: any) {
      const message = err?.message || 'Erro ao registrar usuário.'
      console.error(err)
      setError(message)
      toast.error('Falha ao registrar', {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // === LOGIN === //
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const loggedUser = await authService.login({ email, password })
      setUser(loggedUser)
      toast.success('Login realizado com sucesso!', {
        description: `Olá novamente, ${loggedUser?.username || 'usuário'} 👋`,
      })
    } catch (err: any) {
      const message = err?.message || 'Erro ao logar usuário.'
      console.error(err)
      setError(message)
      toast.error('Falha no login', {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // === LOGOUT === //
  const logout = () => {
    setToken(null)
    setUser(null)
    toast('Sessão encerrada', {
      description: 'Você saiu da sua conta com sucesso.',
    })
  }

  // === LOAD USER ON STARTUP === //
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const token = getToken()
        if (token) {
          const { id } = decryptToken(token)
          const loggedUser = await authService.getUser(id)
          setUser(loggedUser)
          toast.success('Sessão restaurada', {
            description: `Bem-vindo de volta, ${loggedUser?.username || 'usuário'}!`,
          })
        } else {
          logout()
        }
      } catch (err: any) {
        const message = err?.message || 'Erro ao carregar usuário.'
        console.error(err)
        setError(message)
        toast.error('Falha ao carregar sessão', {
          description: message,
        })
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
