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
    backgroundImage: '',
    description: 'Curso focado em programação, bancos de dados e desenvolvimento de software.',
    category: 'Tecnologia',
    students: 120,
    duration: '3 anos',
    rating: 4.7,
    createdAt: '2024-01-15',
    updatedAt: '2025-01-10',
  },
  {
    id: '2',
    name: 'Eletrônica',
    icon: CircuitBoard,
    theme: '#462EBE',
    backgroundImage: '',
    description: 'Curso sobre circuitos, dispositivos e manutenção eletrônica.',
    category: 'Engenharia',
    students: 85,
    duration: '3 anos',
    rating: 4.5,
    createdAt: '2024-02-01',
    updatedAt: '2025-01-12',
  },
  {
    id: '3',
    name: 'Design Gráfico',
    icon: Palette,
    theme: '#DC2816',
    backgroundImage: '',
    description: 'Curso de criação visual, edição de imagens e identidade visual.',
    category: 'Artes',
    students: 100,
    duration: '2 anos',
    rating: 4.8,
    createdAt: '2024-03-20',
    updatedAt: '2025-01-14',
  },
]
