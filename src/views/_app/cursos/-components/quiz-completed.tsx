import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuiz } from '@/hooks/useQuiz'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'

export const QuizCompletedScreen = () => {
  const { quiz, userScore, completeQuiz } = useQuiz()

  const totalQuestions = quiz?.questions.length ?? 0
  const { right, wrongs } = userScore
  const allAnswers = [...right, ...wrongs]

  useEffect(() => {
    completeQuiz()
    console.log(allAnswers)
  }, [])

  const progress =
    totalQuestions > 0 ? (right.length / totalQuestions) * 100 : 0

  const opts = ['A)', 'B)', 'C)', 'D)', 'E)']

  return (
    <div className="max-w-5xl mx-auto py-10 flex flex-col space-y-4">
      <h1 className="text-5xl font-bold">Quiz de {quiz?.disciplineName}</h1>

      {/* === SCORE CARD === */}
      <div className="flex flex-row space-x-6">
        <Card className="p-8 w-full">
          <CardContent>
            <CardTitle>Seu desempenho</CardTitle>
            <h2 className="text-3xl py-6 font-bold">
              <span className="text-primary">{right.length}</span> /{' '}
              {totalQuestions}
            </h2>
            <Progress value={progress} />
          </CardContent>
        </Card>

        <Card className="p-8">
          <CardContent>
            <CardTitle>Tempo de Conclusão</CardTitle>
            <h2 className="text-3xl py-6 font-bold">{userScore.time}</h2>
          </CardContent>
        </Card>
      </div>

      {/* === ANSWERS TABLE === */}
      <Card className="p-8">
        <CardContent>
          <CardTitle>Gabarito</CardTitle>

          <Table className="my-10">
            <TableHeader>
              <TableRow>
                <TableHead>Questão</TableHead>
                <TableHead>Gabarito</TableHead>
                <TableHead>Sua Resposta</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {quiz?.questions.map((q, qIndex) => {
                const correctAnswer = q.answers.find((a) => a.isCorrect)

                // The user's chosen answer is the one whose ID exists in allAnswers
                const userAnswer = q.answers.find((a) =>
                  allAnswers.some((ua) => ua.id === a.id),
                )

                const correctIndex = q.answers.findIndex((a) => a.isCorrect)
                const userIndex = q.answers.findIndex(
                  (a) => a.id === userAnswer?.id,
                )

                return (
                  <TableRow key={q.id}>
                    <TableCell className="w-1/6 font-semibold">
                      {qIndex + 1}
                    </TableCell>

                    {/* Correct Answer */}
                    <TableCell className="w-1/2 text-green-600">
                      <p
                        className="truncate max-w-[200px] whitespace-nowrap overflow-hidden"
                        title={correctAnswer?.answerText}
                      >
                        {correctIndex !== -1 ? opts[correctIndex] : '-'}{' '}
                        {correctAnswer?.answerText}
                      </p>
                    </TableCell>

                    {/* User Answer */}
                    <TableCell
                      className={`w-1/2 ${
                        userAnswer?.id === correctAnswer?.id
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >
                      <p
                        className="truncate max-w-[200px] whitespace-nowrap overflow-hidden"
                        title={userAnswer?.answerText ?? '---'}
                      >
                        {userIndex !== -1 ? opts[userIndex] : '-)'}{' '}
                        {userAnswer?.answerText ?? 'Sem resposta'}
                      </p>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
        <Link to="/cursos">
          <Button>Voltar para Cursos</Button>
        </Link>
      </Card>
    </div>
  )
}
