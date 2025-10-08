import { createFileRoute } from '@tanstack/react-router'
import { QuizProvider } from '@/controllers/quiz-context'
import { useQuiz } from '@/hooks/use-quiz'
import { QuestionBox } from '../-components/question'

export const Route = createFileRoute(
  '/_app/cursos/$courseId/disciplina/$disciplineId',
)({
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
  const { quiz, isLoading, currentQuestionIndex } = useQuiz()

  if (isLoading || !quiz) return <div>Loading...</div>
  const question = quiz.questions[currentQuestionIndex]

  if (!question) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold">Quiz completed ✅</h2>
      </div>
    )
  }

  return (
    <div className="max-w-5xl min-h-screen mx-auto flex flex-col items-center justify-start px-6 py-12">
      <QuestionBox
        key={question.id}
        question={question}
        disciplineName={quiz.disciplineName}
      />
    </div>
  )
}
