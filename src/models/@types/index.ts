export type User = {
  id?: string

  name: string
  email: string
  score: number
  admin: boolean
}

export interface Auth {
  user: User | null
  token: string | null
}