interface ApiError {
  errorMessages?: string[]
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const apiError = data as ApiError
    const message =
      apiError.errorMessages?.join('\n') || `Erro: ${response.status}`
    throw new Error(message)
  }
  return data as T
}
