import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gauge, Info, RotateCcw, Sparkles, TrendingDown, TrendingUp, Zap } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import TakeawayNote from './ui/TakeawayNote'
import { useLanguage } from '@/i18n/LanguageContext'

/* ---------- 模型：五个参数 → 渗透水平 → 指数 / KPI ---------- */
const WEIGHTS = [0.26, 0.16, 0.22, 0.2, 0.16] // AI渗透 / 算力 / 数据 / 自动化 / 人机协同
const SLIDER_COLORS = ['#0F5BFB', '#257CF4', '#18B9EA', '#13BFAF', '#8B5CF6']

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  return `#${pa.map((x, i) => Math.round(x + (pb[i] - x) * t).toString(16).padStart(2, '0')).join('')}`
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const trail = (from: [number, number], to: [number, number], n = 10) =>
  Array.from({ length: n }, (_, i) => [
    Math.round(lerp(from[0], to[0], i / (n - 1))),
    Math.round(lerp(from[1], to[1], i / (n - 1))),
  ] as [number, number])

/* ---------- 场景几何 ---------- */
const HUB: [number, number] = [320, 96]
const MACHINES = [
  { x: 120, link: trail([120, 186], HUB) },
  { x: 320, link: trail([320, 184], HUB) },
  { x: 520, link: trail([520, 186], HUB) },
]
const DEVICE_LINKS: [[number, number], [number, number]][] = [
  [[166, 230], [274, 230]],
  [[366, 230], [474, 230]],
]

type Config = { level: number; index: number; stage: number; kpi: number[] }

function model(v: number[]): Config {
  const level = v.reduce((sum, value, i) => sum + value * WEIGHTS[i], 0) / 100
  return {
    level,
    index: Math.round(42 + level * 45), // 42 → 87
    stage: Math.min(7, Math.round(level * 7)),
    kpi: [
      100 + level * 72, // 生产效率 ↑
      100 - level * 34, // 单位成本 ↓
      4 - level * 3.4, // 产品缺陷率 ↓ (%)
      62 + level * 27, // 资源利用率 ↑ (%)
      18 - level * 9, // 创新周期 ↓ (个月)
    ],
  }
}

const KPI_META = [
  { base: 100, decimals: 0, up: true, scale: 200 },
  { base: 100, decimals: 0, up: false, scale: 150 },
  { base: 4, decimals: 1, up: false, scale: 5 },
  { base: 62, decimals: 0, up: true, scale: 100 },
  { base: 18, decimals: 0, up: false, scale: 24 },
]

