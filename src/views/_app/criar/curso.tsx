import { createFileRoute } from '@tanstack/react-router'
import { FormCard } from './-components/form-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CourseCategoryPicker } from './-components/course-category-picker'
import type { Course } from '@/@types'
import { courseService } from '@/models/services/CourseService'
import { useMutation, useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_app/criar/curso')({
  component: RouteComponent,
})

export type CursoFormData = {
  courseName: string
  category: Course['category']
  rating: number
  backgroundImage: File | null
  icon: string
}

function RouteComponent() {
  // const { mutate } = useMutation({
    
  // })

  const [courseName, setCourseName] = useState('')
  const [category, setCategory] = useState(0)
  const [rating, setRating] = useState(0)
  const [icon, setIcon] = useState('')

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cursoData: CursoFormData = {
      courseName,
      category,
      rating,
      backgroundImage,
      icon,
    }

    console.log(cursoData)

    // TESTE
    // const cursos = await quizService.getCourses()
    // console.log(cursos)

    // TESTE 2
    // const course = await quizService.createCourse(cursoData)
    // console.log(course)
  }

  const handleCourseCategoryPicker = (value: string) => {
    setCategory(Number(value))
  }

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageURL = e.target.value
    if (imageURL) {
      setBackgroundImage(imageURL)
      setBackgroundPreview(imageURL)
    } else {
      setBackgroundImage(null)
      setBackgroundPreview(null)
    }
  }

  return (
    <div className="flex items-center flex-col py-8 px-4">
      <FormCard formTitle="Criar novo Curso">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="courseName">Nome do Curso</Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Digite o nome do curso"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundImage">Imagem de Fundo</Label>
            <Input
              type="text"
              id="backgroundImage"
              onChange={handleBackgroundImageChange}
            />
            {backgroundPreview && (
              <img
                src={backgroundPreview}
                alt="Imagem Preview"
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName">Categoria do Curso</Label>
            <CourseCategoryPicker
              value={String(category)}
              onChange={handleCourseCategoryPicker}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName">Ícone do Curso</Label>
            <Input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Digite o ícone do curso (emoji)"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Criar Curso
          </Button>
        </form>
      </FormCard>
    </div>
  )
}
