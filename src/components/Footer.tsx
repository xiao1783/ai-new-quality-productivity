import { motion } from 'framer-motion'
import Logo from './Logo'

const WORDS = ['效率', '创新', '协同', '未来']

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1220] text-white">
      <div className="bg-grid absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />

      <div className="container-x relative z-10 py-28 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.42em' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[13px] font-bold text-cyan-300"
        >
          AI × PRODUCTIVITY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-8 max-w-[900px] font-bold leading-[1.2]"
          style={{ fontSize: 'clamp(32px, 4.4vw, 56px)' }}
        >
          技术的价值，
          <br />
          最终在于<span className="text-gradient">创造新的可能</span>。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-[640px] text-[16px] leading-[1.9] text-slate-300"
        >
          人工智能正在从一种工具，转变为能够重构生产过程、创新方式与产业结构的重要力量。
        </motion.p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-3.5 text-[16px] font-semibold tracking-[0.2em] text-slate-100 backdrop-blur"
            >
              {w}
            </motion.span>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
          <div className="flex items-center gap-3">
            <Logo size={34} />
            <span className="text-[17px] font-bold tracking-wide">智启新质</span>
          </div>
          <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-400">
            AI × NEW QUALITY PRODUCTIVE FORCES
          </p>
          <p className="text-[12px] text-slate-500">2026 · 大学课程作业 · 教学可视化数字展馆</p>
        </div>
      </div>
    </footer>
  )
}
