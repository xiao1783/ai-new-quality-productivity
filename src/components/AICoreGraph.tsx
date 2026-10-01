import { useState } from 'react'

const CX = 360
const CY = 360
const INNER_R = 178
const OUTER_R = 300

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

interface CoreNode {
  id: string
  zh: string
  en: string
  angle: number
  color: string
}

const INNER: CoreNode[] = [
  { id: 'data', zh: '数据', en: 'Data', angle: -90, color: '#0F5BFB' },
  { id: 'algo', zh: '算法', en: 'Algorithm', angle: -18, color: '#257CF4' },
  { id: 'compute', zh: '算力', en: 'Computing', angle: 54, color: '#18B9EA' },
  { id: 'scene', zh: '场景', en: 'Application', angle: 126, color: '#13BFAF' },
  { id: 'talent', zh: '人才', en: 'Talent', angle: 198, color: '#0EA5E9' },
]

const OUTER: CoreNode[] = [
  { id: 'mfg', zh: '制造', en: 'Manufacturing', angle: -90, color: '#2563EB' },
  { id: 'med', zh: '医疗', en: 'Healthcare', angle: -30, color: '#06B6D4' },
  { id: 'eng', zh: '能源', en: 'Energy', angle: 30, color: '#14B8A6' },
  { id: 'tra', zh: '交通', en: 'Transport', angle: 90, color: '#0EA5E9' },
  { id: 'agr', zh: '农业', en: 'Agriculture', angle: 150, color: '#3B82F6' },
  { id: 'sci', zh: '科研', en: 'Science', angle: 210, color: '#6366F1' },
]

/** 技术要素 → 产业价值 的连接 */
const LINKS: Record<string, string[]> = {
  data: ['med', 'agr', 'sci'],
  algo: ['mfg', 'med'],
  compute: ['eng', 'tra'],
  scene: ['mfg', 'tra', 'eng'],
  talent: ['sci', 'agr'],
}

export default function AICoreGraph() {
  const [hover, setHover] = useState<string | null>(null)

  const innerPos = Object.fromEntries(INNER.map((n) => [n.id, polar(INNER_R, n.angle)]))
  const outerPos = Object.fromEntries(OUTER.map((n) => [n.id, polar(OUTER_R, n.angle)]))

  const linkedOuter = hover ? LINKS[hover] ?? [] : []
  const linkedInner = hover
    ? Object.entries(LINKS)
        .filter(([, outs]) => outs.includes(hover))
        .map(([k]) => k)
    : []

  const dim = (active: boolean) => ({
    opacity: hover ? (active ? 1 : 0.1) : 1,
    transition: 'opacity .3s',
  })

  return (
    <svg viewBox="0 0 720 720" className="relative z-[1] h-full w-full" role="img" aria-label="AI 新质生产力引擎">
      <defs>
        <radialGradient id="core-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 轨道环 */}
      <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 7" />
      <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 7" />
      <circle cx={CX} cy={CY} r={120} fill="url(#core-glow)" />

      {/* 中心 → 要素 */}
      {INNER.map((n) => {
        const p = innerPos[n.id]
        const active = !hover || hover === n.id || linkedInner.includes(n.id)
        return (
          <line
            key={`c-${n.id}`}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke={active ? n.color : '#CBD5E1'}
            strokeWidth={hover === n.id ? 2.2 : 1.3}
            className={active ? 'flow-line' : ''}
            style={dim(active)}
          />
        )
      })}

      {/* 要素 → 产业 */}
      {Object.entries(LINKS).map(([inId, outs]) =>
        outs.map((outId) => {
          const a = innerPos[inId]
          const b = outerPos[outId]
          const active =
            !hover || hover === inId || hover === outId || linkedInner.includes(inId)
          return (
            <line
              key={`${inId}-${outId}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={active ? '#06B6D4' : '#CBD5E1'}
              strokeWidth={hover && (hover === inId || linkedOuter.includes(hover)) ? 2 : 1.1}
              className={active ? 'flow-line' : ''}
              style={dim(active)}
            />
          )
        }),
      )}

      {/* 中心 AI Core */}
      <g>
        <circle cx={CX} cy={CY} r="76" fill="#0F5BFB" opacity="0.18" />
        <circle cx={CX} cy={CY} r="61" fill="#0B52D6" stroke="rgba(255,255,255,.96)" strokeWidth="3" style={{ filter: 'drop-shadow(0 12px 24px rgba(15,91,251,.5))' }} />
        <circle cx={CX} cy={CY} r="61" fill="none" stroke="#0647D8" strokeWidth="2.5" className="pulse-ring" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <text x={CX} y={CY - 4} textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">
          AI Core
        </text>
        <text x={CX} y={CY + 18} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="11" fontWeight="600" letterSpacing="1.5">
          智能引擎
        </text>
      </g>

      {/* 内圈要素节点 */}
      {INNER.map((n, i) => {
        const p = innerPos[n.id]
        const active = !hover || hover === n.id || linkedInner.includes(n.id)
        return (
          <g
            key={n.id}
            className="float-slow"
            style={{ animationDelay: `${i * 0.9}s`, cursor: 'pointer', transformBox: 'fill-box', transformOrigin: 'center', ...dim(active), transform: hover === n.id ? 'scale(1.1)' : undefined }}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
          >
            <circle cx={p.x} cy={p.y} r="40" fill="rgba(255,255,255,.94)" stroke={n.color} strokeWidth="2.5" style={{ filter: 'drop-shadow(0 8px 14px rgba(15,91,251,.14))' }} />
            <circle cx={p.x} cy={p.y} r="40" fill={n.color} opacity="0.1" />
            <text x={p.x} y={p.y - 2} textAnchor="middle" fill="#0F172A" fontSize="15" fontWeight="700">
              {n.zh}
            </text>
            <text x={p.x} y={p.y + 15} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontWeight="600">
              {n.en}
            </text>
          </g>
        )
      })}

      {/* 外圈产业节点 */}
      {OUTER.map((n, i) => {
        const p = outerPos[n.id]
        const active = !hover || hover === n.id || linkedOuter.includes(n.id)
        return (
          <g
            key={n.id}
            className="float-slow"
            style={{ animationDelay: `${i * 0.7 + 0.4}s`, cursor: 'pointer', transformBox: 'fill-box', transformOrigin: 'center', ...dim(active), transform: hover === n.id ? 'scale(1.1)' : undefined }}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
          >
            <circle cx={p.x} cy={p.y} r="32" fill={n.color} />
            <circle cx={p.x} cy={p.y} r="32" fill="#fff" opacity="0.12" />
            <text x={p.x} y={p.y - 1} textAnchor="middle" fill="#fff" fontSize="14.5" fontWeight="700">
              {n.zh}
            </text>
            <text x={p.x} y={p.y + 13} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8" fontWeight="600">
              {n.en.slice(0, 9)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
