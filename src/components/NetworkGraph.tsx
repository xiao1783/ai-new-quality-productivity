import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

interface NNode {
  id: string
  label: string
  en: string
  ring: number
  angle: number
}

const CC = 500
const RINGS = [120, 228, 338, 442]
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return { x: CC + r * Math.cos(a), y: CC + r * Math.sin(a) }
}

const build = (pairs: [string, string][], ringIdx: number, start = -90): NNode[] =>
  pairs.map(([label, en], i) => ({
    id: `${ringIdx}-${i}`,
    label,
    en,
    ring: RINGS[ringIdx],
    angle: start + (360 / pairs.length) * i,
  }))

/** 标签的中文形式同时作为关联键（边与价值路径按它匹配） */
const L1: [string, string][] = [
  ['数据', 'Data'], ['算法', 'Algorithms'], ['算力', 'Computing'], ['模型', 'Models'],
]
const L2: [string, string][] = [
  ['感知', 'Perceive'], ['预测', 'Predict'], ['决策', 'Decide'], ['生成', 'Generate'], ['控制', 'Control'],
]
const L3: [string, string][] = [
  ['研发', 'R&D'], ['制造', 'Manufacturing'], ['物流', 'Logistics'], ['营销', 'Marketing'], ['服务', 'Service'],
]
const L4: [string, string][] = [
  ['效率', 'Efficiency'], ['质量', 'Quality'], ['创新', 'Innovation'], ['绿色', 'Green'], ['协同', 'Collaboration'],
]

const N1 = build(L1, 0)
const N2 = build(L2, 1)
const N3 = build(L3, 2)
const N4 = build(L4, 3)
const ALL = [...N1, ...N2, ...N3, ...N4]

function buildLabelMap() {
  const m: Record<string, NNode> = {}
  ALL.forEach((n) => (m[n.label] = n))
  return m
}
const byLabel = buildLabelMap()

/** 显式连接（按标签） */
const EDGE_LABELS: [string, string][] = [
  // 中心 → L1
  ['AI', '数据'], ['AI', '算法'], ['AI', '算力'], ['AI', '模型'],
  // L1 → L2
  ['数据', '感知'], ['数据', '预测'],
  ['算法', '感知'], ['算法', '决策'], ['算法', '生成'],
  ['算力', '控制'], ['算力', '预测'],
  ['模型', '生成'], ['模型', '决策'], ['模型', '控制'],
  // L2 → L3
  ['感知', '制造'], ['感知', '服务'],
  ['预测', '物流'], ['预测', '制造'],
  ['决策', '物流'], ['决策', '研发'],
  ['生成', '营销'], ['生成', '研发'],
  ['控制', '制造'], ['控制', '服务'],
  // L3 → L4
  ['研发', '创新'], ['研发', '质量'],
  ['制造', '质量'], ['制造', '效率'], ['制造', '绿色'],
  ['物流', '效率'], ['物流', '协同'],
  ['营销', '协同'], ['营销', '创新'],
  ['服务', '质量'], ['服务', '协同'],
]

/** 具名价值链：悬停只展示包含当前节点的业务路径 */
const VALUE_PATHS = [
  ['AI', '数据', '感知', '制造', '质量'],
  ['AI', '数据', '预测', '物流', '效率'],
  ['AI', '算法', '决策', '研发', '创新'],
  ['AI', '算法', '生成', '营销', '协同'],
  ['AI', '算力', '控制', '制造', '绿色'],
  ['AI', '模型', '控制', '服务', '质量'],
] as const

