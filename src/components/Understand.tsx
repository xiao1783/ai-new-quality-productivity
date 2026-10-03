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

const TRANSFORM_PAIRS = [
  { leftIcon: User, left: '人工经验', leftDesc: '判断依赖个人经历', rightIcon: Database, right: '数据驱动', rightDesc: '以实时数据支持判断' },
  { leftIcon: Repeat, left: '重复劳动', leftDesc: '大量操作依靠人工', rightIcon: Brain, right: '智能决策', rightDesc: '模型辅助快速决策' },
  { leftIcon: Workflow, left: '固定流程', leftDesc: '单一路径难以适应变化', rightIcon: RefreshCw, right: '自主优化', rightDesc: '根据反馈动态调整流程' },
  { leftIcon: Unplug, left: '信息孤岛', leftDesc: '设备与系统彼此割裂', rightIcon: Network, right: '实时协同', rightDesc: '设备、数据与人员互联' },
  { leftIcon: TrendingUp, left: '线性增长', leftDesc: '增长依赖资源持续投入', rightIcon: Rocket, right: '创新增长', rightDesc: '以智能放大创新效率' },
]

const STEPS = ['传统生产', '数据接入', 'AI 分析', '智能决策', '智能生产']

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
  const circumference = 2 * Math.PI * 32
  return (
    <div className="relative flex h-[104px] items-center justify-center" role="img" aria-label="全球灯塔工厂中国占比 42%（85 / 201 家）">
      <svg viewBox="0 0 88 88" className="h-[92px] w-[92px] -rotate-90">
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
      <div className="absolute text-center">
        <span className="block text-[22px] font-bold leading-none text-teal">42%</span>
        <span className="mt-1 block text-[8.5px] font-semibold text-muted">灯塔工厂中国占比</span>
      </div>
      <span className="absolute right-2 top-2 rounded-full bg-teal/8 px-2 py-1 text-[9px] font-semibold text-teal">WEF 2025.10</span>
    </div>
  )
}

