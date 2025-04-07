export interface LogDto {
  request: Record<string, unknown>
  response: unknown
  error: unknown
  success: boolean
  ip: string
  type: string
  created_at: string
}