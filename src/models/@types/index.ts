import type { ComponentType } from 'react'

export type User = {
  id?: string

  username: string
  email: string
  pfp: string
  score: number
  admin: boolean

  createdAt?: string
  updatedAt?: string
}

export type Course = {
  id?: string

  name: string
  icon?: ComponentType
  theme?: string

  createdAt?: string
  updatedAt?: string
}

export interface Auth {
  user: User | null
}
