import { BookOpen } from 'lucide-react'

/** 图表下方的数据来源标注 */
export default function SourceNote({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted ${className}`}>
      <BookOpen size={12} className="mt-0.5 shrink-0" />
      <span>数据来源：{children}</span>
    </p>
  )
}
