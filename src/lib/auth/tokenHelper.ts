export const isTokenExpired = (tokenExpiredAt: Date | null | undefined) => {
  const now = new Date()
  return tokenExpiredAt != null && tokenExpiredAt <= now
}
