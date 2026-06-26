import { Users, Briefcase, Building2, Scale, FileText, Landmark, ShieldCheck, Plane, Car, HardHat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type IconEntry = { Icon: LucideIcon; color: string; bg: string }

const iconMap: Record<string, IconEntry> = {
  family:        { Icon: Users,        color: '#4F6EF7', bg: 'rgba(79,110,247,0.12)' },
  labor:         { Icon: HardHat,      color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  property:      { Icon: Building2,    color: '#22C55E', bg: 'rgba(34,197,94,0.12)'  },
  business:      { Icon: Briefcase,    color: '#7C3AED', bg: 'rgba(124,58,237,0.12)' },
  criminal:      { Icon: Scale,        color: '#EF4444', bg: 'rgba(239,68,68,0.12)'  },
  civil:         { Icon: FileText,     color: '#06B6D4', bg: 'rgba(6,182,212,0.12)'  },
  administrative:{ Icon: Landmark,     color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  consumer:      { Icon: ShieldCheck,  color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  immigration:   { Icon: Plane,        color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
  traffic:       { Icon: Car,          color: '#64748B', bg: 'rgba(100,116,139,0.12)'},
}

const fallback: IconEntry = { Icon: FileText, color: 'var(--color-primary)', bg: 'rgba(79,110,247,0.12)' }

export function LawCategoryIcon({ categoryId, size = 22, withBg = false }: { categoryId: string; size?: number; withBg?: boolean }) {
  const entry = iconMap[categoryId] ?? fallback
  const { Icon, color, bg } = entry

  if (withBg) {
    return (
      <div
        className="flex items-center justify-center rounded-xl"
        style={{ width: size * 1.8, height: size * 1.8, backgroundColor: bg }}
      >
        <Icon size={size} style={{ color }} />
      </div>
    )
  }

  return <Icon size={size} style={{ color }} />
}

export function getLawCategoryColor(categoryId: string): string {
  return (iconMap[categoryId] ?? fallback).color
}
