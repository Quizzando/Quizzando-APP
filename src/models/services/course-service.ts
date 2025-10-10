import { handleApiResponse } from "@/utils/handleApiResponse"
import type { Course } from "../@types"
import type { CursoFormData } from "@/views/_app/criar/curso"

export const courseService = {
    // === GET COURSES === //
    async getCourses(): Promise<Course[] | null> {
        try {
            const data =  await handleApiResponse<Course[]>(
                await fetch(`/api/course`),
            )
            
            return data.courses as Course[]
        } catch (error) {
            console.error('Erro ao retornar cursos:', error)
            throw error
        }
    },
    // === GET COURSE === //
    async getCourse(courseId: string): Promise<Course | null> {
        try {
            const data =  await handleApiResponse<Course>(
                await fetch(`/api/course/${courseId}`),
            )
            
            return data
        } catch (error) {
            console.error('Erro ao retornar cursos:', error)
            throw error
        }
    },
    
    // === CRIAR CURSO === //
    async createCourse({ name, backgroundImage, category, icon, rating }: CursoFormData): Promise<Course | null> {
        try {
            return await handleApiResponse<Course>(
                await fetch(`/api/course`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, backgroundImage, category, icon, rating }),
                }),
            )
        } catch (error) {
            console.error('Erro ao criar novo curso:', error)
            throw error
        }
    },
}