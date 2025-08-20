import type { Auth, User } from '@/models/@types'
import { createContext, useEffect, useState } from 'react'

type AuthProviderState = Auth & {
  register: () => Promise<void>
  login: () => Promise<void>
  logout: () => void
}

const initialState: AuthProviderState = {
  user: null,
  token: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
}

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<Auth['user']>(null)
  const [token, setToken] = useState<Auth['token']>(null)

  const register = async () => {}

  const login = async () => {}

  const logout = () => {}

  return (
    <AuthProviderContext.Provider
      value={{ user, token, register, login, logout }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}
