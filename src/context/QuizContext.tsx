import type { Answer, Quiz } from '@/@types'
import { disciplineService } from '@/models/services/DisciplineService'
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { toast } from 'sonner'

export type QuizProviderState = {
  isLoading: boolean
  error: string | null
  quiz: Quiz | null
  userScore: {
    right: Answer[]
    wrongs: Answer[]
    time: string
  }
  currentQuestionIndex: number
  handleAnswer: (answer: Answer) => void
  completeQuiz: () => void
  invalidateQuiz: () => void
  skipQuestion: () => void
}

const initialState: QuizProviderState = {
  error: null,
  isLoading: false,
  quiz: null,
  userScore: {
    right: [],
    wrongs: [],
    time: '00:00',
  },
  currentQuestionIndex: 0,
  handleAnswer: () => {},
  completeQuiz: () => {},
  invalidateQuiz: () => {},
  skipQuestion: () => {},
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

  const startTimeRef = useRef<Date | null>(null)
  const timerInterval = useRef<number | null>(null)

  // Format time as mm:ss
  const formatElapsedTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  // Generate quiz and start timer
  useEffect(() => {
    const generateQuizBasedOnDisciplineId = async () => {
      try {
        setError(null)
        setIsLoading(true)

        const generatedQuiz = await disciplineService.generateQuiz(disciplineId)
        setQuiz(generatedQuiz)

        // Start timer
        startTimeRef.current = new Date()
        timerInterval.current = setInterval(() => {
          if (startTimeRef.current && !isQuizCompletedRef.current) {
            const elapsed = Date.now() - startTimeRef.current.getTime()
            setUserScore((prev) => ({
              ...prev,
              time: formatElapsedTime(elapsed),
            }))
          }
        }, 1000)
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

    // Cleanup interval on unmount
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current)
    }
  }, [disciplineId])

  const handleAnswer = (answer: Answer) => {
    setUserScore((prev) => ({
      ...prev,
      right: answer.isCorrect ? [...prev.right, answer] : prev.right,
      wrongs: !answer.isCorrect ? [...prev.wrongs, answer] : prev.wrongs,
    }))

    setCurrentQuestionIndex((prev) => prev + 1)
  }

  const isQuizCompletedRef = useRef(false)

  const completeQuiz = () => {
    if (isQuizCompletedRef.current) return // already completed
    isQuizCompletedRef.current = true

    if (timerInterval.current) {
      clearInterval(timerInterval.current)
      timerInterval.current = null
    }

    if (startTimeRef.current) {
      const totalTime = Date.now() - startTimeRef.current.getTime()
      setUserScore((prev) => ({
        ...prev,
        time: formatElapsedTime(totalTime),
      }))
    }

    toast.success('Quiz concluído!', {
      description: `Tempo total: ${userScore.time}`,
    })
  }

  const invalidateQuiz = () => {
    if (timerInterval.current) clearInterval(timerInterval.current)
    isQuizCompletedRef.current = false
    startTimeRef.current = null

    setQuiz(initialState.quiz)
    setUserScore(initialState.userScore)
    setCurrentQuestionIndex(initialState.currentQuestionIndex)
    setError(initialState.error)
    setIsLoading(initialState.isLoading)

    toast.info('Quiz reiniciado com sucesso.')
  }

  const skipQuestion = () => {
    const currentQuestion = quiz?.questions[currentQuestionIndex]
    if (currentQuestion) {
      handleAnswer({
        answerText: '-',
        isCorrect: false,
        questionId: currentQuestion.id!,
        id: 'skipped-' + Math.random().toString(36).substr(2, 9), // unique id
      })
    }
  }

  return (
    <QuizProviderContext.Provider
      value={{
        quiz,
        userScore,
        error,
        isLoading,
        handleAnswer,
        completeQuiz,
        invalidateQuiz,
        currentQuestionIndex,
        skipQuestion,
      }}
    >
      {children}
    </QuizProviderContext.Provider>
  )
}
