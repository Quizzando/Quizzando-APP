import type { Course, Discipline, Quiz, User } from '@/@types'

export const MOCK_DISCIPLINE_ID = '8dd48655-c99e-43c5-a541-38703ffd237c'

export const MOCK_QUESTIONS: Quiz['questions'] = [
  {
    id: 'd8ca3eba-0838-412e-8655-aace1c531194',
    disciplineId: 'bb7b19b7-993f-44f0-90b5-f9acc5c51bb0',
    questionStatement:
      'O que a ortografia representa no ensino da língua portuguesa?',
    difficulty: 0,

    answers: [
      {
        id: '7a6ed8e1-41c2-4777-8bc7-84ca9efa4d1',
        questionId: 'd8ca3eba-0838-412e-8655-aace1c531194',
        answerText: 'Sistema de escrita que padroniza a grafia das palavras.',
        isCorrect: true,
      },
      {
        id: '839531f8-7cdb-4a80-bc0a-7bf43934e3c0',
        questionId: 'd8ca3eba-0838-412e-8655-aace1c531194',
        answerText: 'Conjunto de regras de pontuação.',
        isCorrect: false,
      },
      {
        id: '7751eb7e-4820-49bf-8d38-e5b74b76fe6d',
        questionId: 'd8ca3eba-0838-412e-8655-aace1c531194',
        answerText: 'Estudo da origem das palavras.',
        isCorrect: false,
      },
      {
        id: '9d025f6e-e7c9-46e2-9cd7-fe7b5863e1fb',
        questionId: 'd8ca3eba-0838-412e-8655-aace1c531194',
        answerText: 'Análise da estrutura das frases.',
        isCorrect: false,
      },
      {
        id: 'ac51ee59-0630-4a6b-8a4f-b0892757d445',
        questionId: 'd8ca3eba-0838-412e-8655-aace1c531194',
        answerText: 'Disciplina focada na leitura rápida.',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'e20062ac-ca32-4cdf-9f50-b45d7529d545',
    disciplineId: 'bb7b19b7-993f-44f0-90b5-f9acc5c51bb0',
    questionStatement:
      'Qual a forma correta de grafar "sessão" em um contexto de reunião ou período de tempo?',
    difficulty: 0,

    answers: [
      {
        id: 'd02a1c61-59b2-463a-8838-b5c7865f2a7e',
        questionId: 'e20062ac-ca32-4cdf-9f50-b45d7529d545',
        answerText: 'Sessão',
        isCorrect: true,
      },
      {
        id: 'c9ab97c2-a8e2-4f7a-8246-ddcb51a45e2c',
        questionId: 'e20062ac-ca32-4cdf-9f50-b45d7529d545',
        answerText: 'Seção',
        isCorrect: false,
      },
      {
        id: '2777a0d1-eb2a-46ac-8506-805074250609',
        questionId: 'e20062ac-ca32-4cdf-9f50-b45d7529d545',
        answerText: 'Secção',
        isCorrect: false,
      },
      {
        id: 'b180bd20-15ef-4447-8037-7694bf255d31',
        questionId: 'e20062ac-ca32-4cdf-9f50-b45d7529d545',
        answerText: 'Cessão',
        isCorrect: false,
      },
      {
        id: '612dbf28-bfbf-42db-9b9c-45d08de63448',
        questionId: 'e20062ac-ca32-4cdf-9f50-b45d7529d545',
        answerText: 'Sessao',
        isCorrect: false,
      },
    ],
  },
  {
    id: '11247afd-bb04-4738-881e-7b3efbabb289',
    disciplineId: 'bb7b19b7-993f-44f0-90b5-f9acc5c51bb0',
    questionStatement:
      'Em qual situação o uso de letra maiúscula é obrigatório no início de uma palavra?',
    difficulty: 0,

    answers: [
      {
        id: '35dbc433-f89e-4a91-b02f-67eca632f91c',
        questionId: '11247afd-bb04-4738-881e-7b3efbabb289',
        answerText: 'Nome próprio de pessoa.',
        isCorrect: true,
      },
      {
        id: 'deab03f8-cbf4-48f0-86c6-84fac0f8ccd5',
        questionId: '11247afd-bb04-4738-881e-7b3efbabb289',
        answerText: 'Substantivo comum.',
        isCorrect: false,
      },
      {
        id: '9e8608aa-9e44-41a7-a638-db467999bbe7',
        questionId: '11247afd-bb04-4738-881e-7b3efbabb289',
        answerText: 'Nome de fruta.',
        isCorrect: false,
      },
      {
        id: '55cd78dc-2fa1-41a7-ba48-ff64e6753b0f',
        questionId: '11247afd-bb04-4738-881e-7b3efbabb289',
        answerText: 'Verbo no infinitivo',
        isCorrect: false,
      },
      {
        id: '4ce57e47-7209-4f69-a1d8-d9358af1e5bc',
        questionId: '11247afd-bb04-4738-881e-7b3efbabb289',
        answerText: 'Adjetivo qualificativo',
        isCorrect: false,
      },
    ],
  },
]

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
    courseName: 'Desenvolvimento de Sistemas',
    icon: '💻',
    backgroundImage:
      'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Desenvolvimento de Sistemas é projetado para capacitar os alunos nas habilidades necessárias para criar e manter aplicações e softwares, com foco em programação, análise de sistemas e gestão de bancos de dados. Os alunos aprenderão sobre linguagens de programação modernas, estruturas de dados, arquiteturas de sistemas, além de boas práticas de desenvolvimento e metodologias ágeis. Ao final do curso, estarão preparados para atuar em diversas áreas da tecnologia da informação.',
    disciplines: Array(5).fill({
      id: 'asasd',
      courseId: '1',
      disciplineName: 'Disciplina 1',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.7,
  },
  {
    id: '2',
    courseName: 'Eletrônica',
    icon: '📟',
    backgroundImage:
      'https://plus.unsplash.com/premium_photo-1664301887532-328f07bb2c24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Eletrônica é voltado para o estudo de circuitos, dispositivos eletrônicos e suas aplicações práticas no mercado. Os alunos aprenderão sobre componentes como resistores, transistores e capacitores, além de técnicas de montagem e manutenção de sistemas eletrônicos. O curso também aborda aspectos de automação, controle de processos e análise de sistemas digitais, preparando os alunos para trabalhar em áreas como telecomunicações, sistemas de energia e dispositivos eletrônicos industriais.',
    disciplines: Array(8).fill({
      id: 'asasd',
      courseId: '2',
      disciplineName: 'Disciplina 2',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.5,
  },
  {
    id: '3',
    courseName: 'Design Gráfico',
    icon: '🎨',
    backgroundImage:
      'https://images.unsplash.com/photo-1599252441131-5aafffcf7740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Design Gráfico oferece uma formação completa para profissionais que desejam atuar no mercado de comunicação visual. Com ênfase em técnicas de criação visual, edição de imagens e desenvolvimento de identidade visual, o curso aborda tanto os aspectos técnicos quanto criativos da profissão. Os alunos aprenderão sobre software de design, tipografia, teoria das cores e design digital, além de projetos gráficos para publicidade, marcas e mídias digitais. Ao final, estarão prontos para criar peças visuais impactantes e inovadoras.',
    disciplines: Array(3).fill({
      id: 'asasd',
      courseId: '3',
      disciplineName: 'Disciplina 3',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.8,
  },
  {
    id: '4',
    courseName: 'Administração',
    icon: '📊',
    backgroundImage:
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1170&auto=format&fit=crop',
    description:
      'O curso de Administração tem como objetivo preparar os alunos para a gestão eficiente de empresas e organizações em um ambiente dinâmico e competitivo. A formação inclui temas como planejamento estratégico, marketing, finanças, recursos humanos e liderança. Os alunos aprenderão a identificar e resolver problemas organizacionais, a otimizar processos e a tomar decisões fundamentadas em dados. Ao longo do curso, desenvolverão habilidades de gestão e comunicação, essenciais para o sucesso no mundo corporativo.',
    disciplines: Array(8).fill({
      id: 'adm-1',
      courseId: '3',
      disciplineName: 'Disciplina Administração',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.6,
  },
  {
    id: '5',
    courseName: 'Serviços Jurídicos',
    icon: '⚖️',
    backgroundImage:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Serviços Jurídicos é focado na formação de profissionais aptos a atuar em diversas áreas do direito, com ênfase nas práticas jurídicas e na aplicação da legislação vigente. O curso aborda temas como direito constitucional, direito civil, direito penal e administrativo, capacitando os alunos a lidarem com situações jurídicas em tribunais, escritórios de advocacia e órgãos públicos. Além disso, os alunos aprenderão sobre ética profissional, negociações legais e procedimentos forenses, garantindo um atendimento jurídico de alta qualidade.',
    disciplines: Array(8).fill({
      id: 'jur-1',
      courseId: '4',
      disciplineName: 'Disciplina Jurídica',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.4,
  },
  {
    id: '6',
    courseName: 'Matemática',
    icon: '📐',
    backgroundImage:
      'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Matemática é voltado para quem deseja aprofundar seus conhecimentos em álgebra, geometria, estatística e outras áreas fundamentais da matemática. O objetivo é capacitar os alunos para resolver problemas complexos, desenvolver raciocínio lógico e aplicar conceitos matemáticos em diversas áreas do conhecimento, como engenharia, economia e ciências naturais. Ao longo do curso, os alunos terão uma sólida formação teórica e prática, preparando-os para seguir carreira acadêmica ou atuar em setores como pesquisa, análise de dados e desenvolvimento de algoritmos.',
    disciplines: Array(8).fill({
      id: 'mat-1',
      courseId: '5',
      disciplineName: 'Disciplina Matemática',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 1,
    rating: 4.7,
  },
  {
    id: '7',
    courseName: 'Ciências Biológicas',
    icon: '🧬',
    backgroundImage:
      'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Ciências Biológicas oferece uma formação abrangente sobre o mundo dos seres vivos, incluindo o estudo de organismos, ecossistemas e genética. Os alunos aprenderão sobre biologia molecular, ecologia, evolução, anatomia e fisiologia, com a possibilidade de se especializar em áreas como microbiologia, zoologia ou biotecnologia. O curso prepara os alunos para atuarem em diversos campos da biologia, desde a pesquisa científica até a conservação ambiental e a saúde pública.',
    disciplines: Array(8).fill({
      id: 'bio-1',
      courseId: '6',
      disciplineName: 'Disciplina Biologia',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.8,
  },
  {
    id: '8',
    courseName: 'Física',
    icon: '🧲',
    backgroundImage:
      'https://images.unsplash.com/photo-1607988795691-3d0147b43231?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de Física oferece uma formação sólida nas leis fundamentais que governam o universo, abordando desde os conceitos de movimento e energia até fenômenos mais complexos como termodinâmica e física quântica. Com ênfase na teoria e na experimentação, o curso prepara os alunos para entenderem e aplicarem os conceitos físicos em áreas como engenharia, tecnologia e pesquisa científica. O curso inclui laboratórios práticos e a solução de problemas reais, garantindo um aprendizado profundo e dinâmico da ciência física.',
    disciplines: Array(8).fill({
      id: 'fis-1',
      courseId: '7',
      disciplineName: 'Disciplina Física',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 1,
    rating: 4.5,
  },
  {
    id: '9',
    courseName: 'História',
    icon: '📜',
    backgroundImage:
      'https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?q=80&w=1244&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'O curso de História é focado no estudo das civilizações, eventos históricos e transformações sociais que moldaram o mundo moderno. Os alunos aprenderão sobre períodos históricos significativos, como a Antiguidade, Idade Média, Renascimento e Era Contemporânea, explorando as interações entre culturas, políticas e economias ao longo do tempo. Além disso, o curso enfatiza a importância de entender o passado para interpretar o presente e prever possíveis futuros, sendo ideal para quem deseja trabalhar em educação, pesquisa, museus e preservação histórica.',
    disciplines: Array(8).fill({
      id: 'hist-1',
      courseId: '8',
      disciplineName: 'Disciplina História',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 1,
    rating: 4.6,
  },
  {
    id: '10',
    courseName: 'Design de Interiores',
    icon: '🎨',
    backgroundImage:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop',
    description:
      'O curso de Design de Interiores capacita os alunos a planejar, projetar e criar ambientes funcionais e esteticamente agradáveis. A formação abrange temas como composição de espaços, uso de materiais, iluminação e conforto, com foco em proporcionar soluções inovadoras para residências, escritórios e ambientes comerciais. Os alunos aprenderão a analisar necessidades dos clientes, aplicar tendências de design e utilizar ferramentas tecnológicas para criar projetos sustentáveis e personalizados, tornando-se aptos a atuar como profissionais completos na área.',
    disciplines: Array(8).fill({
      id: 'design-1',
      courseId: '9',
      disciplineName: 'Disciplina Design',
      description: 'lorem ipsum dolor sit amet.',
    } as Discipline),
    category: 0,
    rating: 4.7,
  },
]
