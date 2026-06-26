export interface LawyerRequest {
  id: string
  clientName: string
  clientInitial: string
  clientColor: string
  category: string
  subject: string
  preview: string
  status: 'pending' | 'accepted' | 'completed' | 'rejected'
  date: string
  timeSlot?: string
  fee?: number
  notes?: string
}

export const lawyerRequests: LawyerRequest[] = [
  {
    id: 'req1',
    clientName: 'أحمد بوعلام',
    clientInitial: 'أب',
    clientColor: '#4F6EF7',
    category: 'قانون العمل',
    subject: 'نزاع مع صاحب العمل',
    preview: 'تعرضت لطرد تعسفي بدون سابق إنذار، أريد معرفة حقوقي.',
    status: 'pending',
    date: 'اليوم 14:30',
    timeSlot: 'الثلاثاء 10:00',
  },
  {
    id: 'req2',
    clientName: 'سارة قاسمي',
    clientInitial: 'سق',
    clientColor: '#E91E63',
    category: 'قانون الأسرة',
    subject: 'إجراءات الطلاق',
    preview: 'أحتاج مساعدة في ملف الطلاق وقضية الحضانة.',
    status: 'accepted',
    date: 'أمس',
    timeSlot: 'الأربعاء 14:00',
    fee: 8000,
  },
  {
    id: 'req3',
    clientName: 'يوسف لعريبي',
    clientInitial: 'يل',
    clientColor: '#22C55E',
    category: 'القانون التجاري',
    subject: 'تأسيس شركة',
    preview: 'أريد تأسيس SARL مع شريكين، أحتاج مشورة قانونية.',
    status: 'completed',
    date: '3 يونيو',
    fee: 15000,
    notes: 'تمت المشورة بنجاح. تم تحرير العقد التأسيسي.',
  },
  {
    id: 'req4',
    clientName: 'نادية بن زيتون',
    clientInitial: 'نب',
    clientColor: '#F59E0B',
    category: 'قانون الملكية',
    subject: 'نزاع عقاري',
    preview: 'خلاف مع أخي حول ميراث عقاري من والدنا المتوفى.',
    status: 'pending',
    date: 'اليوم 09:15',
    timeSlot: 'الخميس 11:00',
  },
  {
    id: 'req5',
    clientName: 'كمال بوصفصاف',
    clientInitial: 'كب',
    clientColor: '#7C3AED',
    category: 'القانون الجنائي',
    subject: 'دفاع جنائي',
    preview: 'وُجِّهت إليّ تهمة ظالمة وأحتاج محامياً للدفاع عني.',
    status: 'rejected',
    date: '28 مايو',
    notes: 'خارج نطاق التخصص.',
  },
]