export default function NetworkGraph() {
  const { lang, t, ta } = useLanguage()
  const [hover, setHover] = useState<string | null>(null)

  const edges = useMemo(
    () =>
      EDGE_LABELS.map(([a, b]) => ({
        a: a === 'AI' ? { x: CC, y: CC } : polar(byLabel[a].ring, byLabel[a].angle),
        b: polar(byLabel[b].ring, byLabel[b].angle),
        key: `${a}-${b}`,
        la: a,
        lb: b,
      })),
    [],
  )

  const highlight = useMemo(() => {
    if (!hover) return null
    const paths = VALUE_PATHS.filter((path) => path.includes(hover as never))
    const nodes = new Set<string>()
    const edgeKeys = new Set<string>()
    paths.forEach((path) => {
      path.forEach((node) => nodes.add(node))
      for (let i = 0; i < path.length - 1; i += 1) {
        edgeKeys.add(`${path[i]}|${path[i + 1]}`)
      }
    })
    if (!paths.length) nodes.add(hover)
    return { nodes, edgeKeys }
  }, [hover])

  const nodeOn = (label: string) => !highlight || highlight.nodes.has(label)
  const edgeOn = (a: string, b: string) =>
    !highlight || highlight.edgeKeys.has(`${a}|${b}`)

  const renderNode = (n: NNode, color: string, r: number) => {
    const p = polar(n.ring, n.angle)
    const on = nodeOn(n.label)
    const label = lang === 'en' ? n.en : n.label
    return (
      <g
        key={n.id}
        transform={`translate(${p.x},${p.y})`}
        style={{ cursor: 'pointer', opacity: on ? 1 : 0.12, transition: 'opacity .25s' }}
        onMouseEnter={() => setHover(n.label)}
        onMouseLeave={() => setHover(null)}
      >
        <circle r={r} fill={on ? color : '#E2E8F0'} />
        <text textAnchor="middle" y={4} fill="#fff" fontSize={label.length > 5 ? r * 0.42 : r * 0.55} fontWeight="700">
          {label}
        </text>
      </g>
    )
  }

  return (
    <div className="mt-20">
      <Reveal>
        <h3 className="text-center text-[26px] font-bold text-ink">{t('n.title')}</h3>
        <p className="mt-3 text-center text-[15px] text-body">{t('n.sub')}</p>
      </Reveal>

      <Reveal className="mt-8">
        <div className="card p-3 sm:p-6">
          <svg viewBox="0 0 1000 1000" className="w-full">
            {RINGS.map((r) => (
              <circle key={r} cx={CC} cy={CC} r={r} fill="none" stroke="#EEF2F7" strokeDasharray="3 8" />
            ))}

            {edges.map((e) => {
              const on = edgeOn(e.la, e.lb)
              return (
                <line
                  key={e.key}
                  x1={e.a.x}
                  y1={e.a.y}
                  x2={e.b.x}
                  y2={e.b.y}
                  stroke={on ? '#06B6D4' : '#E2E8F0'}
                  strokeWidth={on ? 1.8 : 1}
                  className={on ? 'flow-line' : ''}
                  style={{ opacity: on ? 1 : 0.5, transition: 'opacity .25s' }}
                />
              )
            })}

            {/* 中心 */}
            <circle cx={CC} cy={CC} r="52" fill="url(#net-g)" />
            <defs>
              <linearGradient id="net-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2563EB" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <text x={CC} y={CC + 6} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700">
              {t('n.center')}
            </text>

            {!highlight && N1.map((n, i) => {
              const p = polar(n.ring, n.angle)
              return (
                <motion.circle key={`flow-${n.id}`} r="2.6" fill="#06B6D4" opacity="0.65" style={{ pointerEvents: 'none' }}>
                  <animateMotion dur={`${3 + i * 0.7}s`} repeatCount="indefinite" path={`M${CC} ${CC}L${p.x} ${p.y}`} />
                </motion.circle>
              )
            })}

            {N1.map((n) => renderNode(n, '#2563EB', 34))}
            {N2.map((n) => renderNode(n, '#3B82F6', 34))}
            {N3.map((n) => renderNode(n, '#06B6D4', 34))}
            {N4.map((n) => renderNode(n, '#14B8A6', 36))}
          </svg>
        </div>
      </Reveal>
    </div>
  )
}
