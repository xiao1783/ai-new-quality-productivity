import { motion } from 'framer-motion'
import {
  Lightbulb,
  Scale,
  MessagesSquare,
  Compass,
  Calculator,
  Search,
  TrendingUp,
  Workflow,
  Plus,
  Equal,
  Sparkles,
  User,
  Cpu,
} from 'lucide-react'
import Reveal from './ui/Reveal'

const HUMAN = [
  { icon: Lightbulb, t: '创造' },
  { icon: Scale, t: '判断' },
  { icon: MessagesSquare, t: '沟通' },
  { icon: Compass, t: '价值决策' },
]

const AI = [
  { icon: Calculator, t: '计算' },
  { icon: Search, t: '搜索' },
  { icon: TrendingUp, t: '预测' },
  { icon: Workflow, t: '自动化' },
]

export default function HumanAI() {
  return (
    <div className="mt-20">
      <Reveal>
        <h3 className="text-center text-[26px] font-bold text-ink">Human × AI</h3>
        <p className="mt-3 text-center text-[16px] text-body">AI 的价值，不只是「替代」—— 而是放大人的能力。</p>
      </Reveal>

      <Reveal className="mt-9">
        <div className="card p-7 sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
            {/* 人 */}
            <div className="rounded-2xl bg-canvas p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <User size={21} />
                </span>
                <div>
                  <p className="text-[18px] font-bold text-ink">人 · Human</p>
                  <p className="text-[12px] text-muted">强化创造与决策</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {HUMAN.map((k, i) => (
                  <motion.div
                    key={k.t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-3 text-[14px] font-medium text-ink"
                  >
                    <k.icon size={16} className="text-brand" /> {k.t}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 中间符号 */}
            <div className="flex items-center justify-center gap-4 lg:flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-ink">
                <Plus size={22} />
              </span>
              <motion.span
                className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]"
                style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <Sparkles size={28} />
              </motion.span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-ink">
                <Equal size={22} />
              </span>
            </div>

            {/* AI */}
            <div className="rounded-2xl bg-canvas p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <Cpu size={21} />
                </span>
                <div>
                  <p className="text-[18px] font-bold text-ink">AI · 机器</p>
                  <p className="text-[12px] text-muted">承担重复计算</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {AI.map((k, i) => (
                  <motion.div
                    key={k.t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15 }}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-3 text-[14px] font-medium text-ink"
                  >
                    <k.icon size={16} className="text-cyan" /> {k.t}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[15px] text-muted">机器承担重复计算，人类强化创造与决策</p>
            <motion.p
              className="mt-3 text-[26px] font-bold sm:text-[32px]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Human + AI = <span className="text-gradient">Augmented Productivity</span>
            </motion.p>
            <p className="mt-2 text-[14px] text-body">人机协同，形成增强型生产力。</p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
