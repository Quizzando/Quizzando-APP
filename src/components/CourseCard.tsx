import { Card, CardContent } from '@/components/ui/card'
import { Clock, PencilLine, Star } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Course } from '@/@types'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      key={`${course.id}`}
      to={'/cursos/$courseId'}
      params={{ courseId: course.id! }}
    >
      <Card className=" max-h-[350px] group cursor-pointer overflow-hidden border-0 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 pt-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.backgroundImage || 'https://placehold.co/600x400/png'}
            alt={course.courseName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
              {course.category === 0 ? 'Técnico' : 'Ensino Médio'}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 text-4xl">
            {course.icon as string}
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="font-playfair text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
            {course.courseName}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              {course.rating?.toFixed(1)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
