import type { User, Reminder, Notification } from '../types'

export const currentUser: User = {
  id: 'u1',
  nameAr: 'يوسف أمراني',
  wilaya: 'الجزائر العاصمة',
  email: 'youssef.amrani@email.dz',
  phone: '+213 555 123 456',
  memberSince: 'يناير 2025',
  leaveBalance: 8,
  avatarInitials: 'ي أ',
  stats: {
    conversations: 12,
    procedures: 3,
    saved: 7,
  },
}

export const reminders: Reminder[] = [
  { id: 'r1', titleAr: 'تجديد جواز السفر', dateAr: '15 يوليو 2025', type: 'procedure', isCompleted: false },
  { id: 'r2', titleAr: 'موعد المحامي — سليم بوعزيز', dateAr: '20 يوليو 2025', type: 'lawyer', isCompleted: false },
  { id: 'r3', titleAr: 'تسليم ملف SARL', dateAr: '1 أغسطس 2025', type: 'document', isCompleted: false },
  { id: 'r4', titleAr: 'استلام شهادة عدم السوابق', dateAr: '10 يونيو 2025', type: 'procedure', isCompleted: true },
]

export const notifications: Notification[] = [
  {
    id: 'n1',
    titleAr: 'تحديث قانون الأسرة',
    bodyAr: 'تم تعديل المادة 52 من قانون الأسرة المتعلقة بأسباب الطلاق. اضغط لمعرفة التفاصيل.',
    type: 'warning',
    timestamp: '2026-06-26T09:00:00Z',
    isRead: false,
  },
  {
    id: 'n2',
    titleAr: 'إجراءك جاهز',
    bodyAr: 'جواز سفرك جاهز للاستلام لدى مديرية الأمن الوطني. لديك 15 يوماً لاستلامه.',
    type: 'success',
    timestamp: '2026-06-25T14:30:00Z',
    isRead: false,
  },
  {
    id: 'n3',
    titleAr: 'تذكير: موعد المحامي',
    bodyAr: 'لديك موعد مع الأستاذ يونس بلخير غداً الساعة 10:00 صباحاً.',
    type: 'info',
    timestamp: '2026-06-24T18:00:00Z',
    isRead: true,
  },
  {
    id: 'n4',
    titleAr: 'قانون جديد متعلق بالتجارة الإلكترونية',
    bodyAr: 'صدر القانون رقم 2026-14 المنظم للتجارة الإلكترونية في الجزائر. اقرأ الملخص الآن.',
    type: 'info',
    timestamp: '2026-06-23T10:00:00Z',
    isRead: true,
  },
  {
    id: 'n5',
    titleAr: 'تحذير: موعد انتهاء وثيقة',
    bodyAr: 'بطاقة تعريفك الوطنية تنتهي صلاحيتها خلال 30 يوماً. ابدأ إجراء التجديد.',
    type: 'deadline',
    timestamp: '2026-06-22T08:00:00Z',
    isRead: false,
  },
]
