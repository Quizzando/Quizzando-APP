import type { Quiz } from '@/models/@types'
import { quizService } from '@/models/services/quiz-service'
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import { toast } from 'sonner'

export type QuizProviderState = {
  isLoading: boolean
  error: string | null
  quiz: Quiz | null // Quiz da disciplina em questão
  userScore: {
    right: string[] // Array com o ID das questões que acertou
    wrongs: string[] // Array com o ID das questões que errou
    time: Date // tempo para responder ao quiz
  }
  currentQuestionIndex: number
  handleAnswer: (questionId: string, isCorrect: boolean) => void
}

const initialState: QuizProviderState = {
  error: null,
  isLoading: false,
  quiz: null,
  userScore: {
    right: [],
    wrongs: [],
    time: new Date(0),
  },
  currentQuestionIndex: 0,
  handleAnswer: () => {},
}

export const QuizProviderContext =
  createContext<QuizProviderState>(initialState)

interface QuizProviderProps extends PropsWithChildren {
  disciplineId: string
}

export const QuizProvider = ({ disciplineId, children }: QuizProviderProps) => {
  const [error, setError] = useState<string | null>(initialState.error)
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading)

  const [quiz, setQuiz] = useState<Quiz | null>(initialState.quiz)
  const [userScore, setUserScore] = useState(initialState.userScore)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialState.currentQuestionIndex,
  )

  useEffect(() => {
    const generateQuizBasedOnDisciplineId = async () => {
      try {
        setError(null)
        setIsLoading(true)

        const generatedQuiz = await quizService.generateQuiz(disciplineId)
        setQuiz(generatedQuiz)
      } catch (err: any) {
        const message =
          err?.message || 'Erro ao gerar quiz para essa disciplina.'
        console.error(err)
        setError(message)
        toast.error('Falha na geração de quiz', {
          description: message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    generateQuizBasedOnDisciplineId()
  }, [disciplineId])

  const handleAnswer = (questionId: string, isCorrect: boolean) => {
    setUserScore((prev) => ({
      ...prev,
      right: isCorrect ? [...prev.right, questionId] : prev.right,
      wrongs: !isCorrect ? [...prev.wrongs, questionId] : prev.wrongs,
    }))

    setCurrentQuestionIndex((prev) => prev + 1)
  }

  return (
    <QuizProviderContext.Provider
      value={{
        quiz,
        userScore,
        error,
        isLoading,
        handleAnswer,
        currentQuestionIndex,
      }}
    >
      {children}
    </QuizProviderContext.Provider>
  )
}
