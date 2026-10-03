import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Logo from './Logo'
import { DATA_SOURCES } from '@/data/realData'

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

        {/* 数据来源 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-20 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-left backdrop-blur sm:p-9"
        >
          <p className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-cyan-300">
            <BookOpen size={14} /> DATA SOURCES · 数据来源
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
            本站各展区图表的关键数据，均来自以下权威机构公开发布的报告与统计公报：
          </p>
          <ul className="mt-5 grid gap-x-10 gap-y-2.5 text-[12.5px] leading-relaxed text-slate-300 sm:grid-cols-2">
            {DATA_SOURCES.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-slate-500">
            以上数据仅用于教学可视化展示；「AI 生产力模拟器」与「AI 实验室」为前端交互模拟实验，不构成任何统计结论；产业智能化热力图与三模式雷达图为编者综合公开资料整理的概念模型。
          </p>
        </motion.div>

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
