export function isAdminFromCookie(cookieHeader?: string | null) {
  if (!cookieHeader) return false
  // simple parse for admin=1
  return cookieHeader.split(';').map(s => s.trim()).some(s => s === 'admin=1')
}