function TraditionalFactoryScene({ focus }: { focus: number | null }) {
  const isolated = focus === 3
  const fixed = focus === 2
  const human = focus === 0

  return (
    <svg viewBox="0 0 220 210" className="h-full w-full" role="img" aria-label="传统工厂示意">
      <defs>
        <linearGradient id="tf-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2F6FA" />
          <stop offset="1" stopColor="#DEE7F0" />
        </linearGradient>
      </defs>

      {/* 厂房主体 */}
      <path d="M18 168V74l38 18V66l42 22V46h72v122Z" fill="url(#tf-body)" stroke="#B7C4D4" strokeWidth="2" strokeLinejoin="round" />
      {/* 烟囱与烟气 */}
      <rect x="150" y="28" width="13" height="20" rx="2" fill="#C2CEDB" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={156}
          cy={24}
          r={2.6 + i * 0.9}
          fill="#B6C3D2"
          animate={{ cy: [24, 6], cx: [156, 164 + i * 3], opacity: [0.55, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: 'easeOut' }}
        />
      ))}
      {/* 侧窗：一盏灯光不稳 */}
      <rect x="28" y="86" width="16" height="13" rx="2" fill="#CBD5E1" />
      <motion.rect x="28" y="106" width="16" height="13" rx="2" fill="#FCD34D" animate={{ opacity: [0.2, 0.85, 0.2] }} transition={{ duration: 2.1, repeat: Infinity }} />

      {/* 孤岛设备节点 */}
      {[64, 112, 164].map((x, index) => (
        <g key={x}>
          {isolated && (
            <motion.circle cx={x} cy="72" r="7" fill="none" stroke="#F59E0B" strokeWidth="1.5" animate={{ scale: [1, 1.9], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.25 }} style={{ transformOrigin: `${x}px 72px` }} />
          )}
          <circle cx={x} cy="72" r="7" fill={isolated ? '#F59E0B' : '#94A3B8'} />
          <rect x={x - 3.5} y="69" width="7" height="6" rx="1" fill="#fff" opacity=".85" />
          {index < 2 && (
            <motion.path
              d={`M${x + 7} 72 H${[112, 164][index] - 7}`}
              stroke="#94A3B8"
              strokeWidth="2"
              strokeDasharray="4 5"
              animate={{ opacity: isolated ? 0.12 : 0.75 }}
            />
          )}
        </g>
      ))}

      {/* 断续的数据流 */}
      <motion.path
        d={fixed ? 'M34 126 H184' : 'M34 126 C72 105 104 145 184 112'}
        fill="none"
        stroke={fixed ? '#64748B' : '#A8B6C8'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={fixed ? '0' : '5 7'}
        animate={fixed ? { pathLength: 1 } : { pathLength: 1, strokeDashoffset: [0, -24] }}
        transition={fixed ? { duration: 0.4 } : { strokeDashoffset: { duration: 1.8, repeat: Infinity, ease: 'linear' } }}
      />

      {/* 传送带 */}
      <rect x="26" y="152" width="168" height="16" rx="8" fill="#C9D4E0" />
      {[42, 76, 110, 144, 178].map((x) => (
        <circle key={x} cx={x} cy="160" r="4.5" fill="#E5ECF3" stroke="#93A6B9" strokeWidth="1.5" />
      ))}
      <motion.path d="M34 156h150" stroke="#8FA3B6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 9" animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} />

      {/* 在制品：一件轻微倾斜并告警 */}
      {[[42, 0], [78, 0], [150, 0]].map(([x]) => (
        <g key={x}>
          <rect x={x} y="134" width="22" height="17" rx="3" fill="#CBD5E1" stroke="#AAB9C8" />
          <path d={`M${x + 5} 140h12M${x + 5} 145h8`} stroke="#AAB9C8" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <motion.g animate={{ rotate: [-6, -2, -6] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '125px 151px' }}>
        <rect x="114" y="134" width="22" height="17" rx="3" fill="#F1F5F9" stroke="#F59E0B" strokeWidth="1.5" />
        <path d="M119 140h12M119 145h8" stroke="#D9A24A" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* 工人 */}
      <motion.g animate={human ? { scale: 1.08 } : { scale: 1 }} style={{ transformOrigin: '48px 145px' }}>
        <circle cx="48" cy="106" r="9" fill={human ? '#2563EB' : '#9FB0C2'} />
        <path d="M48 115v18" stroke={human ? '#2563EB' : '#7E93A8'} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M48 133l-7 12M48 133l7 12" stroke={human ? '#2563EB' : '#7E93A8'} strokeWidth="4" strokeLinecap="round" />
        <path d="M48 119l-10 6" stroke={human ? '#2563EB' : '#7E93A8'} strokeWidth="3.5" strokeLinecap="round" />
        <rect x="30" y="123" width="11" height="9" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" />
        <motion.path
          d="M48 119l11 5"
          stroke={human ? '#2563EB' : '#7E93A8'}
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={{ rotate: [0, -22, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '48px 119px' }}
        />
      </motion.g>

      <text x="110" y="196" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">传统工厂 · 分散设备与人工流程</text>
    </svg>
  )
}

function SmartFactoryScene({ focus, active }: { focus: number | null; active: boolean }) {
  const networked = focus === 3 || active
  const optimize = focus === 2
  const flowD = optimize ? 'M36 146 C78 118 115 158 183 112' : 'M36 146 C76 146 93 122 121 128 S162 146 184 118'

  return (
    <svg viewBox="0 0 220 210" className="h-full w-full" role="img" aria-label="智能工厂示意">
      <defs>
        <linearGradient id="sf-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4FBFF" />
          <stop offset="1" stopColor="#E0F1FD" />
        </linearGradient>
        <linearGradient id="sf-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* 厂房 */}
      <rect x="19" y="47" width="182" height="122" rx="15" fill="url(#sf-glass)" stroke="#A8D7F3" strokeWidth="2" />

      {/* 顶部感知节点与网络 */}
      {[69, 119, 169].map((x, i) => (
        <g key={x}>
          <motion.circle cx={x} cy="32" r="9" fill="#14B8A6" animate={{ opacity: networked ? [0.14, 0.32, 0.14] : 0.1 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }} />
          <circle cx={x} cy="32" r="5.5" fill="#14B8A6" />
          <circle cx={x} cy="32" r="2" fill="#fff" opacity=".9" />
        </g>
      ))}
      <motion.path
        d="M69 32H169M69 38V56M119 38V120M169 38V122M69 40 52 58"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="2"
        strokeDasharray="5 5"
        animate={{ opacity: networked ? 1 : 0.32, strokeDashoffset: networked ? [0, -20] : 0 }}
        transition={{ opacity: { duration: 0.6 }, strokeDashoffset: networked ? { duration: 1.4, repeat: Infinity, ease: 'linear' } : { duration: 0.3 } }}
      />

      {/* 数据看板 */}
      <g>
        <rect x="34" y="58" width="58" height="44" rx="7" fill="#fff" stroke="#BFDBFE" strokeWidth="1.5" />
        <path d="M40 72h10M40 78h14" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <motion.path
          d="M40 96 50 86l8 6 14-15"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
        />
        <motion.circle cx="72" cy="77" r="2.5" fill="#06B6D4" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} />
      </g>

      {/* 主流程 */}
      <motion.path
        d={flowD}
        fill="none"
        stroke="url(#sf-flow)"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ pathLength: active || optimize ? [0.35, 1] : 1, opacity: active || optimize ? 1 : 0.65 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
      <motion.circle r="3" fill="#06B6D4" animate={{ opacity: networked ? 1 : 0 }}>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={flowD} />
      </motion.circle>
      <motion.circle r="2" fill="#2563EB" animate={{ opacity: networked ? 1 : 0 }}>
        <animateMotion dur="3.1s" repeatCount="indefinite" path={flowD} />
      </motion.circle>

      {/* 视觉扫描门 */}
      <motion.g animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.6, repeat: Infinity }}>
        <path d="M96 118v-9M114 118v-9M96 109h18" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* 机械臂 */}
      <g>
        <rect x="150" y="128" width="30" height="9" rx="4" fill="#2563EB" />
        <motion.g animate={{ rotate: [0, 12, 0, -8, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '165px 128px' }}>
          <path d="M165 128V98" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
          <motion.g animate={{ rotate: [-18, 26, -18] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '165px 98px' }}>
            <path d="M165 98l24 10" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
            <circle cx="191" cy="109" r="4" fill="#0EA5E9" />
          </motion.g>
          <circle cx="165" cy="98" r="5" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" />
        </motion.g>
      </g>

      {/* AGV */}
      <motion.g animate={{ x: [0, 30, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="44" y="148" width="40" height="16" rx="6" fill="#0EA5E9" />
        <rect x="49" y="142" width="18" height="8" rx="3" fill="#BAE6FD" />
        <motion.circle cx="84" cy="145" r="2.5" fill="#F59E0B" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }} />
        <circle cx="53" cy="165" r="3.5" fill="#334155" />
        <circle cx="76" cy="165" r="3.5" fill="#334155" />
      </motion.g>

      <text x="110" y="196" textAnchor="middle" fill="#0F5BFB" fontSize="11" fontWeight="700">智能工厂 · 互联设备与动态流程</text>
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
    title: '高科技',
    core: '技术密度',
    desc: '以人工智能、数据与算力为核心，推动技术密度持续提升。',
    visual: 'technology' as const,
    keywords: ['AI', 'DATA', 'COMPUTING'],
    color: '#2563EB',
    glow: 'rgba(37,99,235,.075)',
    source: '2014–2023 年全球生成式AI专利申请中中国约占 70% · WIPO（2024.7）',
  },
  {
    index: '02',
    icon: Zap,
    en: 'EFFICIENCY',
    title: '高效能',
    core: '协同效率',
    desc: '智能决策与自动化协同，让全要素生产率持续提高。',
    visual: 'efficiency' as const,
    keywords: ['实时', '协同', '优化'],
    color: '#06B6D4',
    glow: 'rgba(6,182,212,.075)',
    source: '2025 年中国全员劳动生产率 184,413 元/人，同比 +6.1% · 国家统计局（2026.2）',
  },
  {
    index: '03',
    icon: BadgeCheck,
    en: 'QUALITY',
    title: '高质量',
    core: '质量稳定性',
    desc: '从规模扩张转向创新驱动，发展更加可靠、持续。',
    visual: 'quality' as const,
    keywords: ['可靠', '可持续', '高标准'],
    color: '#14B8A6',
    glow: 'rgba(20,184,166,.075)',
    source: '全球灯塔工厂 201 家中中国占 85 家（42%），居全球首位 · WEF（2025.10）',
  },
]

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
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
        <h4 className="text-[19px] font-bold leading-none text-ink">{feature.title}</h4>
        <p className="mt-3 min-h-[44px] text-[13.5px] leading-relaxed text-body">{feature.desc}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-wide text-muted">核心概念</span>
          <span className="text-[14px] font-bold" style={{ color: feature.color }}>{feature.core}</span>
        </div>
      </div>

      <div className="relative mt-5 h-[104px] rounded-2xl border border-slate-100 bg-white/55 px-2">
        {feature.visual === 'technology' && <TechnologyVisual active={hovered} />}
        {feature.visual === 'efficiency' && <EfficiencyVisual active={hovered} />}
        {feature.visual === 'quality' && <QualityVisual active={hovered} />}
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        {feature.keywords.map((keyword, index) => (
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

      <SourceNote className="mt-3">{feature.source}</SourceNote>
    </motion.div>
  )
}

export default function Understand() {
  const [activePair, setActivePair] = useState<number | null>(null)
  const [phase, setPhase] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [complete, setComplete] = useState(false)
  const [aiHover, setAiHover] = useState(false)
  const playbackRef = useRef(0)
  const pulseControls = useAnimationControls()

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

    for (let index = 0; index < TRANSFORM_PAIRS.length; index += 1) {
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
          title="什么是新质生产力？"
          subtitle="它并不是简单的「机器变快了」，而是技术、生产要素与产业结构共同发生改变。"
        />

        {/* 交互式生产方式转型 */}
        <div className="relative mt-14">
          <svg className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
            {TRANSFORM_PAIRS.map((pair, index) => {
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
            <div className="card h-full overflow-hidden p-7">
              <p className="text-[13px] font-bold tracking-[0.2em] text-muted">TRADITIONAL</p>
              <h3 className="mt-2 text-[22px] font-bold text-ink">传统生产模式</h3>
              <div className="mt-5 grid min-h-[330px] grid-cols-1 gap-3 sm:grid-cols-[minmax(175px,.9fr)_minmax(150px,1.1fr)]">
                <div className="space-y-1">
                  {TRANSFORM_PAIRS.map((pair, index) => (
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
              {playing ? `正在转化：${activePair !== null ? TRANSFORM_PAIRS[activePair].left : ''}` : complete ? '转型完成 · 点击可重播' : '点击 AI 查看生产方式转型'}
            </p>
            {complete && (
              <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1 text-[10.5px] font-bold text-teal">
                <Check size={12} /> 转型完成
              </motion.span>
            )}
          </div>

          {/* AI 驱动 */}
          <Reveal delay={0.1}>
            <div className={`card h-full overflow-hidden p-7 transition-all duration-500 ${complete ? 'border-brand/35 shadow-[0_18px_50px_rgba(37,99,235,0.13)] brightness-[1.02]' : ''}`}>
              <motion.p animate={{ opacity: complete || playing || activePair !== null ? 1 : 0.48 }} className="text-[13px] font-bold tracking-[0.2em] text-brand">AI POWERED</motion.p>
              <h3 className="mt-2 text-[22px] font-bold text-ink">AI 驱动生产模式</h3>
              <div className="mt-5 grid min-h-[330px] grid-cols-1 gap-3 sm:grid-cols-[minmax(175px,.9fr)_minmax(150px,1.1fr)]">
                <div className="space-y-1">
                {TRANSFORM_PAIRS.map((pair, index) => {
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
                <motion.div animate={{ opacity: complete || activePair !== null && phase >= 4 ? 1 : 0.5 }} className="min-w-0">
                  <SmartFactoryScene focus={activePair} active={complete || playing && phase >= 4} />
                </motion.div>
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
            <Reveal key={f.title} delay={i * 0.1}>
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
