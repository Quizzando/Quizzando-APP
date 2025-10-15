import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import type { Answer, Question } from '@/@types'
import { Button } from '@/components/ui/button'
import { shuffleArray } from '@/utils/shuffleArray'
import { useQuiz } from '@/hooks/useQuiz'

interface QuestionProps {
  question: Question & { answers: Answer[] }
  disciplineName?: string
}

export const QuestionBox = ({ question, disciplineName }: QuestionProps) => {
  const { handleAnswer } = useQuiz()

  const { questionStatement, difficulty, answers } = question
  const [shuffledAnswers] = useState(shuffleArray(answers))

  const [excludedAnswers, setExcludedAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const opts = ['A)', 'B)', 'C)', 'D)', 'E)']
  const diff =
    difficulty === 0 ? 'Fácil' : difficulty === 1 ? 'Médio' : 'Difícil'

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Fácil':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Difícil':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const toggleExcludeAnswer = (answerId: string) => {
    if (isAnswered) return
    setExcludedAnswers((prev) =>
      prev.includes(answerId)
        ? prev.filter((id) => id !== answerId)
        : [...prev, answerId],
    )
  }

  const confirmAnswer = () => {
    if (!selectedAnswer) return
    setIsAnswered(true)

    // Visual feedback delay (optional)
    setTimeout(() => {
      handleAnswer(selectedAnswer)
    }, 800)
  }

  return (
    <div className="w-5xl relative p-6 bg-primary/10 border border-primary/20 rounded-xl flex flex-col items-center space-y-4">
      <Badge
        variant="outline"
        className={`absolute top-6 right-6 px-4 ${getDifficultyColor(diff)}`}
      >
        {diff}
      </Badge>

      <h1 className="font-bold mb-2">
        {disciplineName ?? question.disciplineId} | {question.id}
      </h1>

      <div className="w-full p-8 bg-card rounded-xl flex flex-col space-y-12">
        <h3 className="self-center text-justify">{questionStatement}</h3>

        <ul className="space-y-4">
          {shuffledAnswers.map((a, i) => {
            const isExcluded = excludedAnswers.includes(a.id as string)
            const isSelected = selectedAnswer?.id === a.id
            const isCorrect = a.isCorrect

            let borderClasses = ''
            if (isAnswered) {
              if (isCorrect)
                borderClasses = 'border-2 bg-green-100 border-green-300'
              else if (isSelected && !isCorrect)
                borderClasses = 'border-2 bg-red-100 border-red-300'
            }

            return (
              <li
                key={a.id}
                className={`${borderClasses} group p-4 flex items-center rounded-md transition-all`}
              >
                <div className="flex items-center space-x-4">
                  <span className="font-bold">{opts[i]}</span>
                  <input
                    type="radio"
                    name={`answer-${question.id}`}
                    disabled={isExcluded || isAnswered}
                    checked={isSelected}
                    onChange={() => setSelectedAnswer(a)}
                  />
                </div>
                <p
                  className={`${
                    isExcluded && 'line-through decoration-red-500 opacity-60'
                  } text-justify w-full mx-5`}
                >
                  {a.answerText}
                </p>
                <button
                  type="button"
                  className="hidden group-hover:flex text-xs font-bold cursor-pointer text-white bg-zinc-500/20 hover:bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExcludeAnswer(a.id as string)
                  }}
                >
                  X
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <Button
        disabled={!selectedAnswer || isAnswered}
        onClick={confirmAnswer}
        className="self-center py-6 px-12 cursor-pointer"
      >
        Responder Questão
      </Button>
    </div>
  )
}
