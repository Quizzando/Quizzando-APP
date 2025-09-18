import type { Course, Discipline, User } from '@/models/@types'

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
    icon: '💻',
    backgroundImage:
      'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso focado em programação, bancos de dados e desenvolvimento de software.',
    disciplines: Array(5).fill({
      id: 'asasd',
      courseId: '1',
      name: 'Disciplina 1',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.7,
  },
  {
    id: '2',
    name: 'Eletrônica',
    icon: '📟',
    backgroundImage:
      'https://plus.unsplash.com/premium_photo-1664301887532-328f07bb2c24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Curso sobre circuitos, dispositivos e manutenção eletrônica.',
    disciplines: Array(8).fill({
      id: 'asasd',
      courseId: '2',
      name: 'Disciplina 2',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Design Gráfico',
    icon: '🎨',
    backgroundImage:
      'https://images.unsplash.com/photo-1599252441131-5aafffcf7740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso de criação visual, edição de imagens e identidade visual.',
    disciplines: Array(3).fill({
      id: 'asasd',
      courseId: '3',
      name: 'Disciplina 3',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Administração',
    icon: '📊',
    backgroundImage:
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1170&auto=format&fit=crop',
    description:
      'Curso voltado à gestão de empresas, planejamento estratégico e liderança.',
    disciplines: Array(8).fill({
      id: 'adm-1',
      courseId: '3',
      name: 'Disciplina Administração',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Serviços Jurídicos',
    icon: '⚖️',
    backgroundImage:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso sobre fundamentos do direito, legislação e práticas jurídicas.',
    disciplines: Array(8).fill({
      id: 'jur-1',
      courseId: '4',
      name: 'Disciplina Jurídica',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.4,
  },
  {
    id: '6',
    name: 'Matemática',
    icon: '📐',
    backgroundImage:
      'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso sobre álgebra, geometria, estatística e aplicações matemáticas.',
    disciplines: Array(8).fill({
      id: 'mat-1',
      courseId: '5',
      name: 'Disciplina Matemática',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'medio',
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Ciências Biológicas',
    icon: '🧬',
    backgroundImage:
      'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso voltado ao estudo dos seres vivos, ecologia e genética.',
    disciplines: Array(8).fill({
      id: 'bio-1',
      courseId: '6',
      name: 'Disciplina Biologia',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Física',
    icon: '🧲',
    backgroundImage:
      'https://images.unsplash.com/photo-1607988795691-3d0147b43231?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso sobre leis da natureza, energia, movimento e fenômenos físicos.',
    disciplines: Array(8).fill({
      id: 'fis-1',
      courseId: '7',
      name: 'Disciplina Física',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'medio',
    rating: 4.5,
  },
  {
    id: '9',
    name: 'História',
    icon: '📜',
    backgroundImage:
      'https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?q=80&w=1244&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Curso sobre civilizações, eventos históricos e transformações sociais.',
    disciplines: Array(8).fill({
      id: 'hist-1',
      courseId: '8',
      name: 'Disciplina História',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'medio',
    rating: 4.6,
  },
  {
    id: '10',
    name: 'Design de Interiores',
    icon: '🎨',
    backgroundImage:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop',
    description:
      'Curso sobre composição de ambientes, estética, conforto e funcionalidade.',
    disciplines: Array(8).fill({
      id: 'design-1',
      courseId: '9',
      name: 'Disciplina Design',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 'mtec',
    rating: 4.7,
  },
]
