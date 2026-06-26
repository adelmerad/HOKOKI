import type { ContractAnalysisResult } from '../../types'
import { httpClient } from '../http-client'

export const analyseContract = async (contractText: string): Promise<ContractAnalysisResult> => {
  const response = await httpClient.post('/api/contract/analyze', { contractText , contractType: 'employment' })
  return response.data
}
