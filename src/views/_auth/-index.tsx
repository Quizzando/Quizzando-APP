import { CourseCard } from '@/components/CourseCard'
import { Footer } from '@/components/Footer/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { MOCK_COURSES } from '@/constants/mock'
import type { Course } from '@/models/@types'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  FastForward,
  LucidePencil,
  Palette,
  Star,
  Users,
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

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center space-x-2 font-bold font-['Slackey'] text-background"
        >
          <div className="bg-chart-4 p-3 rounded-sm transition-transform hover:-translate-y-1">
            QU
          </div>
          <div className="bg-chart-2 p-3 rounded-sm transition-transform hover:-translate-y-1">
            IZZ
          </div>
          <div className="bg-chart-5 p-3 rounded-sm transition-transform hover:-translate-y-1">
            AN
          </div>
          <div className="bg-chart-3 p-3 rounded-sm transition-transform hover:-translate-y-1">
            DO
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="outline" className="p-6">
            Entrar
          </Button>
        </nav>
      </div>
    </header>
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

/*
 <main>
      <nav className="w-full bg-primary py-8 px-10 flex items-center justify-between border-b-2 border-b-muted shadow-md backdrop-blur-md">
        <Link
          to="/"
          className="flex items-center justify-center space-x-1 font-bold font-['Slackey'] text-white cursor-pointer select-none"
        >
          <div className="bg-chart-4 p-3 rounded-sm shadow-red-popover shadow-md transition-transform hover:-translate-y-1">
            QU
          </div>
          <div className="bg-chart-2 p-3 rounded-sm shadow-red-popover shadow-md transition-transform hover:-translate-y-1">
            IZZ
          </div>
          <div className="bg-chart-5 p-3 rounded-sm shadow-red-popover shadow-md transition-transform hover:-translate-y-1">
            AN
          </div>
          <div className="bg-chart-3 p-3 rounded-sm shadow-red-popover shadow-md transition-transform hover:-translate-y-1">
            DO
          </div>
        </Link>
        <Link to="/login">
          <Button variant={'outline'} className="px-10 py-6 font-bold">
            Logar-se
          </Button>
        </Link>
      </nav>
      <main>
        <section className="relative w-full min-h-screen bg-gradient-to-b from-primary/90 to-accent shadow-lg pb-20">
          <div className="container max-w-5xl mx-auto px-4 py-16 md:py-32">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
              <div className="flex flex-col space-y-6 max-w-full lg:max-w-[50%]">
                <h1 className="text-4xl md:text-5xl font-bold font-['Slackey'] tracking-wider text-balance">
                  Quizzando
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-pretty">
                  Aprender nunca foi tão interativo!
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-pretty">
                  Prepare-se para testar seus conhecimentos de forma rápida e
                  divertida. Responda às perguntas, avalie seu desempenho e
                  descubra quais seus pontos fortes - e onde pode melhorar!
                </p>
                <Link to="/register" className="w-fit">
                  <Button className="p-8 text-lg bg-secondary hover:bg-secondary/80 transition-colors">
                    Cadastre-se para começar
                  </Button>
                </Link>
              </div>

              <div className="flex-shrink-0">
                <img
                  src="/hero.svg"
                  alt="Ilustração de pessoas fazendo quiz interativo"
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 md:-bottom-32 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
            <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DIALOG_TEXT.map((item, index) => (
                    <Card
                      key={index}
                      className="transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:shadow-primary/20 border-0 bg-background/50"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <div className="p-2 rounded-lg bg-secondary/10">
                            {item.icon}
                          </div>
                          <span className="text-accent font-semibold">
                            {item.name}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container max-w-5xl mx-auto px-4 py-24 md:py-32 mt-16 md:mt-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-shrink-0">
              <div className="grid grid-cols-2 gap-4 w-80 h-80">
                <div className="w-36 h-36 bg-chart-4 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                  QU
                </div>
                <div className="w-36 h-36 bg-chart-2 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                  IZZ
                </div>
                <div className="w-36 h-36 bg-chart-5 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                  AN
                </div>
                <div className="w-36 h-36 bg-chart-3 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                  DO
                </div>
              </div>
            </div>

            <div className="max-w-full lg:max-w-[50%] flex flex-col space-y-6">
              <p className="text-lg leading-relaxed text-pretty text-foreground">
                Que tal testar seus conhecimentos de um jeito divertido?
                Preparamos um quiz especial para você se desafiar, aprender e se
                divertir ao mesmo tempo.
              </p>
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                É simples: entre, responda e veja até onde consegue chegar,
                jogue sozinho ou desafie seus amigos.
              </p>
            </div>
          </div>
        </section>
      </main>
    </main>
*/
