import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, User, ScanEye, Clock, CheckCircle2 } from 'lucide-react'
import Reveal from './ui/Reveal'

/* 传统：人工质检场景 */
function TraditionalScene() {
  return (
    <svg viewBox="0 0 800 380" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="380" fill="#F1F5F9" />
      {/* 传送带与产品 */}
      <rect x="0" y="280" width="800" height="60" fill="#E2E8F0" />
      {[90, 250, 410, 570, 720].map((x, i) => (
        <rect key={x} x={x} y="248" width="46" height="32" rx="6" fill="#CBD5E1" />
      ))}
      {/* 质检员 */}
      <g transform="translate(360,120)">
        <circle cx="40" cy="26" r="24" fill="#94A3B8" />
        <rect x="8" y="52" width="64" height="90" rx="20" fill="#94A3B8" />
        {/* 放大镜 */}
        <line x1="86" y1="96" x2="120" y2="130" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
        <circle cx="80" cy="90" r="22" fill="#fff" stroke="#475569" strokeWidth="5" />
      </g>
      <text x="400" y="60" textAnchor="middle" fill="#0F172A" fontSize="20" fontWeight="700">人工检查 · 抽检模式</text>
      <text x="400" y="92" textAnchor="middle" fill="#475569" fontSize="14">耗时 · 易疲劳 · 仅覆盖部分产品</text>
      <g transform="translate(60,120)">
        <Clock size="26" color="#F59E0B" />
        <text x="36" y="18" fill="#475569" fontSize="14">逐个目检，速度受限</text>
      </g>
    </svg>
  )
}

/* AI：机器视觉质检场景 */
function AIScene() {
  return (
    <svg viewBox="0 0 800 380" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="380" fill="#ECFDF5" />
      <rect x="0" y="280" width="800" height="60" fill="#A7F3D0" />
      {[90, 250, 410, 570, 720].map((x, i) => (
        <g key={x}>
          <rect x={x} y="248" width="46" height="32" rx="6" fill="#5EEAD4" />
          <rect x={x - 2} y="238" width="50" height="12" rx="4" fill="none" stroke="#06B6D4" strokeWidth="2" />
        </g>
      ))}
      {/* 摄像头 */}
      <rect x="372" y="120" width="56" height="36" rx="9" fill="#2563EB" />
      <circle cx="400" cy="138" r="9" fill="#0F172A" />
      <line x1="400" y1="80" x2="400" y2="120" stroke="#94A3B8" strokeWidth="5" />
      <path d="M330 160 L470 160 L440 240 L360 240 Z" fill="#06B6D4" opacity="0.14" />
      <text x="400" y="60" textAnchor="middle" fill="#0F172A" fontSize="20" fontWeight="700">机器视觉 · 全量检测</text>
      <text x="400" y="92" textAnchor="middle" fill="#0F766E" fontSize="14">实时识别 · 持续运行 · 覆盖每一件产品</text>
      <g transform="translate(60,120)">
        <CheckCircle2 size="26" color="#14B8A6" />
        <text x="36" y="18" fill="#0F766E" fontSize="14">高速、稳定、可追溯</text>
      </g>
      <g transform="translate(560,120)">
        <rect width="180" height="70" rx="12" fill="#fff" stroke="#5EEAD4" />
        <text x="20" y="30" fill="#0F172A" fontSize="13" fontWeight="700">AI 实时判定</text>
        <text x="20" y="52" fill="#14B8A6" fontSize="13">OK / NG 自动分拣</text>
      </g>
    </svg>
  )
}

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, p)))
  }, [])

  return (
    <div className="mt-20">
      <Reveal>
        <h3 className="text-center text-[26px] font-bold text-ink">生产过程前后对比 · Before / After AI</h3>
        <p className="mt-3 text-center text-[15px] text-body">场景：产品质量检测。拖动中间滑块，对比两种生产方式。</p>
      </Reveal>

      <Reveal className="mt-7">
        <div className="card p-5 sm:p-8">
          {/* 顶部开关 */}
          <div className="mb-4 flex justify-center gap-2">
            <button
              onClick={() => setPos(100)}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-[13.5px] font-semibold text-body"
            >
              <User size={15} /> 传统生产
            </button>
            <button
              onClick={() => setPos(0)}
              className="flex items-center gap-2 rounded-xl bg-teal/12 px-4 py-2 text-[13.5px] font-semibold text-teal"
            >
              <ScanEye size={15} /> AI 生产
            </button>
          </div>

          <div
            ref={ref}
            className="relative select-none overflow-hidden rounded-2xl"
            style={{ height: 'clamp(280px, 42vw, 400px)' }}
            onPointerDown={(e) => {
              dragging.current = true
              ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
              update(e.clientX)
            }}
            onPointerMove={(e) => dragging.current && update(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
          >
            {/* AI 底层 */}
            <div className="absolute inset-0">
              <AIScene />
            </div>
            {/* 传统 顶层（裁剪） */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <TraditionalScene />
            </div>

            {/* 标签 */}
            <span className="absolute left-4 top-4 rounded-lg bg-white/85 px-3 py-1.5 text-[12px] font-bold text-ink backdrop-blur">
              Traditional
            </span>
            <span className="absolute right-4 top-4 rounded-lg bg-teal-600/90 px-3 py-1.5 text-[12px] font-bold text-white">
              AI Powered
            </span>

            {/* 分隔手柄 */}
            <motion.div className="absolute inset-y-0 z-10 w-[3px] bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.12)]" style={{ left: `${pos}%` }}>
              <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg">
                <ChevronLeft size={17} />
                <ChevronRight size={17} className="-ml-2" />
              </span>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
