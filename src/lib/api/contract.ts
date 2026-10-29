import type { ContractAnalysisResult } from '../../types'
import { httpClient } from '../http-client'
import { isDemoMode } from '../ai-mode'

export class AiUnavailableError extends Error {}

export const analyseContract = async (contractText: string): Promise<ContractAnalysisResult> => {
  // A contract analysis cannot be faked: say clearly that it needs the AI service
  if (isDemoMode) throw new AiUnavailableError('AI service not configured')
  const response = await httpClient.post('/api/contract/analyze', { contractText , contractType: 'employment' })
  return response.data
}
