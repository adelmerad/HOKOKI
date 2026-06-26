export type Role = 'admin' | 'manager' | 'staff' | 'employee'

export type Difficulty = 'easy' | 'medium' | 'complex'

export type MessageRole = 'user' | 'bot'

export interface LawCategory {
  id: string
  nameAr: string
  nameFr: string
  icon: string
  articleCount: number
  isRecentlyChanged: boolean
}

export interface LawArticle {
  id: string
  categoryId: string
  numberAr: string
  titleAr: string
  titleFr: string
  fullTextAr: string
  simpleExplanationAr: string
  isAmended: boolean
  amendedDate?: string
}

export interface RequiredDocument {
  nameAr: string
  copies: number
  validityPeriod?: string
}

export interface ProcedureStep {
  id: string
  titleAr: string
  instructionsAr: string
  subSteps: string[]
  requiredDocuments: RequiredDocument[]
  officeName: string
  officeCost?: string
}

export interface Procedure {
  id: string
  nameAr: string
  nameFr: string
  category: string
  durationAr: string
  costAr: string
  isOnline: boolean
  difficulty: Difficulty
  steps: ProcedureStep[]
  commonMistakes: string[]
  description: string
}

export interface LawyerReview {
  nameInitial: string
  rating: number
  date: string
  textAr: string
}

export interface Lawyer {
  id: string
  nameAr: string
  specialty: string
  specialtyCategory: string
  wilaya: string
  city: string
  languages: string[]
  rating: number
  reviewCount: number
  feeMin: number
  feeMax: number
  hasFreeConsultation: boolean
  responseTime: string
  yearsExperience: number
  barNumber: string
  isVerified: boolean
  bioAr: string
  reviews: LawyerReview[]
  avatarColor: string
}

export interface CitationChip {
  articleNumber: string
  law: string
  articleId?: string
  categoryId?: string
}

export interface ChatMessage {
  id : string
  role: MessageRole
  question: string
  sessionId ?: string
  citationChips?: CitationChip[]
  isEmergency?: boolean
  structuredAnswer?: StructuredAnswer
}

export interface ChatResponse {
    "sessionId": string,
    "answer": string,
    "sources": string[]
}

export interface StructuredAnswer {
  title: string
  steps: string[]
  note?: string
}

export interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  messages: ChatMessage[]
}

export interface UserStats {
  conversations: number
  procedures: number
  saved: number
}

export interface User {
  id: string
  nameAr: string
  wilaya: string
  email: string
  phone: string
  memberSince: string
  leaveBalance: number
  stats: UserStats
  avatarInitials: string
}

export interface Notification {
  id: string
  titleAr: string
  bodyAr: string
  type: 'info' | 'warning' | 'success' | 'deadline'
  timestamp: string
  isRead: boolean
}

export interface ActiveProcedure {
  procedureId: string
  startedAt: string
  completedSteps: string[]
  status: 'active' | 'completed' | 'paused'
}

export interface Reminder {
  id: string
  titleAr: string
  dateAr: string
  type: 'procedure' | 'lawyer' | 'document'
  isCompleted: boolean
}

export interface ContractAnalysisResult {

    "overallScore": number,
    "verdict": string,
    "summary": string,
    "issues": 
        {
            "severity": string,
            "clauseInContract": string,
            "violatedArticle": string,
            "articleContent": string,
            "explanation": string,
            "suggestion": string
      }[]
    ,
    "missingClauses":string[],
    "positiveClauses":string [
    ],
    "recommendedActions": string[
    ],
    "applicableLaws": string[
    ]
}

export interface ProcedureChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
}

export interface ProcedureChatResponse {
  answer: string
  sessionId?: string
}
