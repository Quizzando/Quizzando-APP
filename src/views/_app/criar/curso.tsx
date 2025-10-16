import { createFileRoute } from '@tanstack/react-router'
import { FormCard } from './-components/form-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
  description: string
  backgroundImage: string | null
  category: Course['category']
  icon: string
  rating: number
}

function RouteComponent() {
  // const { mutate } = useMutation({
    
  // })

  const [courseName, setCourseName] = useState('')
  const [category, setCategory] = useState(0)
  const [description, setDescription] = useState('')
  const rating = 0
  const [icon, setIcon] = useState('')
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cursoData: CursoFormData = {
      courseName,
      description,
      backgroundImage,
      category,
      icon,
      rating,
    }

    console.log(cursoData)

    // TESTE
    // const cursos = await quizService.getCourses()
    // console.log(cursos)

    // TESTE 2
    // const course = await quizService.createCourse(cursoData)
    // console.log(course)
  }

  return (
    <div className="flex items-center flex-col py-8 px-4">
      <FormCard formTitle="Criar novo Curso">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="courseName">Nome</Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Digite o nome do curso"
              required
            />
          </div>
          
          <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="De uma descrição para o curso"
                rows={5}
              />
            </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundImage">Imagem de Fundo</Label>
            <Input
              type="text"
              id="backgroundImage"
              onChange={(e) => setBackgroundImage(e.target.value)}
            />
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt="Imagem Preview"
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName">Categoria do Curso</Label>
            <CourseCategoryPicker
              value={String(category)}
              onChange={(e) => setCategory(Number(e))}
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
