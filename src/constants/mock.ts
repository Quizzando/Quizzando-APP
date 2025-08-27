import type { Course, User } from '@/models/@types'
import { Binary, CircuitBoard, Palette } from 'lucide-react'

export const MOCK_USER: User = {
  id: '1a2b3c4d',
  pfp: 'https://plus.unsplash.com/premium_photo-1680303134459-912abf8efe2f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  username: 'Quizzando',
  email: 'quizzandoApp@gmail.com',
  score: 100,
  admin: true,
}

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    name: 'Desenvolvimento de Sistemas',
    icon: Binary,
    theme: '#DBC332',
  },
  {
    id: '2',
    name: 'Eletrônica',
    icon: CircuitBoard,
    theme: '#462EBE',
  },
  {
    id: '3',
    name: 'Desgin Gráfico',
    icon: Palette,
    theme: '#DC2816',
  },
]
