import type { User } from '@/@types'
import { handleApiResponse } from '@/utils/handleApiResponse'
import { getToken } from '@/utils/token'

type UpdatableFields = 'username' | 'email' | 'password' | 'score'
export const userService = {
  async updateUser(
    id: string,
    field: UpdatableFields,
    newVal: string,
  ): Promise<User | null> {
    try {
      const token = getToken()
      if (!token) throw new Error('Token não encontrado')

      const updatedUser = await handleApiResponse<User>(
        await fetch(`/api/user/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ [field]: newVal }),
        }),
      )

      return updatedUser
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      throw error
    }
  },
}
