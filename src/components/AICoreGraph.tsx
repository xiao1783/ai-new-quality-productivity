import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageContext'

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
  const { lang } = useLanguage()
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

      {/* 轨道环（缓慢旋转） */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 7" />
      </motion.g>
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 140, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 7" />
      </motion.g>
      <motion.circle cx={CX} cy={CY} r={120} fill="url(#core-glow)" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: `${CX}px ${CY}px` }} />
      {/* 轨道卫星点 */}
      <motion.circle r="4" fill="#2563EB" opacity="0.55">
        <animateMotion dur="20s" repeatCount="indefinite" path={`M${CX} ${CY - INNER_R}a${INNER_R} ${INNER_R} 0 1 1 -0.1 0`} />
      </motion.circle>
      <motion.circle r="3.5" fill="#06B6D4" opacity="0.5">
        <animateMotion dur="28s" repeatCount="indefinite" path={`M${CX} ${CY - OUTER_R}a${OUTER_R} ${OUTER_R} 0 1 1 -0.1 0`} />
      </motion.circle>

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

      {/* 待机数据粒子：核心 → 要素 */}
      {hover === null && INNER.map((n, i) => {
        const p = innerPos[n.id]
        return (
          <motion.circle key={`p-${n.id}`} r="3" fill={n.color} opacity="0.6">
            <animateMotion dur={`${2.8 + i * 0.5}s`} repeatCount="indefinite" path={`M${CX} ${CY}L${p.x} ${p.y}`} />
          </motion.circle>
        )
      })}
      {/* 悬停：沿激活链路冲刺的粒子 */}
      {hover && (() => {
        const isInner = INNER.some((n) => n.id === hover)
        const sources = isInner ? [hover] : linkedInner
        return sources.flatMap((inId) => {
          const a = innerPos[inId]
          const outs = isInner ? LINKS[inId] ?? [] : [hover]
          const centerPart = isInner
            ? [<motion.circle key={`h-c-${inId}`} r="3.2" fill="#0F5BFB"><animateMotion dur="0.9s" repeatCount="indefinite" path={`M${CX} ${CY}L${a.x} ${a.y}`} /></motion.circle>]
            : []
          return [
            ...centerPart,
            ...outs.map((outId, j) => (
              <motion.circle key={`h-${inId}-${outId}`} r="3.2" fill="#06B6D4">
                <animateMotion dur={`${1.1 + j * 0.2}s`} repeatCount="indefinite" path={`M${a.x} ${a.y}L${outerPos[outId].x} ${outerPos[outId].y}`} />
              </motion.circle>
            )),
          ]
        })
      })()}

      {/* 中心 AI Core */}
      <g>
        <circle cx={CX} cy={CY} r="76" fill="#0F5BFB" opacity="0.18" />
        <circle cx={CX} cy={CY} r="61" fill="#0B52D6" stroke="rgba(255,255,255,.96)" strokeWidth="3" style={{ filter: 'drop-shadow(0 12px 24px rgba(15,91,251,.5))' }} />
        <circle cx={CX} cy={CY} r="61" fill="none" stroke="#0647D8" strokeWidth="2.5" className="pulse-ring" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <motion.circle cx={CX} cy={CY} r="61" fill="none" stroke="#60A5FA" strokeWidth="1.5" animate={{ scale: [1, 1.5], opacity: [0.4, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }} style={{ transformOrigin: `${CX}px ${CY}px` }} />
        <text x={CX} y={CY - 4} textAnchor="middle" fill="#fff" fontSize={lang === 'en' ? 17 : 21} fontWeight="700">
          AI Core
        </text>
        <text x={CX} y={CY + 18} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={lang === 'en' ? 9 : 11} fontWeight="600" letterSpacing="1.5">
          {lang === 'en' ? 'INTELLIGENCE ENGINE' : '智能引擎'}
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
