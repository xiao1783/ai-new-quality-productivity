import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import {
  User,
  Repeat,
  Workflow,
  Unplug,
  TrendingUp,
  Database,
  Brain,
  RefreshCw,
  Network,
  Rocket,
  Cpu,
  Zap,
  BadgeCheck,
  Check,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import SourceNote from './ui/SourceNote'
import TakeawayNote from './ui/TakeawayNote'
import { useLanguage } from '@/i18n/LanguageContext'

const TRANSFORM_PAIRS = [
  { leftIcon: User, left: '人工经验', leftDesc: '判断依赖个人经历', rightIcon: Database, right: '数据驱动', rightDesc: '以实时数据支持判断' },
  { leftIcon: Repeat, left: '重复劳动', leftDesc: '大量操作依靠人工', rightIcon: Brain, right: '智能决策', rightDesc: '模型辅助快速决策' },
  { leftIcon: Workflow, left: '固定流程', leftDesc: '单一路径难以适应变化', rightIcon: RefreshCw, right: '自主优化', rightDesc: '根据反馈动态调整流程' },
  { leftIcon: Unplug, left: '信息孤岛', leftDesc: '设备与系统彼此割裂', rightIcon: Network, right: '实时协同', rightDesc: '设备、数据与人员互联' },
  { leftIcon: TrendingUp, left: '线性增长', leftDesc: '增长依赖资源持续投入', rightIcon: Rocket, right: '创新增长', rightDesc: '以智能放大创新效率' },
]

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

/* ---------- 三特征微型可视化 ---------- */
function TechnologyVisual({ active }: { active: boolean }) {
  const points = [[8, 76], [42, 65], [74, 68], [108, 45], [142, 49], [178, 25], [212, 15]]
  return (
    <svg viewBox="0 0 220 100" className="h-[104px] w-full" role="img" aria-label="技术密度增长趋势">
      <defs>
        <linearGradient id="technology-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[26, 50, 74].map((y) => <path key={y} d={`M4 ${y} H216`} stroke="#E2E8F0" strokeWidth="1" />)}
      <motion.path
        d="M8 76 L42 65 L74 68 L108 45 L142 49 L178 25 L212 15"
        fill="none"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathLength: [0, 1] }}
        transition={active
          ? { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
          : { duration: 3.4, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
      />
      <motion.path
        d="M8 76 L42 65 L74 68 L108 45 L142 49 L178 25 L212 15 L212 90 L8 90 Z"
        fill="url(#technology-fill)"
        animate={{ opacity: active ? [0, 1] : 0.75 }}
        transition={{ duration: 0.8 }}
      />
      {points.map(([x, y], index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={y}
          r="4"
          fill="#fff"
          stroke="#2563EB"
          strokeWidth="2"
          animate={{ scale: active ? [0.75, 1.35, 1] : [1, 1.16, 1], opacity: active ? 1 : [0.45, 0.95, 0.45] }}
          transition={active
            ? { delay: index * 0.08, duration: 0.3 }
            : { duration: 2.2, repeat: Infinity, delay: index * 0.18 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  )
}

function EfficiencyVisual({ active }: { active: boolean }) {
  const nodes = [
    { zh: '感知', en: 'Perception' },
    { zh: '决策', en: 'Decision' },
    { zh: '执行', en: 'Execution' },
  ]
  return (
    <div className="relative flex h-[104px] items-center justify-between px-2" role="img" aria-label="感知到决策再到执行的协同流程">
      <div className="absolute left-[17%] right-[17%] top-1/2 h-px -translate-y-1/2 bg-sky-100" />
      <motion.div
        className="absolute left-[17%] right-[17%] top-1/2 h-[2px] origin-left -translate-y-1/2 bg-cyan-500"
        animate={{ scaleX: active ? [0, 1] : 0.42, opacity: active ? 1 : [0.4, 0.75, 0.4] }}
        transition={{
          scaleX: { duration: 0.75, ease: 'easeInOut' },
          opacity: { duration: 2, repeat: Infinity },
        }}
      />
      {[32.5, 67.5].map((x) => (
        <motion.span
          key={x}
          className="absolute top-1/2 z-10 -translate-y-1/2"
          style={{ left: `${x}%` }}
          animate={{ opacity: active ? 1 : [0.45, 0.85, 0.45] }}
          transition={{ duration: 2, repeat: Infinity, delay: x === 32.5 ? 0 : 0.25 }}
        >
          <svg width="11" height="11" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2.5 1l5 4-5 4" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      ))}
      {nodes.map((node, index) => (
        <motion.div
          key={node.en}
          className="relative z-10 flex w-[30%] flex-col items-center"
          animate={{ y: active ? [3, 0] : 0, opacity: active ? [0.48, 1] : 0.72 }}
          transition={{ delay: active ? index * 0.16 : 0, duration: 0.3 }}
        >
          <motion.span
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200 bg-white text-[12px] font-bold text-cyan-700 shadow-sm"
            animate={{ borderColor: active ? ['#BAE6FD', '#06B6D4'] : '#BAE6FD', backgroundColor: active ? ['#FFFFFF', '#ECFEFF'] : '#FFFFFF' }}
            transition={{ delay: active ? index * 0.16 : 0, duration: 0.3 }}
          >
            {index + 1}
          </motion.span>
          <span className="mt-2 text-[11px] font-bold text-ink">{node.zh}</span>
          <span className="text-[8.5px] text-muted">{node.en}</span>
        </motion.div>
      ))}
    </div>
  )
}

function QualityVisual({ active }: { active: boolean }) {
  const { t } = useLanguage()
  const circumference = 2 * Math.PI * 32
  return (
    <div className="relative flex h-[104px] items-center justify-center gap-5" role="img" aria-label="全球灯塔工厂中国占比 42%（85 / 201 家）">
      <div className="relative shrink-0">
        <svg viewBox="0 0 88 88" className="h-[96px] w-[96px] -rotate-90">
          <motion.circle cx="44" cy="44" r="38" fill="#14B8A6" animate={{ opacity: active ? [0.05, 0.14, 0.05] : [0.04, 0.1, 0.04] }} transition={{ duration: 2.4, repeat: Infinity }} />
          <circle cx="44" cy="44" r="32" fill="none" stroke="#E2E8F0" strokeWidth="7" />
          <motion.circle
            cx="44"
            cy="44"
            r="32"
            fill="none"
            stroke="#14B8A6"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: active ? [circumference, circumference * 0.58] : circumference * 0.58 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[20px] font-bold leading-none text-teal">42%</span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-bold leading-tight text-ink">{t('u.qualityCap')}</p>
        <p className="mt-1.5 text-[11px] leading-tight text-muted">{t('u.qualityDetail')}</p>
      </div>
    </div>
  )
}

/* ---------- 场景曲线采样：沿路径运动的元素 ---------- */
type Pt = [number, number]
const cubicAt = (p0: Pt, c1: Pt, c2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return [
    a * p0[0] + b * c1[0] + c * c2[0] + d * p3[0],
    a * p0[1] + b * c1[1] + c * c2[1] + d * p3[1],
  ]
}
const curveSamples = (p0: Pt, c1: Pt, c2: Pt, p3: Pt, count = 16): Pt[] =>
  Array.from({ length: count }, (_, i) => cubicAt(p0, c1, c2, p3, i / (count - 1)))

/* 秒针轨迹：8 点近似圆周 */
const HAND_X = [3.4, 2.4, 0, -2.4, -3.4, -2.4, 0, 2.4, 3.4]
const HAND_Y = [0, 2.4, 3.4, 2.4, 0, -2.4, -3.4, -2.4, 0]

function TraditionalFactoryScene({ focus }: { focus: number | null }) {
  const { t } = useLanguage()
  const isolated = focus === 3
  const fixed = focus === 2
  const human = focus === 0
  const repeated = focus === 1

  const limb = human ? '#2F6BE0' : '#8598AB'
  const torso = human ? '#3B82F6' : '#9BAEC0'
  const headTone = human ? '#7CB0F8' : '#AEBECD'
  const helmet = human ? '#2563EB' : '#8CA1B4'

  return (
    <svg viewBox="0 0 220 210" className="h-full w-full" role="img" aria-label="传统工厂示意">
      <defs>
        <linearGradient id="tf-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCFEFF" />
          <stop offset="0.55" stopColor="#E7EFF8" />
          <stop offset="1" stopColor="#CEDDED" />
        </linearGradient>
        <linearGradient id="tf-wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFF5FA" />
          <stop offset="1" stopColor="#D5E2F0" />
        </linearGradient>
        <linearGradient id="tf-belt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6EDF5" />
          <stop offset="0.45" stopColor="#CDDAE7" />
          <stop offset="1" stopColor="#AFC2D3" />
        </linearGradient>
        <linearGradient id="tf-crate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8EEF5" />
          <stop offset="1" stopColor="#CBD8E4" />
        </linearGradient>
        <radialGradient id="tf-ground" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7E93A8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7E93A8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tf-ambient" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#DDEBF8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#DDEBF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 环境光与地面投影 */}
      <ellipse cx="110" cy="100" rx="106" ry="92" fill="url(#tf-ambient)" />
      <ellipse cx="104" cy="172" rx="86" ry="11" fill="url(#tf-ground)" />

      {/* 厂房主体 */}
      <path d="M18 168V74l38 18V66l42 22V46h72v122Z" fill="url(#tf-body)" stroke="#A3B8CC" strokeWidth="2" strokeLinejoin="round" />
      {/* 左侧锯齿车间 */}
      <path d="M18 168V74l38 18V66l42 22v80Z" fill="url(#tf-wing)" />
      {/* 车间地面 */}
      <path d="M20 151h150" stroke="#C2D2E1" strokeWidth="1.2" />
      {/* 屋顶压顶 */}
      <path d="M98 46h72" stroke="#C4D3E1" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M100 47.5h68" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />

      {/* 屋面排气管 */}
      <rect x="120" y="34" width="6" height="13" rx="2" fill="#B3C4D4" />
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          r={2 + i * 0.7}
          fill="#C8D5E1"
          animate={{ cx: [123, 126], cy: [32, 17], opacity: [0.45, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
        />
      ))}

      {/* 烟囱与烟气 */}
      <rect x="150" y="27" width="13" height="21" rx="2.5" fill="#C6D3E0" stroke="#A3B8CC" />
      <rect x="148" y="25" width="17" height="5" rx="2" fill="#B3C4D4" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={2.4 + i * 0.9}
          fill="#C2CFDC"
          animate={{ cx: [156, 163 + i * 3], cy: [23, 5], opacity: [0.5, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }}
        />
      ))}

      {/* 侧窗：一盏灯光不稳 */}
      <g>
        <rect x="22" y="80" width="16" height="13" rx="2" fill="#D7E4F0" stroke="#B2C5D6" />
        <path d="M30 80v13" stroke="#B2C5D6" />
      </g>
      <g>
        <rect x="22" y="96" width="16" height="13" rx="2" fill="#FBE7BC" stroke="#E0B25C" />
        <path d="M30 96v13" stroke="#E0B25C" />
        <motion.rect width="16" height="13" rx="2" fill="#FCD34D" animate={{ attrX: [22, 22, 22], attrY: [96, 96, 96], opacity: [0.15, 0.85, 0.15] }} transition={{ duration: 2.1, repeat: Infinity }} />
      </g>

      {/* 车间挂钟 */}
      <g transform="translate(86 100)">
        <circle r="6.6" fill="#FBFDFF" stroke="#9DAFC0" strokeWidth="1.4" />
        <path d="M0 -3.8V0l2.8 1.6" fill="none" stroke="#5C7286" strokeWidth="1.2" strokeLinecap="round" />
        <motion.line x1="0" y1="0" x2="3.4" y2="0" stroke="#E8973A" strokeWidth="1.1" strokeLinecap="round" animate={{ x2: HAND_X, y2: HAND_Y }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
      </g>

      {/* 设备机位：彼此断开 */}
      {[64, 112, 164].map((x, index) => {
        const alert = isolated
        return (
          <g key={x}>
            {index < 2 && (
              <motion.path
                d={`M${x + 8} 78H${[112, 164][index] - 8}`}
                fill="none"
                stroke={alert ? '#F0A93B' : '#9CAFC1'}
                strokeWidth="2"
                strokeDasharray="3 6"
                strokeLinecap="round"
                animate={{ opacity: alert ? 0.15 : 0.8 }}
                transition={{ duration: 0.35 }}
              />
            )}
            {alert && (
              <motion.circle
                cx={x}
                cy="78"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.4"
                animate={{ r: [11, 17], opacity: [0.7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.22, ease: 'easeOut' }}
              />
            )}
            <rect x={x - 8} y="71" width="16" height="14" rx="3.5" fill={alert ? '#F59E0B' : '#93A7BC'} />
            <rect x={x - 5.5} y="74" width="11" height="5" rx="1.6" fill="#F4F8FC" opacity="0.95" />
            <circle cx={x + 5} cy="82" r="1.5" fill={alert ? '#FFF3D6' : '#DCE5EE'} />
          </g>
        )
      })}
      {/* 链路断开标记 */}
      <g stroke="#B9C7D6" strokeWidth="1.4" strokeLinecap="round">
        <path d="M100 75l6 6M106 75l-6 6" />
      </g>

      {/* 墙面控制柜 */}
      <g>
        <rect x="106" y="92" width="46" height="42" rx="6" fill="#E9F0F7" stroke="#B2C5D7" />
        <path d="M106 101h46" stroke="#C6D5E3" />
        <circle cx="119" cy="112" r="7" fill="#FBFDFF" stroke="#A9BCCE" strokeWidth="1.2" />
        <motion.line
          x1="119"
          y1="112"
          x2="123"
          y2="107.5"
          stroke="#E8973A"
          strokeWidth="1.3"
          strokeLinecap="round"
          animate={{ x2: [122.5, 114.5, 122.5], y2: [107.5, 109, 107.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="140" cy="110" r="3.4" fill="#F59E0B" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.6, repeat: Infinity }} />
        <circle cx="112" cy="127" r="2.4" fill="#BECEDD" />
        <circle cx="121" cy="127" r="2.4" fill="#BECEDD" />
        <rect x="130" y="124" width="16" height="5.5" rx="2.75" fill="#BECEDD" />
      </g>

      {/* 断续的流程：固定流程时被拉直 */}
      {fixed ? (
        <motion.path
          d="M30 130H168"
          fill="none"
          stroke="#64748B"
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <g fill="none" stroke="#B4C3D3" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="6 8">
          <motion.path d="M30 131C52 118 72 120 90 125" animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }} />
          <motion.path d="M114 133C134 139 152 130 168 118" animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }} />
        </g>
      )}

      {/* 传送带 */}
      <ellipse cx="110" cy="171" rx="86" ry="6" fill="url(#tf-ground)" />
      <rect x="26" y="152" width="168" height="16" rx="8" fill="url(#tf-belt)" stroke="#A8B9C9" />
      <rect x="30" y="154" width="160" height="3.6" rx="1.8" fill="#FFFFFF" opacity="0.5" />
      {[42, 76, 110, 144, 178].map((x) => (
        <g key={x}>
          <circle cx={x} cy="162" r="4.4" fill="#F2F6FA" stroke="#93A6B9" strokeWidth="1.3" />
          <circle cx={x} cy="162" r="1.3" fill="#B9C8D6" />
        </g>
      ))}
      <motion.path d="M34 158h150" stroke="#8FA3B6" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="6 8" animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />

      {/* 在制品 */}
      {[58, 92, 152].map((x) => (
        <g key={x}>
          <rect x={x} y="134" width="22" height="17" rx="3" fill="url(#tf-crate)" stroke="#A9BACA" />
          <path d={`M${x + 4} 141h14M${x + 4} 146h9`} stroke="#A9BACA" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
      <g>
        <rect x="122" y="134" width="22" height="17" rx="3" fill="#FFF8EA" stroke="#E9A93B" strokeWidth="1.6" />
        <path d="M126 141h14M126 146h9" stroke="#D9A24A" strokeWidth="1.8" strokeLinecap="round" />
        <motion.circle cx="141" cy="132" r="2.6" fill="#F59E0B" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} />
      </g>

      {/* 工人 */}
      <g>
        <ellipse cx="48" cy="150" rx="10" ry="2.6" fill="#7E93A8" opacity="0.2" />
        {human && (
          <motion.circle cx="48" cy="104" fill="none" stroke="#2563EB" strokeWidth="1.4" animate={{ r: [9, 16], opacity: [0.75, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
        )}
        <path d="M44 131v20M52 131v20" stroke={limb} strokeWidth="3.6" strokeLinecap="round" />
        <path d="M48 111c-4.2 0-7 3-7 7v13h14v-13c0-4-2.8-7-7-7Z" fill={torso} />
        <path d="M42 121l-7 6" stroke={limb} strokeWidth="3.2" strokeLinecap="round" />
        <rect x="27" y="124" width="13" height="10" rx="2" fill="#E6ECF3" stroke="#A9BACA" />
        <motion.line
          x1="54"
          y1="121"
          x2="63"
          y2="127"
          stroke={limb}
          strokeWidth="3.4"
          strokeLinecap="round"
          animate={{ x2: repeated ? [63, 56, 63] : [63, 59, 63], y2: repeated ? [127, 134, 127] : [127, 131, 127] }}
          transition={{ duration: repeated ? 1.1 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="48" cy="104" r="6.2" fill={headTone} />
        <path d="M41.8 102.4a6.2 6.2 0 0 1 12.4 0Z" fill={helmet} />
        <path d="M40 102.2h18" stroke={helmet} strokeWidth="2" strokeLinecap="round" />
      </g>

      <text x="110" y="196" textAnchor="middle" fill="#5B6E83" fontSize="11" fontWeight="700">{t('u.tradCap')}</text>
    </svg>
  )
}

const FLOW_MAIN: [Pt, Pt, Pt, Pt] = [[80, 146], [116, 146], [126, 124], [188, 108]]
const FLOW_OPT: [Pt, Pt, Pt, Pt] = [[80, 146], [104, 110], [144, 150], [188, 104]]
const agv = (v: number) => [v, v + 10, v]
/** 关键帧相位旋转：让同一条路径上的多个工件错开位置 */
const rot = <T,>(arr: T[], k: number): T[] => [...arr.slice(k), ...arr.slice(0, k)]

function SmartFactoryScene({ focus, active }: { focus: number | null; active: boolean }) {
  const { t } = useLanguage()
  const networked = focus === 3 || active
  const optimize = focus === 2
  const flow = optimize ? FLOW_OPT : FLOW_MAIN
  const flowD = `M${flow[0][0]} ${flow[0][1]}C${flow[1][0]} ${flow[1][1]} ${flow[2][0]} ${flow[2][1]} ${flow[3][0]} ${flow[3][1]}`
  const samples = curveSamples(flow[0], flow[1], flow[2], flow[3], 16)
  const flowX = samples.map((p) => p[0])
  const flowY = samples.map((p) => p[1])
  const swing = { x2: [188, 176, 188], y2: [108, 119, 108] }

  return (
    <svg viewBox="0 0 220 210" className="h-full w-full" role="img" aria-label="智能工厂示意">
      <defs>
        <linearGradient id="sf-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8FDFF" />
          <stop offset="1" stopColor="#DFF0FD" />
        </linearGradient>
        <linearGradient id="sf-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="sf-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ED3F2" stopOpacity="0.3" />
          <stop offset="1" stopColor="#8ED3F2" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sf-ambient" cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#D6F1E9" stopOpacity="0.5" />
          <stop offset="1" stopColor="#D6F1E9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="110" cy="96" rx="104" ry="86" fill="url(#sf-ambient)" />

      {/* 厂房：玻璃幕墙 */}
      <rect x="18" y="46" width="184" height="124" rx="16" fill="url(#sf-glass)" stroke="#A3D5F2" strokeWidth="2" />
      <path d="M34 52h152" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <path d="M30 148h160" stroke="#BFE3F7" strokeWidth="1.4" />
      <rect x="30" y="148" width="160" height="14" rx="4" fill="url(#sf-floor)" />

      {/* 面板指示灯 */}
      {[{ x: 182, c: '#14B8A6' }, { x: 188, c: '#22D3EE' }, { x: 194, c: '#F59E0B' }].map((l, i) => (
        <motion.circle key={l.x} cx={l.x} cy="55" r="1.8" fill={l.c} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35 }} />
      ))}

      {/* 感知节点 */}
      {[{ x: 69, r: 5 }, { x: 124, r: 6.4 }, { x: 169, r: 5 }].map((n, i) => (
        <g key={n.x}>
          <motion.circle cx={n.x} cy="30" fill="#14B8A6" animate={{ r: [n.r + 5, n.r + 8], opacity: networked ? [0.28, 0.06] : [0.1, 0.04] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }} />
          <circle cx={n.x} cy="30" r={n.r} fill="#14B8A6" />
          <circle cx={n.x} cy="30" r={n.r * 0.38} fill="#FFFFFF" opacity="0.92" />
        </g>
      ))}
      {networked && (
        <motion.circle
          cx="124"
          cy="30"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="1.2"
          animate={{ r: [10, 17], opacity: [0.85, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* 互联链路 */}
      <motion.path
        d="M69 30H169M69 35V52M124 36V118M169 35V124"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1.8"
        strokeDasharray="4 5"
        strokeLinecap="round"
        animate={{ opacity: networked ? 1 : 0.3, strokeDashoffset: networked ? [0, -18] : 0 }}
        transition={{ opacity: { duration: 0.5 }, strokeDashoffset: networked ? { duration: 1.2, repeat: Infinity, ease: 'linear' } : { duration: 0.3 } }}
      />
      {[[69, 52], [124, 118], [169, 124]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#14B8A6" opacity={networked ? 1 : 0.4} />
      ))}

      {/* 数据看板 */}
      <g>
        <rect x="32" y="52" width="64" height="48" rx="9" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.5" />
        <path d="M39 63h13M39 68h8" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <motion.circle cx="88" cy="61" r="2.4" fill="#06B6D4" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.4, repeat: Infinity }} />
        <path d="M39 90 47 80 55 85 65 71" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <motion.circle cx="65" cy="71" r="2.6" fill="#2563EB" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.6, repeat: Infinity }} />
        {[{ x: 71, h: 8 }, { x: 79, h: 14 }, { x: 87, h: 10 }].map((b, i) => (
          <motion.rect
            key={b.x}
            width="5"
            rx="1.6"
            fill="#93C5FD"
            animate={{ attrX: [b.x, b.x, b.x], attrY: [90 - b.h * 0.66, 90 - b.h, 90 - b.h * 0.66], height: [b.h * 0.66, b.h, b.h * 0.66] }}
            transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </g>

      {/* 智能料架 */}
      <g>
        <rect x="30" y="112" width="30" height="36" rx="4" fill="#EAF7FD" stroke="#A8D7F3" strokeWidth="1.4" />
        <path d="M30 124h30M30 136h30" stroke="#C7E6F8" strokeWidth="1.4" />
        <rect x="34" y="116" width="9" height="7" rx="1.6" fill="#7DD3FC" />
        <rect x="46" y="116" width="10" height="7" rx="1.6" fill="#BAE6FD" />
        <rect x="34" y="128" width="11" height="7" rx="1.6" fill="#BAE6FD" />
        <rect x="48" y="128" width="8" height="7" rx="1.6" fill="#7DD3FC" />
        <rect x="35" y="140" width="18" height="7" rx="1.6" fill="#7DD3FC" opacity="0.7" />
      </g>

      {/* 视觉扫描门 */}
      <g>
        <path d="M114 118v26M134 118v26" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M110 118h28" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
        <rect x="119" y="120" width="10" height="7" rx="2" fill="#0EA5E9" />
        <motion.line
          x1="124"
          y1="129"
          x2="124"
          y2="143"
          stroke="#67E8F9"
          strokeWidth="2.4"
          strokeLinecap="round"
          animate={{ y2: [143, 134, 143], opacity: [0.85, 0.3, 0.85] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      {/* 主流程 */}
      <motion.path
        d={flowD}
        fill="none"
        stroke="url(#sf-flow)"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ pathLength: active || optimize ? [0.35, 1] : 1, opacity: active || optimize ? 1 : 0.62 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* 沿流程运动的工件与脉冲 */}
      {[{ dur: 4.6, offset: 0, w: 14, h: 9, fill: '#0EA5E9' }, { dur: 6.4, offset: 6, w: 11, h: 8, fill: '#14B8A6' }].map((item) => (
        <motion.rect
          key={item.offset}
          width={item.w}
          height={item.h}
          rx="2"
          fill={item.fill}
          animate={{
            attrX: rot(flowX, item.offset).map((v) => v - item.w / 2),
            attrY: rot(flowY, item.offset).map((v) => v - item.h / 2),
          }}
          transition={{ duration: item.dur, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      <motion.circle r="2.6" fill="#06B6D4" animate={{ cx: flowX, cy: flowY, opacity: networked ? 0.95 : 0.35 }} transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }} />

      {/* 机械臂 */}
      <g>
        <ellipse cx="164" cy="137" rx="18" ry="3.4" fill="#7EA6C4" opacity="0.22" />
        <rect x="148" y="126" width="32" height="10" rx="5" fill="#2563EB" />
        <path d="M164 126V98" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
        <motion.line x1="164" y1="98" x2="188" y2="108" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" animate={swing} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle r="4" fill="#0EA5E9" animate={{ cx: swing.x2, cy: swing.y2 }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="164" cy="98" r="5" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.4" />
      </g>

      {/* AGV */}
      <g>
        <ellipse cx="55" cy="168" rx="23" ry="3" fill="#7EA6C4" opacity="0.2" />
        <motion.rect width="42" height="17" rx="6" fill="#0EA5E9" animate={{ attrX: agv(34), attrY: [148, 148, 148] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.rect width="42" height="5" rx="2.5" fill="#38BDF8" opacity="0.55" animate={{ attrX: agv(34), attrY: [148, 148, 148] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.rect width="18" height="8" rx="3" fill="#BAE6FD" animate={{ attrX: agv(40), attrY: [142, 142, 142] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle r="3.6" fill="#334155" animate={{ cx: agv(44), cy: [166, 166, 166] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle r="3.6" fill="#334155" animate={{ cx: agv(66), cy: [166, 166, 166] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle r="2.5" fill="#F59E0B" animate={{ cx: agv(76), cy: [145, 145, 145], opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
      </g>

      <text x="110" y="196" textAnchor="middle" fill="#0F5BFB" fontSize="11" fontWeight="700">{t('u.smartCap')}</text>
    </svg>
  )
}

interface ModeItemProps {
  icon: typeof User
  title: string
  desc: string
  active: boolean
  dimmed: boolean
  side: 'left' | 'right'
  onClick: () => void
}

function ModeItem({ icon: Icon, title, desc, active, dimmed, side, onClick }: ModeItemProps) {
  const accent = side === 'right'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: side === 'left' ? 4 : -4 }}
      animate={{ opacity: dimmed ? 0.28 : 1, scale: active ? 1.015 : 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`group w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
        active
          ? accent ? 'border-brand/35 bg-brand/10' : 'border-sky-300 bg-sky-50'
          : 'border-transparent hover:border-sky-100 hover:bg-sky-50/80'
      }`}
    >
      <span className="flex items-center gap-3">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${accent ? 'bg-brand/10 text-brand' : 'bg-slate-100 text-muted'} ${active ? '!bg-brand !text-white shadow-[0_6px_16px_rgba(37,99,235,.22)]' : 'group-hover:text-brand'}`}>
          <Icon size={16} />
        </span>
        <span>
          <span className="block text-[14px] font-semibold text-body">{title}</span>
          <span className={`mt-0.5 block text-[10.5px] leading-tight text-muted transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{desc}</span>
        </span>
      </span>
    </motion.button>
  )
}

const FEATURES = [
  {
    index: '01',
    icon: Cpu,
    en: 'TECHNOLOGY',
    visual: 'technology' as const,
    keywords: ['AI', 'DATA', 'COMPUTING'],
    color: '#2563EB',
    glow: 'rgba(37,99,235,.075)',
  },
  {
    index: '02',
    icon: Zap,
    en: 'EFFICIENCY',
    visual: 'efficiency' as const,
    keywords: ['RT', 'SYNC', 'OPT'],
    color: '#06B6D4',
    glow: 'rgba(6,182,212,.075)',
  },
  {
    index: '03',
    icon: BadgeCheck,
    en: 'QUALITY',
    visual: 'quality' as const,
    keywords: ['RELY', 'SUSTAIN', 'STD'],
    color: '#14B8A6',
    glow: 'rgba(20,184,166,.075)',
  },
]

function FeatureCard({ feature, text }: { feature: (typeof FEATURES)[number]; text: { title: string; desc: string; core: string; keys: string[]; src: string; takeaway: string } }) {
  const { lang } = useLanguage()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="card relative flex h-full min-h-[350px] flex-col overflow-hidden border border-white/90 p-7 outline-none transition-[border-color,box-shadow] duration-300 hover:border-sky-200 hover:shadow-[0_18px_44px_rgba(37,99,235,.12)] focus-visible:border-sky-300"
    >
      <span className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 100% 100%, ${feature.glow}, transparent 44%)` }} />

      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${feature.color}12`, color: feature.color }}>
          <feature.icon size={21} />
        </span>
        <div>
          <span className="text-[10px] font-bold tracking-[0.18em]" style={{ color: feature.color }}>{feature.index}</span>
          <p className="mt-0.5 text-[10px] font-bold tracking-[0.16em] text-muted">{feature.en}</p>
        </div>
      </div>

      <div className="relative mt-5">
        <h4 className="text-[19px] font-bold leading-none text-ink">{text.title}</h4>
        <p className="mt-3 min-h-[44px] text-[13.5px] leading-relaxed text-body">{text.desc}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-wide text-muted">{lang === 'en' ? 'Core idea' : '核心概念'}</span>
          <span className="text-[14px] font-bold" style={{ color: feature.color }}>{text.core}</span>
        </div>
      </div>

      <div className="relative mt-5 h-[104px] rounded-2xl border border-slate-100 bg-white/55 px-2">
        {feature.visual === 'technology' && <TechnologyVisual active={hovered} />}
        {feature.visual === 'efficiency' && <EfficiencyVisual active={hovered} />}
        {feature.visual === 'quality' && <QualityVisual active={hovered} />}
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        {text.keys.map((keyword, index) => (
          <motion.span
            key={keyword}
            animate={{ opacity: hovered ? 1 : 0.72, y: hovered ? [2, 0] : 0 }}
            transition={{ delay: hovered ? index * 0.08 : 0, duration: 0.22 }}
            className="rounded-full border bg-white/80 px-2.5 py-1 text-[9.5px] font-bold tracking-wide"
            style={{ borderColor: `${feature.color}24`, color: feature.color }}
          >
            {keyword}
          </motion.span>
        ))}
      </div>

      <TakeawayNote className="mt-3" accent={feature.color}>{text.takeaway}</TakeawayNote>
      <SourceNote className="mt-3">{text.src}</SourceNote>
    </motion.div>
  )
}

export default function Understand() {
  const { lang, t, ta } = useLanguage()
  const [activePair, setActivePair] = useState<number | null>(null)
  const [phase, setPhase] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [complete, setComplete] = useState(false)
  const [aiHover, setAiHover] = useState(false)
  const playbackRef = useRef(0)
  const pulseControls = useAnimationControls()

  const lefts = ta('u.lefts')
  const leftDescs = ta('u.leftDescs')
  const rights = ta('u.rights')
  const rightDescs = ta('u.rightDescs')
  const PAIRS = TRANSFORM_PAIRS.map((pair, i) => ({
    ...pair,
    left: lefts[i],
    leftDesc: leftDescs[i],
    right: rights[i],
    rightDesc: rightDescs[i],
  }))
  const STEPS = ta('u.steps')
  const featureTexts = [
    { title: t('u.f1t'), desc: t('u.f1d'), core: t('u.f1core'), keys: ta('u.f1keys'), src: t('u.f1src'), takeaway: t('u.tk1') },
    { title: t('u.f2t'), desc: t('u.f2d'), core: t('u.f2core'), keys: ta('u.f2keys'), src: t('u.f2src'), takeaway: t('u.tk2') },
    { title: t('u.f3t'), desc: t('u.f3d'), core: t('u.f3core'), keys: ta('u.f3keys'), src: t('u.f3src'), takeaway: t('u.tk3') },
  ]

  useEffect(() => () => { playbackRef.current += 1 }, [])

  const focusPair = (index: number) => {
    playbackRef.current += 1
    pulseControls.stop()
    setPlaying(false)
    setComplete(false)
    setActivePair(index)
    setPhase(5)
    setActiveStep(3)
  }

  const playTransformation = async () => {
    if (playing) return
    const playback = ++playbackRef.current
    setPlaying(true)
    setComplete(false)

    for (let index = 0; index < PAIRS.length; index += 1) {
      if (playback !== playbackRef.current) return
      setActivePair(index)
      setPhase(1)
      setActiveStep(0)
      await wait(140)
      if (playback !== playbackRef.current) return
      setPhase(2)
      setActiveStep(1)
      await wait(180)
      if (playback !== playbackRef.current) return
      setPhase(3)
      setActiveStep(2)
      await pulseControls.start({ scale: [1, 1.1, 1], transition: { duration: 0.22, ease: 'easeOut' } })
      if (playback !== playbackRef.current) return
      setPhase(4)
      setActiveStep(3)
      await wait(180)
      if (playback !== playbackRef.current) return
      setPhase(5)
      setActiveStep(4)
      await wait(260)
    }

    if (playback !== playbackRef.current) return
    setActivePair(null)
    setPhase(0)
    setActiveStep(4)
    setPlaying(false)
    setComplete(true)
  }

  const previewStep = (index: number) => {
    playbackRef.current += 1
    pulseControls.stop()
    setPlaying(false)
    setComplete(index === STEPS.length - 1)
    setActivePair(null)
    setPhase(index + 1)
    setActiveStep(index)
  }

  return (
    <section id="understand" className="scene scene-understand section-pad relative bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="01"
          en="UNDERSTAND"
          title={t('u.title')}
          subtitle={t('u.sub')}
        />

        {/* 交互式生产方式转型 */}
        <div className="relative mt-14">
          <svg className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
            {PAIRS.map((pair, index) => {
              const y = 118 + index * 54
              const focused = activePair === index
              const leftFlow = focused && (phase === 2 || phase === 3 || (!playing && phase === 5))
              const rightFlow = focused && (phase === 4 || phase === 5)
              return (
                <g key={pair.left}>
                  <motion.path
                    d={`M382 ${y} C430 ${y} 445 215 500 215`}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeDasharray="7 7"
                    animate={{ opacity: leftFlow ? 1 : 0, strokeDashoffset: leftFlow ? [22, 0] : 22 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d={`M500 215 C555 215 570 ${y} 618 ${y}`}
                    fill="none"
                    stroke="#0F5BFB"
                    strokeWidth="2"
                    strokeDasharray="7 7"
                    animate={{ opacity: rightFlow ? 1 : 0, strokeDashoffset: rightFlow ? [22, 0] : 22 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                  />
                </g>
              )
            })}
          </svg>

          <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_150px_1fr]">
          {/* 传统 */}
          <Reveal>
            <div className="card h-full overflow-hidden p-7 sm:pr-4">
              <p className="text-[13px] font-bold tracking-[0.2em] text-muted">TRADITIONAL</p>
              <h3 className="mt-2 text-[22px] font-bold text-ink">传统生产模式</h3>
              <div className="mt-5 grid min-h-[330px] grid-cols-1 gap-3 sm:grid-cols-[minmax(165px,.85fr)_minmax(165px,1.15fr)]">
                <div className="space-y-1">
                  {PAIRS.map((pair, index) => (
                    <ModeItem
                      key={pair.left}
                      icon={pair.leftIcon}
                      title={pair.left}
                      desc={pair.leftDesc}
                      side="left"
                      active={activePair === index && (phase === 1 || phase === 2 || (!playing && phase === 5))}
                      dimmed={activePair !== null && activePair !== index}
                      onClick={() => focusPair(index)}
                    />
                  ))}
                </div>
                <motion.div animate={{ opacity: activePair !== null && phase >= 3 ? 0.72 : 0.52 }} className="min-w-0">
                  <TraditionalFactoryScene focus={activePair} />
                </motion.div>
              </div>
            </div>
          </Reveal>

          {/* 中间 AI 转换 */}
          <div className="relative z-20 flex min-h-[250px] flex-col items-center justify-center lg:min-h-[430px]">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <motion.span
                className="absolute h-28 w-28 rounded-full bg-cyan-300/20 blur-xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.48, 0.25] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <AnimatePresence>
                {aiHover && ['感知', '决策', '优化'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ delay: index * 0.04, duration: 0.18 }}
                    className={`absolute rounded-full border border-sky-200 bg-white/95 px-2 py-1 text-[10px] font-semibold text-brand shadow-sm ${index === 0 ? 'left-0 top-4' : index === 1 ? 'right-0 top-4' : 'bottom-0 left-1/2 -translate-x-1/2'}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </AnimatePresence>
              <motion.button
                type="button"
                onClick={playTransformation}
                onMouseEnter={() => setAiHover(true)}
                onMouseLeave={() => setAiHover(false)}
                animate={pulseControls}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-white text-white shadow-[0_12px_30px_rgba(37,99,235,0.32)] ${activePair !== null ? 'ring-4 ring-sky-200/60' : ''}`}
                style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
                aria-label="播放生产方式转型动画"
              >
                {(aiHover || phase === 3) && <span className="pulse-ring absolute inset-0 rounded-full border-2 border-sky-400" />}
                <Brain size={26} />
                <span className="mt-1 text-[12px] font-bold">AI</span>
              </motion.button>
            </div>
            <p className="mt-2 max-w-[140px] text-center text-[11px] leading-relaxed text-muted">
              {playing ? `${t('u.converting')}${activePair !== null ? PAIRS[activePair].left : ''}` : complete ? t('u.replayDone') : t('u.clickAi')}
            </p>
            {complete && (
              <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1 text-[10.5px] font-bold text-teal">
                <Check size={12} /> {t('u.done')}
              </motion.span>
            )}
          </div>

          {/* AI 驱动 */}
          <Reveal delay={0.1}>
            <div className={`card h-full overflow-hidden p-7 sm:pl-4 transition-all duration-500 ${complete ? 'border-brand/35 shadow-[0_18px_50px_rgba(37,99,235,0.13)] brightness-[1.02]' : ''}`}>
              <motion.p animate={{ opacity: complete || playing || activePair !== null ? 1 : 0.48 }} className="text-[13px] font-bold tracking-[0.2em] text-brand">AI POWERED</motion.p>
              <h3 className="mt-2 text-[22px] font-bold text-ink">AI 驱动生产模式</h3>
              <div className="mt-5 grid min-h-[330px] grid-cols-1 gap-3 sm:grid-cols-[minmax(165px,1.15fr)_minmax(165px,.85fr)]">
                <motion.div animate={{ opacity: complete || activePair !== null && phase >= 4 ? 1 : 0.5 }} className="order-2 min-w-0 sm:order-1">
                  <SmartFactoryScene focus={activePair} active={complete || playing && phase >= 4} />
                </motion.div>
                <div className="order-1 space-y-1 sm:order-2">
                {PAIRS.map((pair, index) => {
                  const focused = activePair === index
                  const opacity = complete ? 1 : activePair === null ? 0.42 : focused && phase === 5 ? 1 : focused ? 0.45 : 0.26
                  return (
                  <motion.div
                    key={pair.right}
                    animate={{ opacity, x: focused && phase === 5 ? [8, 0] : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ModeItem
                      icon={pair.rightIcon}
                      title={pair.right}
                      desc={pair.rightDesc}
                      side="right"
                      active={focused && phase === 5}
                      dimmed={false}
                      onClick={() => focusPair(index)}
                    />
                  </motion.div>
                  )
                })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

          {/* 五阶段流程 */}
          <Reveal className="mt-6">
            <div className="card mx-auto flex max-w-5xl items-center justify-between gap-1 p-3">
              {STEPS.map((step, index) => (
                <div key={step} className="flex min-w-0 flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => previewStep(index)}
                    className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-2.5 text-left transition-colors ${activeStep === index ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-sky-50 hover:text-ink'}`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${activeStep === index ? 'bg-brand text-white' : 'bg-slate-100'}`}>{index + 1}</span>
                    <span className="truncate text-[12px] font-semibold">{step}</span>
                  </button>
                  {index < STEPS.length - 1 && <span className="mx-1 text-slate-300">→</span>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 三特征 */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.index} delay={i * 0.1}>
              <FeatureCard feature={f} text={featureTexts[i]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
