export const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api'
    : 'https://quizzando.onrender.com/api'
