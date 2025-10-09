import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormCard } from './-components/form-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/_app/criar/curso')({
  component: RouteComponent,
})

interface CursoFormData {
  name: string
  category: string
  rating: number
  backgroundImage: File | null
  icon: File | null
}

function RouteComponent() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null)

  const [icon, setIcon] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cursoData: CursoFormData = {
      name,
      category,
      rating,
      backgroundImage,
      icon
    }

    console.log(cursoData)
  }

  return (
    <div className='flex items-center flex-col py-8 px-4'>
      <FormCard formTitle='Criar novo Curso'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Curso</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do curso"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Imagem de Fundo</Label>
            <Input
              type='file'
              id="backgroundImage"
              // onChange={(e) => setBackgroundImage(e.target.value)}
            />
          </div>

          <Button type='submit' className='w-full'>
            Criar Curso
          </Button>
        </form>
      </FormCard>
    </div>
  )
}
