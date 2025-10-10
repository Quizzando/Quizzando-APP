import { AUTH_TOKEN_KEY } from '@/constants/keys'
import { decodeJwt } from 'jose'

// === TOKEN HELPERS === //
export function setToken(token: string | null) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token)
  else localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function decryptToken(token: string) {
  const payload = decodeJwt(token)
  const { nbf, exp, iat } = payload

  return {
    nbf,
    exp,
    iat,
    email: payload.email,
    id: payload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
    ] as string,
  }
}
