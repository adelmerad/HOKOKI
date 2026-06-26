import type { ProcedureChatResponse } from '../../types'
import { httpClient } from '../http-client'

export const sendProcedureMessage = async (
  question: string,
  procedureId: string,
  sessionId?: string,
): Promise<ProcedureChatResponse> => {
  const response = await httpClient.post('/api/procedure/chat', { question, procedureId, sessionId })
  return response.data
}