/* ---------- 工厂场景 ---------- */
function SandboxScene({ level, stage }: { level: number; stage: number }) {
  const { lang, t, ta } = useLanguage()
  const on = (n: number) => stage >= n
  const deviceOn = on(1)
  const flowOn = on(2)
  const hubOn = on(3)
  const robotOn = on(4)
  const planOn = on(5)
  const alertOn = on(6)
  const rebuildOn = on(7)

  const casing = mix('#93A7BC', '#2F6BE0', hubOn ? Math.max(level, 0.35) : level * 0.5)
  const body = mix('#DCE6F2', '#D6F4F0', level)
  const accent = '#0F5BFB'
  const teal = '#13BFAF'

  return (
    <svg viewBox="0 0 640 305" className="w-full" role="img" aria-label={t('sb.title')}>
      <defs>
        <linearGradient id="sb-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7FBFF" />
          <stop offset="1" stopColor="#E8F2FB" />
        </linearGradient>
        <pattern id="sb-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="#D8E7F5" opacity="0.7" />
        </pattern>
        <radialGradient id="sb-hub" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="1" stopColor={accent} />
        </radialGradient>
        <linearGradient id="sb-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0F5BFB" />
          <stop offset="1" stopColor="#13BFAF" />
        </linearGradient>
      </defs>

      <rect width="640" height="305" rx="20" fill="url(#sb-bg)" />
      <rect width="640" height="305" rx="20" fill="url(#sb-grid)" opacity="0.55" />
      <ellipse cx="330" cy="296" rx="270" ry="10" fill="#7E93A8" opacity="0.12" />

      {/* 车间吊灯 */}
      {[[200, 26], [440, 26]].map(([lx, ly]) => (
        <g key={lx}>
          <line x1={lx} y1="10" x2={lx} y2={ly} stroke="#A8B7C5" strokeWidth="1.5" />
          <path d={`M${lx - 11} ${ly}h22l-4 6.5h-14z`} fill="#C2CEDB" />
          <motion.circle cx={lx} cy={ly + 4} r="2" fill="#FCD34D" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.4, repeat: Infinity }} />
        </g>
      ))}

      {/* 环境数据微尘 */}
      {flowOn &&
        [[86, 96], [596, 88], [606, 150], [72, 140]].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill={accent}
            animate={{ cy: [y, y - 14, y], opacity: [0.08, 0.35, 0.08] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      {/* 设备之间的连接 */}
      {DEVICE_LINKS.map(([a, b], i) => (
        <motion.path
          key={i}
          d={`M${a[0]} ${a[1]}H${b[0]}`}
          fill="none"
          stroke={teal}
          strokeWidth="2.5"
          strokeDasharray="6 7"
          animate={{ opacity: deviceOn ? 0.95 : 0.12, strokeDashoffset: deviceOn ? [0, -26] : 0 }}
          transition={{ opacity: { duration: 0.4 }, strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: 'linear' } }}
        />
      ))}
      {/* 设备 → AI 中枢 */}
      {MACHINES.map((m, i) => (
        <motion.path
          key={i}
          d={`M${m.link[0][0]} ${m.link[0][1]}L${HUB[0]} ${HUB[1]}`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeDasharray="5 6"
          animate={{ opacity: flowOn ? 0.85 : 0, strokeDashoffset: flowOn ? [0, -22] : 0 }}
          transition={{ duration: 0.5, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear' } }}
        />
      ))}

      {/* 数据流粒子 */}
      {flowOn &&
        DEVICE_LINKS.map(([a, b], i) => {
          const pts = trail(a, b)
          return (
            <motion.circle
              key={`d${i}`}
              r="3"
              fill={teal}
              animate={{ cx: pts.map((p) => p[0]), cy: pts.map((p) => p[1]), opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
            />
          )
        })}
      {hubOn &&
        MACHINES.map((m, i) => {
          const pts = [...m.link].reverse()
          return (
            <motion.circle
              key={`h${i}`}
              r="2.6"
              fill={accent}
              animate={{ cx: pts.map((p) => p[0]), cy: pts.map((p) => p[1]), opacity: [0.2, 0.95, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.45 }}
            />
          )
        })}

      {/* AI 中枢 */}
      <g>
        {!hubOn && (
          <motion.circle
            cx={HUB[0]}
            cy={HUB[1]}
            r="34"
            fill="none"
            stroke="#AFC0D3"
            animate={{ r: [34, 41], opacity: [0.45, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        {hubOn && (
          <motion.circle
            cx={HUB[0]}
            cy={HUB[1]}
            fill="none"
            stroke={accent}
            strokeWidth="2"
            animate={{ r: [36, 56], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <motion.circle
          cx={HUB[0]}
          cy={HUB[1]}
          r="34"
          fill={hubOn ? 'url(#sb-hub)' : '#C7D5E3'}
          stroke={hubOn ? '#1D4ED8' : '#9FB2C4'}
          strokeWidth="2.5"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.circle
          cx={HUB[0]}
          cy={HUB[1]}
          r="42"
          fill="none"
          stroke={hubOn ? accent : '#B9C8D6'}
          strokeWidth="1.4"
          strokeDasharray="4 9"
          animate={{ opacity: hubOn ? 0.75 : 0.35, strokeDashoffset: hubOn ? [0, -26] : 0 }}
          transition={{ strokeDashoffset: { duration: 6, repeat: Infinity, ease: 'linear' } }}
        />
        <text x={HUB[0]} y={HUB[1] - 2} textAnchor="middle" fill={hubOn ? '#FFFFFF' : '#5B6E83'} fontSize="17" fontWeight="800">
          AI
        </text>
        <text x={HUB[0]} y={HUB[1] + 14} textAnchor="middle" fill={hubOn ? '#DBEAFE' : '#8397AB'} fontSize="8.5" fontWeight="700">
          CORE
        </text>
      </g>

      {/* 机器设备 */}
      {MACHINES.map((m, i) => {
        const fault = i === 1 && alertOn
        return (
          <g key={m.x}>
            <rect x={m.x - 46} y="184" width="92" height="66" rx="10" fill={body} stroke={casing} strokeWidth="2" />
            <rect x={m.x - 38} y="192" width="76" height="26" rx="6" fill="#FFFFFF" opacity="0.85" />
            {[0, 1, 2].map((k) => (
              <motion.circle
                key={k}
                cx={m.x - 14 + k * 14}
                cy="189"
                r="1.7"
                fill={deviceOn ? teal : '#B9C8D6'}
                animate={{ opacity: deviceOn ? [0.3, 1, 0.3] : 1 }}
                transition={{ duration: 1.3, repeat: Infinity, delay: k * 0.25 }}
              />
            ))}
            {hubOn && (
              <motion.rect
                width="76"
                height="2.4"
                rx="1.2"
                fill={accent}
                opacity="0.45"
                animate={{ attrX: [m.x - 38, m.x - 38, m.x - 38], attrY: [194, 216, 194] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
              />
            )}
            {[0, 1, 2].map((k) => (
              <motion.rect
                key={k}
                width="14"
                height="8"
                rx="2"
                fill={hubOn ? accent : '#9FB2C4'}
                animate={{
                  attrX: [m.x - 32 + k * 24, m.x - 32 + k * 24, m.x - 32 + k * 24],
                  attrY: [208 - (hubOn ? 8 : 3), 208 - (hubOn ? 14 : 5), 208 - (hubOn ? 8 : 3)],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.2 }}
              />
            ))}
            <circle cx={m.x - 26} cy="232" r="7" fill="#FFFFFF" stroke={casing} strokeWidth="2" />
            <motion.line
              x1={m.x - 26}
              y1="232"
              x2={m.x - 22}
              y2="228"
              stroke={hubOn ? teal : '#93A7BC'}
              strokeWidth="1.6"
              strokeLinecap="round"
              animate={{ x2: [m.x - 22, m.x - 30, m.x - 22], y2: [228, 230, 228] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={m.x + 30}
              cy="232"
              r="4"
              fill={fault ? '#F59E0B' : deviceOn ? teal : '#B9C8D6'}
              animate={{ opacity: fault ? [0.25, 1, 0.25] : 1 }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
            {fault && (
              <>
                <motion.circle
                  cx={m.x}
                  cy="218"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  animate={{ r: [50, 68], opacity: [0.55, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                  <path d={`M${m.x - 7.5} 172l7.5 -12.5 7.5 12.5z`} fill="#F59E0B" stroke="#fff" strokeWidth="1.2" />
                  <line x1={m.x} y1={164.5} x2={m.x} y2={168.5} stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx={m.x} cy={170.6} r="0.95" fill="#fff" />
                </motion.g>
              </>
            )}
            <text x={m.x} y="266" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="700">
              {ta('sb.sceneLabels')[0]} {i + 1}
            </text>
          </g>
        )
      })}

      {/* 机器人协同 */}
      {robotOn &&
        [166, 474].map((x, i) => {
          const dir = i === 0 ? 1 : -1
          return (
            <g key={`r${x}`}>
              <rect x={x - 21} y="183" width="42" height="5" rx="2.5" fill={accent} opacity="0.55" />
              <rect x={x - 13} y="176" width="26" height="9" rx="4" fill={accent} />
              <path d={`M${x} 176V146`} stroke={accent} strokeWidth="6" strokeLinecap="round" />
              <motion.line
                x1={x}
                y1="146"
                stroke="#3B82F6"
                strokeWidth="5.5"
                strokeLinecap="round"
                animate={{ x2: [x + 30 * dir, x + 8 * dir, x + 30 * dir], y2: [160, 172, 160] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              />
              <circle cx={x} cy="146" r="4.5" fill="#EFF6FF" stroke={accent} strokeWidth="2" />
            </g>
          )
        })}

      {/* 排产计划（调度优化） */}
      <AnimatePresence>
        {planOn && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x="428" y="34" width="182" height="76" rx="12" fill="#FFFFFF" stroke="#CFE2F5" />
            <text x="442" y="52" fill="#0F172A" fontSize="9.5" fontWeight="700">
              {ta('sb.sceneLabels')[4]}
            </text>
            <rect x="576" y="42" width="22" height="13" rx="4" fill={accent} opacity="0.14" />
            <text x="587" y="51.5" textAnchor="middle" fontSize="8" fontWeight="800" fill={accent}>AI</text>
            {[0, 1, 2].map((row) => (
              <motion.rect
                key={row}
                height="8"
                rx="4"
                fill={row === 1 ? '#F59E0B' : accent}
                opacity={row === 1 ? 0.75 : 0.9}
                animate={{
                  attrX: [442, 442, 442],
                  attrY: [60 + row * 14, 60 + row * 14, 60 + row * 14],
                  width: [10, 40 + row * 44, 10],
                }}
                transition={{ duration: 3.2, repeat: Infinity, delay: row * 0.35, ease: 'easeInOut' }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* 产线重组：模组化单元滑入 */}
      {rebuildOn &&
        [
          { x: 200, run: [200, 208, 200] },
          { x: 392, run: [392, 400, 392] },
        ].map((cell) => (
          <motion.g key={`c${cell.x}`} animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2.4, repeat: Infinity }}>
            <motion.rect
              width="52"
              height="54"
              rx="8"
              fill="#EAF7FD"
              stroke={teal}
              strokeWidth="2"
              animate={{ attrX: cell.run, attrY: [196, 196, 196] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.rect
              width="34"
              height="6"
              rx="3"
              fill={teal}
              animate={{ attrX: cell.run.map((x) => x + 9), attrY: [212, 212, 212] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.rect
              width="22"
              height="6"
              rx="3"
              fill={accent}
              opacity="0.7"
              animate={{ attrX: cell.run.map((x) => x + 9), attrY: [226, 226, 226] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d={`M${cell.x + 18} 202l4 4 7.5 -8.5`} fill="none" stroke={teal} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          </motion.g>
        ))}

      {/* 传送带 */}
      <rect x="30" y="252" width="580" height="30" rx="14" fill={mix('#C9D4E0', '#C5EEE8', level)} stroke={mix('#AFBECC', '#78CEC4', level)} />
      <rect x="30" y="252" width="580" height="11" rx="6" fill="#FFFFFF" opacity="0.55" />
      <motion.path
        d="M44 268h552"
        fill="none"
        stroke={mix('#9FB2C4', '#5FC9BE', level)}
        strokeWidth="2"
        strokeDasharray="9 13"
        animate={{ strokeDashoffset: deviceOn ? [0, -44] : 0, opacity: deviceOn ? 0.55 : 0.18 }}
        transition={{ strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: 'linear' } }}
      />
      {[80, 180, 280, 380, 480, 580].map((x) => (
        <g key={x}>
          <circle cx={x} cy="268" r="7" fill="#F7FAFC" stroke={mix('#A8B8C6', '#84D3CA', level)} strokeWidth="2" />
          <line x1={x - 4} y1="268" x2={x + 4} y2="268" stroke={mix('#93A7BC', '#3FA99D', level)} strokeWidth="1.4" strokeLinecap="round" opacity={deviceOn ? 0.85 : 0.45} />
        </g>
      ))}
      {[120, 250, 400, 520].map((x, i) => (
        <motion.rect
          key={x}
          width="26"
          height="16"
          rx="3"
          fill={i === 2 && !alertOn ? '#F1F5F9' : mix('#CBD5E1', '#D6F4F0', level)}
          stroke={i === 2 && !alertOn ? '#F59E0B' : mix('#AAB9C8', '#62CFC8', level)}
          strokeWidth="1.6"
          animate={{ attrX: [x, x + 40, x], attrY: [234, 234, 234] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}

      {/* 工人 */}
      <motion.g animate={{ x: [40, 40, 40] }}>
        <circle cx="46" cy="196" r="7" fill={mix('#AEBECD', '#7CB0F8', level)} />
        <path d="M39.5 194.5a6.5 6.5 0 0 1 13 0Z" fill={mix('#8CA1B4', '#2563EB', level)} />
        <path d="M38 193a8 8 0 0 1 16 0Z" fill={mix('#C9D5E1', '#1D4ED8', level)} />
        <line x1="36.5" y1="193" x2="55.5" y2="193" stroke={mix('#A8B7C5', '#1E40AF', level)} strokeWidth="2.2" strokeLinecap="round" />
        <rect x="56" y="212" width="10" height="13" rx="1.5" fill="#fff" stroke={mix('#8598AB', '#2F6BE0', level)} strokeWidth="1.2" transform="rotate(9 61 218)" />
        <path d="M46 203c-3.6 0-6 2.6-6 6v20h12v-20c0-3.4-2.4-6-6-6Z" fill={mix('#9BAEC0', '#3B82F6', level)} />
        <motion.line
          x1="52"
          y1="210"
          x2="60"
          y2="220"
          stroke={mix('#8598AB', '#2F6BE0', level)}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ x2: [60, 66, 60], y2: [220, 214, 220] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <path d="M42 229v16M50 229v16" stroke={mix('#8598AB', '#2F6BE0', level)} strokeWidth="3.4" strokeLinecap="round" />
        <text x="46" y="266" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="700">
          {lang === 'en' ? 'WORKER' : '工人'}
        </text>
      </motion.g>

      {/* 当前阶段 */}
      <g>
        <rect x="26" y="34" width="196" height="42" rx="12" fill="#FFFFFF" stroke="#CFE2F5" />
        <motion.circle cx="44" cy="51" r="4.5" fill={stage === 0 ? '#B9C8D6' : teal} animate={{ opacity: stage === 0 ? 1 : [0.35, 1, 0.35] }} transition={{ duration: 1.4, repeat: Infinity }} />
        <text x="58" y="47" fill="#64748B" fontSize="8.5" fontWeight="700">
          {t('sb.stageChip')}
        </text>
        <text x="58" y="60" fill="#0F172A" fontSize="11" fontWeight="800">
          {String(Math.max(stage, 1)).padStart(2, '0')} / 07 · {ta('sb.stages')[Math.max(0, stage - 1)]}
        </text>
        <rect x="38" y="66" width="172" height="3.5" rx="1.75" fill="#E2E8F0" />
        <motion.rect
          height="3.5"
          rx="1.75"
          fill="url(#sb-bar)"
          animate={{ attrX: 38, attrY: 66, width: 172 * Math.min(1, stage / 7) }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </g>

      {/* 完成提示由外层 HTML 覆盖层呈现 */}
    </svg>
  )
}

/* ---------- 主组件 ---------- */
export default function AISandbox() {
  const { lang, t, ta } = useLanguage()
  const [values, setValues] = useState([0, 0, 0, 0, 0])
  const raf = useRef(0)
  const cfg = model(values)
  const complete = cfg.stage >= 7

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const runDemo = () => {
    cancelAnimationFrame(raf.current)
    const t0 = performance.now()
    const dur = 6200
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setValues(
        WEIGHTS.map((_, i) => {
          const start = i * 0.08
          const local = clamp01((eased - start) / (1 - 0.32))
          return Math.round(local * 100)
        }),
      )
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  const setOne = (i: number, value: number) => {
    cancelAnimationFrame(raf.current)
    setValues((prev) => prev.map((v, k) => (k === i ? value : v)))
  }

  return (
    <section id="sandbox" className="scene section-pad relative bg-canvas">
      <div className="container-x">
        <SectionHeading index="08" en="SANDBOX" title={t('sb.title')} subtitle={t('sb.sub')} />

        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-brand/8 px-4 py-2 text-[12.5px] font-semibold text-brand">
            <Info size={15} /> {t('sb.banner')}
          </span>
        </Reveal>

        {/* 控制台 */}
        <Reveal className="mt-8">
          <div className="card p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                <Zap size={17} className="text-brand" /> {t('sb.control')}
              </p>
              <div className="flex gap-2">
                <button className="btn btn-primary !py-2.5 !text-[13px]" onClick={runDemo}>
                  <Sparkles size={14} /> {t('sb.demo')}
                </button>
                <button className="btn btn-ghost !py-2.5 !text-[13px]" onClick={() => { cancelAnimationFrame(raf.current); setValues([0, 0, 0, 0, 0]) }}>
                  <RotateCcw size={14} /> {t('sb.reset')}
                </button>
              </div>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {WEIGHTS.map((_, i) => (
                <div key={i}>
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <label className="text-[13px] font-semibold text-ink">{ta('sb.sliders')[i]}</label>
                    <span className="rounded-lg px-2 py-0.5 text-[12.5px] font-bold" style={{ background: `${SLIDER_COLORS[i]}14`, color: SLIDER_COLORS[i] }}>
                      {values[i]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={values[i]}
                    className="slider"
                    aria-label={ta('sb.sliders')[i]}
                    onChange={(e) => setOne(i, Number(e.target.value))}
                    style={{ background: `linear-gradient(to right, ${SLIDER_COLORS[i]} ${values[i]}%, #E2E8F0 ${values[i]}%)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 场景 + KPI */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="card h-full p-4 sm:p-6">
              <div className="relative rounded-[18px] border border-line/70 bg-white/60 p-2">
                <SandboxScene level={cfg.level} stage={cfg.stage} />
                {/* 完成后的中央结论 */}
                <AnimatePresence>
                  {complete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6 pt-14"
                    >
                      <div className="max-w-[430px] rounded-3xl border border-white/80 bg-white/92 px-5 py-4 text-center shadow-[0_22px_60px_rgba(19,120,140,.18)] backdrop-blur">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/12 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-teal">
                          <Sparkles size={12} /> {lang === 'en' ? 'CONCLUSION' : '核心结论'}
                        </span>
                        <p className="mt-3 text-[16.5px] font-bold leading-relaxed text-ink">{t('sb.thesis')}</p>
                        <p className="mt-2.5 text-[12px] leading-relaxed text-body">{t('sb.thesisSub')}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* 阶段轨 */}
              <div className="mt-5 flex items-center justify-between gap-1">
                {ta('sb.stages').map((stage, i) => {
                  const done = cfg.stage >= i + 1
                  const current = cfg.stage === i + 1
                  return (
                    <div key={stage} className="flex min-w-0 flex-1 items-center">
                      <div className={`flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl px-1 py-2 transition-colors ${current ? 'bg-brand/8' : ''}`}>
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors"
                          style={{
                            background: done ? '#0F5BFB' : '#E2E8F0',
                            color: done ? '#fff' : '#94A3B8',
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className={`truncate text-[10.5px] font-semibold ${done ? 'text-ink' : 'text-muted'}`}>{stage}</span>
                      </div>
                      {i < 6 && <span className="text-[11px] text-slate-300">→</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            {/* KPI */}
            <Reveal delay={0.05}>
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-bold text-ink">{t('sb.kpiTitle')}</p>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-teal">
                    <motion.i className="h-1.5 w-1.5 rounded-full bg-teal" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }} />
                    {t('sb.live')}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {KPI_META.map((meta, i) => {
                    const value = cfg.kpi[i]
                    const delta = value - meta.base
                    const good = meta.up ? delta >= 0 : delta <= 0
                    const bar = Math.max(0.03, Math.min(1, value / meta.scale))
                    return (
                      <div key={i} className="rounded-2xl border border-line/70 bg-canvas-2/60 p-3.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[12.5px] font-semibold text-body">{ta('sb.kpis')[i]}</span>
                          <span className="flex items-baseline gap-1.5">
                            <span className="text-[21px] font-bold leading-none text-ink">{value.toFixed(meta.decimals)}</span>
                            <span className="text-[11px] font-bold text-muted">{ta('sb.kpiUnits')[i]}</span>
                            {meta.up ? (
                              <TrendingUp size={14} className={good ? 'text-teal' : 'text-amber-500'} />
                            ) : (
                              <TrendingDown size={14} className={good ? 'text-teal' : 'text-amber-500'} />
                            )}
                          </span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand/10">
                            <motion.i className="block h-full rounded-full bg-gradient-to-r from-brand to-cyan" animate={{ width: `${bar * 100}%` }} transition={{ duration: 0.3 }} />
                          </span>
                          <span className={`text-[10.5px] font-bold ${good ? 'text-teal' : 'text-amber-600'}`}>
                            {delta >= 0 ? '+' : '−'}
                            {Math.abs(delta).toFixed(meta.decimals)}
                            {ta('sb.kpiUnits')[i]}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>

            {/* 指数 */}
            <Reveal delay={0.1}>
              <div className="card relative overflow-hidden p-6">
                <span className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 92% 8%, rgba(19,191,175,.14), transparent 46%)' }} />
                <div className="relative flex items-center gap-5">
                  <svg viewBox="0 0 140 140" className="h-[132px] w-[132px] shrink-0">
                    <defs>
                      <linearGradient id="sb-idx" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#0F5BFB" />
                        <stop offset="1" stopColor="#13BFAF" />
                      </linearGradient>
                    </defs>
                    {(() => {
                      const R = 54
                      const polar = (deg: number) => [70 + R * Math.cos((deg * Math.PI) / 180), 70 + R * Math.sin((deg * Math.PI) / 180)]
                      const [ax, ay] = polar(150)
                      const [bx, by] = polar(30)
                      const d = `M${ax.toFixed(1)} ${ay.toFixed(1)}A${R} ${R} 0 1 1 ${bx.toFixed(1)} ${by.toFixed(1)}`
                      const len = 2 * Math.PI * R * (240 / 360)
                      return (
                        <>
                          <path d={d} fill="none" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
                          <motion.path
                            d={d}
                            fill="none"
                            stroke="url(#sb-idx)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            style={{ strokeDasharray: len }}
                            animate={{ strokeDashoffset: len * (1 - cfg.index / 100) }}
                            transition={{ duration: 0.35 }}
                          />
                        </>
                      )
                    })()}
                  </svg>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-muted">
                      <Gauge size={13} /> {t('sb.indexLabel')}
                    </p>
                    <p className="mt-1 text-[42px] font-black leading-none text-gradient">{cfg.index}</p>
                    <p className="mt-2 text-[11.5px] font-semibold text-body">
                      {t('sb.indexStart')} <span className="mx-1 text-muted">→</span> {t('sb.indexTarget')}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">{t('sb.indexHint')}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-6">
          <TakeawayNote accent="#13BFAF">{t('sb.takeaway')}</TakeawayNote>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
            <Info size={12} className="mt-0.5 shrink-0" />
            <span>{t('sb.note')}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
