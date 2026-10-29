import type { ProcedureChatResponse } from '../../types'
import { httpClient } from '../http-client'
import { demoDelay, demoProcedureAnswer, isDemoMode } from '../ai-mode'

export const sendProcedureMessage = async (
  question: string,
  procedureId: string,
  sessionId?: string,
): Promise<ProcedureChatResponse> => {
  if (isDemoMode) {
    await demoDelay()
    return { answer: demoProcedureAnswer(), sessionId }
  }
  const response = await httpClient.post('/api/procedure/chat', { question, procedureId, sessionId })
  return response.data
}
