import { createFileRoute } from '@tanstack/react-router'
import { CoursePicker } from './-components/course-picker'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Answer, Question } from '@/models/@types'

type CreateAnswer = Omit<Answer, 'questionId'>
type CreateQuestion = Omit<Question, 'disciplineId'>

export const Route = createFileRoute('/_app/criar/disciplina')({
  component: RouteComponent,
})

interface QuizFormData {
  name: string
  description?: string
  courseId: string
  questions: CreateQuestion[]
}

function RouteComponent() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [courseId, setCourseId] = useState('')
  // const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0)

  const emptyQuestion: CreateQuestion & { answers: CreateAnswer[] } = {
    questionStatement: '',
    difficulty: 0,
    answers: [
      { answerText: '', isCorrect: true },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
    ],
  }

  const [questions, setQuestions] = useState<CreateQuestion[]>([
    emptyQuestion,
    emptyQuestion,
    emptyQuestion,
    emptyQuestion,
  ])

  const addQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, emptyQuestion])
    }
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 4) {
      const newQuestions = questions.filter((_, i) => i !== index)
      setQuestions(newQuestions)
    }
  }

  const updateQuestionStatement = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index].questionStatement = value
    setQuestions(newQuestions)
  }

  const updateQuestionDifficulty = (index: number, value: 0 | 1 | 2) => {
    const newQuestions = [...questions]
    newQuestions[index].difficulty = value
    setQuestions(newQuestions)
  }

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].answers[answerIndex].answerText = value
    setQuestions(newQuestions)
  }

  const updateCorrectAnswer = (questionIndex: number, correctIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.isCorrect = index === correctIndex
    })
    setQuestions(newQuestions)
  }

  const handleCourseIdChange = (value: string) => {
    setCourseId(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const quizData: QuizFormData = {
      name,
      description,
      courseId,
      questions,
    }

    // Depois implementar a lógica para enviar os dados para o backend
    console.log('Dados do quiz:', quizData)
  }

  return (
    <div className="flex items-center flex-col py-8 px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Criar Novo Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Curso</Label>
                <CoursePicker
                  value={courseId}
                  onChange={handleCourseIdChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome do Quiz</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome do quiz"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o propósito do quiz"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question, questionIndex) => (
                <Card key={questionIndex}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg">
                      Questão {questionIndex + 1}
                    </CardTitle>
                    {questions.length > 4 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(questionIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Enunciado da Questão</Label>
                      <Textarea
                        value={question.questionStatement}
                        onChange={(e) =>
                          updateQuestionStatement(questionIndex, e.target.value)
                        }
                        placeholder="Digite o enunciado da questão"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Dificuldade da Questão</Label>
                      <Select
                        value={question.difficulty.toString()}
                        onValueChange={(value) =>
                          updateQuestionDifficulty(
                            questionIndex,
                            parseInt(value) as 0 | 1 | 2,
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Fácil</SelectItem>
                          <SelectItem value="1">Médio</SelectItem>
                          <SelectItem value="2">Difícil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Alternativas</Label>
                      <RadioGroup
                        value={question.answers
                          .findIndex((answer) => answer.isCorrect)
                          .toString()}
                        onValueChange={(value) =>
                          updateCorrectAnswer(questionIndex, parseInt(value))
                        }
                      >
                        {question.answers.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={answerIndex.toString()} />
                            <Input
                              value={answer.answerText}
                              onChange={(e) =>
                                updateAnswer(
                                  questionIndex,
                                  answerIndex,
                                  e.target.value,
                                )
                              }
                              placeholder={`Alternativa ${answerIndex + 1}`}
                              className="flex-1"
                              required
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Botão para Adicionar Questões */}
            {questions.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Questão
              </Button>
            )}

            {/* Botão de Submit */}
            <Button type="submit" className="w-full">
              Criar Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
