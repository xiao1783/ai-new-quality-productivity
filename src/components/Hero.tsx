import { useEffect, useState } from 'react'
import { ArrowRight, BarChart3, BadgeCheck, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import AICoreGraph from './AICoreGraph'
import { HERO_STATS, HERO_STATS_SOURCE } from '@/data/realData'

const HERO_ICONS = { users: Users, trend: TrendingUp, badge: BadgeCheck } as const

export default function Hero() {
  const [hintOpacity, setHintOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () => setHintOpacity(Math.max(0, 1 - window.scrollY / 140))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero-scene relative flex min-h-screen items-center overflow-hidden">
      <div
        className="hero-photo absolute inset-0"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/scenes/ai-city-campus.webp)` }}
        aria-hidden="true"
      />
      {/* 背景：网格 + 光晕 */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-brand/10 blur-[130px]" />
      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[130px]" />
      <div className="hero-city absolute inset-x-0 bottom-0 h-[45%]" aria-hidden="true" />

      <div className="container-x relative z-10 grid items-center gap-10 pt-28 pb-24 lg:grid-cols-[45%_55%]">
        {/* 左侧文案 */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip"
          >
            AI × NEW QUALITY PRODUCTIVITY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 font-bold leading-[1.08] tracking-tight text-ink"
            style={{ fontSize: 'clamp(44px, 5.2vw, 76px)' }}
          >
            <span className="text-gradient">人工智能</span>
            <br />
            正在重新定义
            <br />
            <span className="text-gradient">生产力</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-[520px] text-[17px] leading-[1.85] text-body"
          >
            从算法、数据与算力，到研发、制造、能源与服务，人工智能正在从「数字工具」成长为推动生产方式变革的重要力量。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button className="btn btn-primary" onClick={() => go('understand')}>
              开始探索 <ArrowRight size={17} />
            </button>
            <button className="btn btn-ghost" onClick={() => go('dashboard')}>
              <BarChart3 size={17} /> 查看数据
            </button>
          </motion.div>

          {/* 关键指标（真实数据） */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 grid max-w-[590px] gap-3 sm:grid-cols-3"
          >
            {HERO_STATS.map((c) => {
              const Icon = HERO_ICONS[c.icon]
              return (
                <div key={c.label} className="hero-metric flex items-center gap-3 rounded-2xl p-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/8 text-brand">
                    <Icon size={19} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[22px] font-bold leading-none text-ink">{c.value}</span>
                    <span className="mt-1.5 text-[12.5px] text-muted">{c.label}</span>
                  </span>
                </div>
              )
            })}
          </motion.div>
          <p className="mt-3 max-w-[560px] text-[11px] leading-relaxed tracking-wide text-muted">* {HERO_STATS_SOURCE}</p>
        </div>

        {/* 右侧引擎 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="hero-core relative mx-auto aspect-square w-full max-w-[680px]"
        >
          <AICoreGraph />
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: hintOpacity }}
      >
        <p className="text-[10.5px] font-semibold tracking-[0.34em] text-muted">SCROLL TO EXPLORE</p>
        <span className="mx-auto mt-2 block h-9 w-[1.5px] overflow-hidden bg-line">
          <motion.span
            className="block h-4 w-full bg-gradient-to-b from-brand to-cyan"
            animate={{ y: [-16, 36] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  )
}
