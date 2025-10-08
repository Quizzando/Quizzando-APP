import type { ComponentType } from 'react'

export interface Auth {
  user: User | null
}

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
  description?: string

  backgroundImage: string
  icon?: string | ComponentType

  // MTEC - MÉDIO-TÉCNICO | MEDIO - ENSINO MÉDIO
  category: 'mtec' | 'medio'
  rating?: number

  disciplines: Discipline[]

  createdAt?: string
  updatedAt?: string
}

export type Discipline = {
  id?: string
  courseId: string

  name: string
  description?: string

  createdAt?: string
  updatedAt?: string
}

export type Question = {
  id?: string
  disciplineId: string

  questionStatement: string
  // 0 - fácil | 1- médio | 2 - difícil
  difficulty: 0 | 1 | 2
  answers: Answer[]

  createdAt?: string
  updatedAt?: string
}

export type Answer = {
  id?: string
  questionId: string

  answerText: string
  isCorrect: boolean

  createdAt?: string
  updatedAt?: string
}

export type Quiz = Discipline & { questions: Question[] }
