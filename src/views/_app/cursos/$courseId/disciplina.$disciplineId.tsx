import { createFileRoute } from '@tanstack/react-router'
import { QuizProvider } from '@/context/QuizContext'
import { useQuiz } from '@/hooks/useQuiz'
import { QuestionBox } from '../-components/question'
import { QuizCompletedScreen } from '../-components/quiz-completed'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Clock } from '../-components/clock'

export const Route = createFileRoute(
  '/_app/cursos/$courseId/disciplina/$disciplineId',
)({
  onLeave: async ({ context }) => {
    const { invalidateQuiz } = context.quiz || {}
    const confirmed = window.confirm(
      'Tem certeza que deseja sair? Isso encerrará seu quiz atual.',
    )
    if (confirmed && invalidateQuiz) {
      invalidateQuiz()
      return true
    }
    return false // block navigation
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { disciplineId } = Route.useParams()

  return (
    <QuizProvider disciplineId={disciplineId}>
      <QuizWrapper />
    </QuizProvider>
  )
}

const QuizWrapper = () => {
  const { quiz, isLoading, currentQuestionIndex, skipQuestion } = useQuiz()
  const [timeLeft, setTimeLeft] = useState(30)

  // Reset timer whenever question changes
  useEffect(() => {
    setTimeLeft(30)
  }, [currentQuestionIndex])

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      skipQuestion()
      return
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // Prevent leaving mid-quiz
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  if (isLoading || !quiz) return <div>Loading...</div>
  const question = quiz.questions[currentQuestionIndex]

  if (!question) return <QuizCompletedScreen />

  return (
    <div className="max-w-5xl min-h-screen mx-auto flex flex-col items-center justify-start space-y-6 px-6 py-12">
      <div className="w-full flex items-center space-x-6">
        <span className="min-w-14 font-bold">
          {currentQuestionIndex + 1}/{quiz.questions.length}
        </span>
        <Progress
          value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
        />
        <Clock seconds={timeLeft} />
      </div>
      <QuestionBox
        key={question.id}
        question={question}
        disciplineName={quiz.disciplineName}
      />
    </div>
  )
}
