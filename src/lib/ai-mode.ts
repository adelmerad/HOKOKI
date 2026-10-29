import { mockBotResponses } from '../data/mockConversations'

/** Base URL of the HOKOKI AI service. Without it the app runs as a self-contained demo. */
export const AI_URL: string | undefined = import.meta.env.VITE_AI_URL || undefined

export const isDemoMode = !AI_URL

export const DEMO_NOTE = 'ℹ️ نسخة تجريبية: هذه إجابة توضيحية، المساعد الذكي غير متصل في هذا العرض.'

const TOPICS: { key: keyof typeof mockBotResponses; words: string[] }[] = [
  { key: 'work', words: ['عمل', 'شغل', 'عامل', 'أجر', 'راتب', 'طرد', 'فصل', 'عقد'] },
  { key: 'family', words: ['زواج', 'طلاق', 'حضانة', 'نفقة', 'أسرة', 'ميراث', 'إرث'] },
  { key: 'property', words: ['عقار', 'ملكية', 'أرض', 'سكن', 'كراء', 'إيجار', 'بيع'] },
]

/** Pick the closest canned answer for a question, so the demo chat still feels relevant. */
export function demoChatAnswer(question: string): string {
  const topic = TOPICS.find((t) => t.words.some((w) => question.includes(w)))
  return `${mockBotResponses[topic?.key ?? 'default']}\n\n${DEMO_NOTE}`
}

export function demoProcedureAnswer(): string {
  return `يمكنك الاطلاع على الخطوات والوثائق المطلوبة والأخطاء الشائعة في التبويبات أعلاه.\n\n${DEMO_NOTE}`
}

/** Simulate network latency so the typing indicator still shows. */
export const demoDelay = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms))
