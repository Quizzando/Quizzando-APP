import { API_BASE_URL } from '@/constants/api'
import { handleApiResponse } from '@/utils/handleApiResponse'

export type UserRanking = {
  id: string
  username: string
  score: number
}

export type RankingResponse = {
  items: UserRanking[]
  page: number
  pageSize: number
  totalCount?: number
  totalPages?: number
}

export const rankingService = {
  async getRanking(page: number, pageSize: number): Promise<RankingResponse | null> {
    try {
      const data = await handleApiResponse<RankingResponse>(
        await fetch(`${API_BASE_URL}/user/ranking?page=${page}&pageSize=${pageSize}`),
      )
      return data
    } catch (error) {
      console.error('Erro ao retornar ranking:', error)
      throw error
    }
  },
}
