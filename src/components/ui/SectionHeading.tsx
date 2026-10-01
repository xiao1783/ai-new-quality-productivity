import Reveal from './Reveal'

interface SectionHeadingProps {
  index: string
  en: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  index,
  en,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'text-center' : 'text-left'}>
      <Reveal>
        <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className={`section-kicker ${light ? 'section-kicker-light' : ''}`}>
          <span
            className={`text-sm font-bold tracking-[0.2em] ${
              light ? 'text-cyan-300' : 'text-brand'
            }`}
          >
            {index}
          </span>
          <span
            className={`h-px w-10 ${light ? 'bg-cyan-300/50' : 'bg-brand/40'}`}
          />
          <span
            className={`text-xs font-semibold tracking-[0.32em] ${
              light ? 'text-slate-300' : 'text-muted'
            }`}
          >
            {en}
          </span>
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-bold leading-[1.12] tracking-tight ${
            light ? 'text-white' : 'text-ink'
          }`}
          style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-[17px] leading-relaxed ${
              light ? 'text-slate-300' : 'text-body'
            } ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
