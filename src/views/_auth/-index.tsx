import { CourseCard } from '@/components/CourseCard'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { MOCK_COURSES } from '@/constants/mock'
import type { Course } from '@/models/@types'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FastForward,
  LucidePencil,
  Palette,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <CoursesCarousel courses={MOCK_COURSES} />
      <Footer />
    </>
  )
}

function HeroSection() {
  const HERO_TEXT = [
    {
      name: 'Rápido',
      description: 'Apenas 5 perguntas para testar seus conhecimentos',
      icon: <FastForward className="text-primary" />,
    },
    {
      name: 'Personalizado',
      description: 'Questões divertidas que tornam o aprendizado mais leve',
      icon: <Palette className="text-secondary" />,
    },
    {
      name: 'Prático',
      description: 'Ajuda a identificar onde você se destaca e pode melhorar.',
      icon: <LucidePencil className="text-primary" />,
    },
  ]

  return (
    <section className="bg-primary/20 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-playfair text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Aprender Nunca foi tão{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Interativo
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl text-pretty">
            Prepare-se para testar seus conhecimentos de forma rápida e
            divertida. Responda às perguntas, descubra seu desempenho e veja
            onde você manda bem –{' '}
            <span className="font-bold">e onde pode melhorar!</span>
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="group">
                Começar
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/sobre">
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {HERO_TEXT.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-3">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CoursesCarousel({ courses }: { courses: Course[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + courses.length) % courses.length,
    )
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const getVisibleCourses = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % courses.length
      visible.push(courses[index])
    }
    return visible
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Quizzes por Cursos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explore nossa seleção de quizzes através de uma organização por{' '}
            <span className="font-bold text-primary">Cursos</span> e{' '}
            <span className="font-bold text-primary">Disciplinas</span>
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleCourses().map((course, index) => (
                <CourseCard
                  key={`${course.id}-${currentIndex}-${index}`}
                  course={course}
                />
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {courses.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
