import { motion } from 'framer-motion'
import {
  MonitorDot,
  Hand,
  Users,
  BrainCircuit,
  Info,
  Cloud,
  Cpu,
  Camera,
  Radio,
  Boxes,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const TIMELINE = [
  {
    year: '2020',
    title: '数字化',
    en: 'Digitalization',
    icon: MonitorDot,
    desc: '业务上云、数据归集，生产过程开始被记录与连接。',
    tags: ['信息化系统', '数据采集'],
  },
  {
    year: '2025',
    title: 'AI 辅助',
    en: 'AI Assistance',
    icon: Hand,
    desc: 'AI 在检测、预测、调度等环节辅助人，提升决策质量。',
    tags: ['机器视觉', '预测模型', '智能助手'],
  },
  {
    year: '2030',
    title: '智能协同',
    en: 'Collaborative Intelligence',
    icon: Users,
    desc: '人机与多智能体协同，跨环节、跨企业实时联动优化。',
    tags: ['AI Agent', '数字孪生', '产业协同网络'],
  },
  {
    year: 'Future',
    title: '自主智能系统',
    en: 'Autonomous Systems',
    icon: BrainCircuit,
    desc: '系统具备自主感知、决策与进化能力，持续创造新价值。',
    tags: ['具身智能', '自主制造', 'AI 科研'],
  },
]

function FutureFactory() {
  return (
    <svg viewBox="0 0 1000 440" className="w-full">
      <rect x="1" y="1" width="998" height="438" rx="20" fill="#F8FAFC" stroke="#E2E8F0" />

      {/* 云 */}
      <g transform="translate(430,30)">
        <Cloud size="64" color="#2563EB" />
        <text x="32" y="84" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">Cloud 云平台</text>
      </g>

      {/* 数字孪生面板 */}
      <g transform="translate(760,120)">
        <Boxes size="34" color="#06B6D4" />
        <rect x="-30" y="40" width="150" height="110" rx="12" fill="#fff" stroke="#06B6D4" strokeWidth="1.6" />
        <text x="45" y="64" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="700">Digital Twin</text>
        <text x="45" y="86" textAnchor="middle" fill="#94A3B8" fontSize="11">数字孪生镜像</text>
        {/* 迷你孪生设备 */}
        {[0, 1, 2].map((i) => (
          <motion.rect key={i} x="-14" y={100 + i * 14} width="120" height="8" rx="4"
            fill={['#2563EB', '#06B6D4', '#14B8A6'][i]}
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </g>

      {/* AI 核心服务器 */}
      <g transform="translate(90,120)">
        <rect width="130" height="120" rx="16" fill="#0F172A" />
        <Cpu size="30" color="#06B6D4" x="50" y="20" />
        <text x="65" y="76" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">AI 核心</text>
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx={30 + i * 35} cy="100" r="4" fill="#14B8A6"
            animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </g>

      {/* 车间地面 */}
      <rect x="40" y="330" width="920" height="70" rx="14" fill="#E2E8F0" />
      <rect x="300" y="350" width="400" height="26" rx="13" fill="#CBD5E1" />

      {/* 机器人 */}
      {[220, 500, 700].map((x, i) => (
        <g key={x} transform={`translate(${x},250)`}>
          <rect x="-14" y="70" width="28" height="20" rx="5" fill="#64748B" />
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: '0px 70px' }}
            animate={{ rotate: i % 2 ? [18, -18, 18] : [-18, 18, -18] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="-7" y="10" width="14" height="62" rx="6" fill="#2563EB" />
            <rect x="-12" y="-6" width="24" height="18" rx="6" fill="#06B6D4" />
          </motion.g>
        </g>
      ))}

      {/* 摄像头与传感器 */}
      <g transform="translate(360,250)">
        <Camera size="26" color="#2563EB" />
      </g>
      <g transform="translate(620,250)">
        <Radio size="26" color="#14B8A6" />
      </g>

      {/* 数据流连接 */}
      <g strokeWidth="1.8" fill="none">
        <line x1="155" y1="150" x2="430" y2="80" stroke="#2563EB" className="flow-line" />
        <line x1="494" y1="80" x2="800" y2="150" stroke="#06B6D4" className="flow-line" />
        <line x1="155" y1="240" x2="220" y2="320" stroke="#14B8A6" className="flow-line" />
        <line x1="835" y1="230" x2="700" y2="320" stroke="#06B6D4" className="flow-line" />
        <line x1="500" y1="110" x2="500" y2="340" stroke="#3B82F6" className="flow-line" />
      </g>

      <text x="500" y="318" textAnchor="middle" fill="#475569" fontSize="12">
        Robot · Camera · Sensor · AI · Cloud · Digital Twin 实时数据互联
      </text>
    </svg>
  )
}

export default function Future() {
  return (
    <section id="future" className="section-pad bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="05"
          en="FUTURE"
          title="未来的生产力，将更加智能"
          subtitle="从数字化到 AI 辅助，再到智能协同与自主系统，生产方式持续演进。"
        />

        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-brand/8 px-4 py-2 text-[12.5px] font-semibold text-brand">
            <Info size={15} /> 概念性未来趋势展示，非确定性预测
          </span>
        </Reveal>

        {/* 时间轴 */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[26px] hidden h-[2px] bg-line lg:block" />
          <motion.div
            className="absolute left-0 top-[26px] hidden h-[2px] bg-gradient-to-r from-brand to-cyan lg:block"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <div className="grid gap-8 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.12}>
                <div>
                  <motion.span
                    className="relative z-10 mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-brand bg-white text-brand lg:mx-0"
                    whileInView={{ scale: [0.7, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.25, duration: 0.6 }}
                  >
                    <t.icon size={23} />
                  </motion.span>
                  <div className="card card-hover mt-5 p-6">
                    <p className="text-[13px] font-bold tracking-[0.16em] text-brand">{t.year}</p>
                    <h4 className="mt-2 text-[19px] font-bold text-ink">{t.title}</h4>
                    <p className="mt-1 text-[11px] font-semibold tracking-widest text-muted">{t.en}</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-body">{t.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {t.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-canvas-2 px-2 py-1 text-[11.5px] text-body">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 未来智能工厂 */}
        <Reveal className="mt-14">
          <h3 className="text-[24px] font-bold text-ink">未来智能工厂 · 自主互联的生产系统</h3>
        </Reveal>
        <Reveal className="mt-6">
          <FutureFactory />
        </Reveal>
      </div>
    </section>
  )
}
