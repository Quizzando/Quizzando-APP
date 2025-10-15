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
import { useEffect } from 'react'

export const QuizCompletedScreen = () => {
  const { quiz, userScore, completeQuiz } = useQuiz()

  const totalQuestions = quiz?.questions.length ?? 0
  const rightAnswers = userScore.right
  const wrongAnswers = userScore.wrongs
  const allAnswers = [...rightAnswers, ...wrongAnswers]

  useEffect(() => {
    completeQuiz()
  }, [])

  const progress =
    totalQuestions > 0 ? (rightAnswers.length / totalQuestions) * 100 : 0

  return (
    <div className="max-w-5xl mx-auto py-10 flex flex-col space-y-4">
      <h1 className="text-5xl font-bold">Quiz de {quiz?.disciplineName}</h1>

      {/* === SCORE CARD === */}
      <div className="flex flex-row space-x-6">
        <Card className="p-8 w-full ">
          <CardContent>
            <CardTitle>Seu desempenho</CardTitle>
            <h2 className="text-3xl py-6 font-bold">
              <span className="text-primary">{rightAnswers.length}</span> /{' '}
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
              {allAnswers.map((answer) => (
                <TableRow key={answer.id}>
                  <TableCell>{answer.id}</TableCell>
                  <TableCell>
                    {
                      quiz?.questions
                        .find((q) => q.id === answer.questionId)
                        ?.answers.find((ans) => ans.isCorrect)?.answerText
                    }
                  </TableCell>
                  <TableCell>{answer.answerText}</TableCell>
                </TableRow>
              ))}
              {/* {quiz?.questions.map((q, qIndex) => {
                const correctAnswer = q.answers.find((a) => a.isCorrect)!
                const userAnswer = q.answers.filter((a) =>
                  allAnswers.includes(a.id!),
                )

                return (
                  <TableRow key={qIndex}>
                    <TableCell>{qIndex + 1}</TableCell>
                    <TableCell>{correctAnswer.answerText}</TableCell>
                    <TableCell>
                      {userAnswer[0] ? userAnswer[0].answerText : <p>-</p>}
                    </TableCell>
                  </TableRow>
                )
              })} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
