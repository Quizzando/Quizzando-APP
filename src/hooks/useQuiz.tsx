import { QuizProviderContext } from '@/context/QuizContext'
import { useContext } from 'react'

export const useQuiz = () => {
  const context = useContext(QuizProviderContext)
  if (!context) {
    throw new Error('useQuiz must be used within an QuizProvider')
  }
  return context
}
