import { useEffect, useState } from 'react'
import { ArrowRight, BarChart3, Gauge, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import AICoreGraph from './AICoreGraph'

const CONCEPT = [
  { icon: Gauge, value: '50%+', label: '效率提升潜力' },
  { icon: Users, value: '24/7', label: '智能连续生产' },
  { icon: Sparkles, value: 'N×', label: '创新迭代速度' },
]

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
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* 背景：网格 + 光晕 */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-brand/10 blur-[130px]" />
      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[130px]" />

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

          {/* 概念指标 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 flex gap-8"
          >
            {CONCEPT.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/8 text-brand">
                  <c.icon size={19} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[22px] font-bold leading-none text-ink">{c.value}</span>
                  <span className="mt-1.5 text-[12.5px] text-muted">{c.label}</span>
                </span>
              </div>
            ))}
          </motion.div>
          <p className="mt-3 text-[11px] tracking-wide text-muted">* 以上为概念性指标，用于表达方向，非真实统计数据</p>
        </div>

        {/* 右侧引擎 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[680px]"
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
