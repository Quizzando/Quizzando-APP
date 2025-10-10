import { handleApiResponse } from '@/utils/handleApiResponse'
import type { Course } from '@/@types'

export const courseService = {
  async getCourses(): Promise<Course[] | null> {
    try {
      const data = await handleApiResponse<{ courses: Course[] }>(
        await fetch(`/api/course`),
      )

      return data.courses
    } catch (error) {
      console.error('Erro ao retornar cursos:', error)
      throw error
    }
  },
  async getCourseById(courseId: string): Promise<Course | null> {
    try {
      const course = await handleApiResponse<Course>(
        await fetch(`/api/course/${courseId}`),
      )

      return course
    } catch (error) {
      console.error('Erro ao retornar curso:', error)
      throw error
    }
  },
  async createCourse({
    courseName,
    backgroundImage,
    category,
    icon,
    rating,
  }: Course): Promise<Course | null> {
    try {
      const newCourse = handleApiResponse<Course>(
        await fetch(`/api/course`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseName,
            backgroundImage,
            category,
            icon,
            rating,
          }),
        }),
      )

      return newCourse
    } catch (error) {
      console.error('Erro ao criar novo curso:', error)
      throw error
    }
  },
}
