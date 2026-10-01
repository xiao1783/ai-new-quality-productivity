import { motion } from 'framer-motion'

const wrap = (children: React.ReactNode) => (
  <svg viewBox="0 0 620 300" className="h-auto w-full">
    <rect x="1" y="1" width="618" height="298" rx="18" fill="#F8FAFC" stroke="#E2E8F0" />
    {children}
  </svg>
)

/* 制造：AI 视觉质检流水线 */
export function ManufacturingScene() {
  return wrap(
    <>
      <text x="28" y="40" fill="#0F172A" fontSize="14" fontWeight="700">AI 视觉质检 · 流水线</text>
      {/* 传送带 */}
      <rect x="40" y="200" width="420" height="26" rx="13" fill="#E2E8F0" />
      <motion.g
        animate={{ x: [-60, 420] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 150},0)`}>
            <rect x="40" y="172" width="40" height="28" rx="6" fill="#CBD5E1" />
            {i === 1 && <circle cx="60" cy="186" r="4" fill="#F43F5E" />}
          </g>
        ))}
      </motion.g>
      {/* 摄像头 */}
      <g>
        <line x1="250" y1="70" x2="250" y2="120" stroke="#94A3B8" strokeWidth="4" />
        <rect x="226" y="118" width="48" height="30" rx="8" fill="#2563EB" />
        <circle cx="250" cy="133" r="7" fill="#0F172A" />
        <motion.path d="M220 150 L280 150 L268 172 L232 172 Z" fill="#06B6D4" opacity="0.16"
          animate={{ opacity: [0.08, 0.26, 0.08] }} transition={{ duration: 1.6, repeat: Infinity }} />
      </g>
      {/* AI 模型 */}
      <g transform="translate(490,90)">
        <rect width="104" height="92" rx="14" fill="#fff" stroke="#2563EB" strokeWidth="1.6" />
        <text x="52" y="28" textAnchor="middle" fill="#2563EB" fontSize="12" fontWeight="700">AI 模型</text>
        <motion.text x="52" y="56" textAnchor="middle" fill="#F43F5E" fontSize="13" fontWeight="700"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
          缺陷识别
        </motion.text>
        <text x="52" y="76" textAnchor="middle" fill="#94A3B8" fontSize="10">自动分拣</text>
      </g>
      <motion.line x1="274" y1="133" x2="488" y2="130" stroke="#06B6D4" strokeWidth="1.6" className="flow-line" />
    </>,
  )
}

/* 交通：智能调度 */
export function TransportScene() {
  return wrap(
    <>
      <text x="28" y="40" fill="#0F172A" fontSize="14" fontWeight="700">智能交通调度 · 自适应信号</text>
      {/* 道路 */}
      <rect x="60" y="110" width="380" height="90" fill="#E2E8F0" />
      <line x1="60" y1="155" x2="440" y2="155" stroke="#fff" strokeWidth="3" strokeDasharray="18 14" />
      {[120, 220, 320].map((x, i) => (
        <motion.g key={x} animate={{ x: [-120, 420] }} transition={{ duration: 3.2 + i, repeat: Infinity, ease: 'linear' }}>
          <rect x={x} y="126" width="30" height="18" rx="5" fill={['#2563EB', '#06B6D4', '#14B8A6'][i]} />
        </motion.g>
      ))}
      {/* 红绿灯 */}
      <g transform="translate(420,70)">
        <rect x="0" y="0" width="22" height="66" rx="6" fill="#0F172A" />
        <motion.circle cx="11" cy="14" r="6" fill="#22C55E" animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 3, repeat: Infinity }} />
        <circle cx="11" cy="34" r="6" fill="#F59E0B" opacity="0.3" />
        <circle cx="11" cy="53" r="6" fill="#EF4444" opacity="0.3" />
      </g>
      <g transform="translate(480,96)">
        <rect width="112" height="110" rx="14" fill="#fff" stroke="#06B6D4" strokeWidth="1.6" />
        <text x="56" y="28" textAnchor="middle" fill="#06B6D4" fontSize="12" fontWeight="700">AI 预测</text>
        {[0, 1, 2].map((i) => (
          <motion.rect key={i} x="18" y={46 + i * 18} width={76 - i * 14} height="9" rx="4.5"
            fill={['#2563EB', '#06B6D4', '#14B8A6'][i]}
            style={{ transformOrigin: '18px center' }}
            animate={{ scaleX: [0.55, 1, 0.55] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />
        ))}
      </g>
    </>,
  )
}

/* 医疗：影像辅助 */
export function MedicalScene() {
  return wrap(
    <>
      <text x="28" y="40" fill="#0F172A" fontSize="14" fontWeight="700">AI 影像辅助诊断</text>
      <g transform="translate(50,66)">
        <rect width="200" height="190" rx="16" fill="#0F172A" />
        {/* 模拟肺部影像 */}
        <path d="M70 30 Q40 70 55 150 Q80 165 92 120 Q104 165 130 150 Q145 70 115 30 Q100 22 92 40 Q84 22 70 30 Z" fill="#334155" />
        <motion.rect x="55" y="60" width="34" height="34" rx="6" fill="none" stroke="#06B6D4" strokeWidth="2.4"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }} />
      </g>
      <motion.line x1="252" y1="160" x2="330" y2="160" stroke="#06B6D4" strokeWidth="1.8" className="flow-line" />
      <g transform="translate(336,96)">
        <rect width="240" height="132" rx="16" fill="#fff" stroke="#E2E8F0" />
        <text x="24" y="36" fill="#0F172A" fontSize="14" fontWeight="700">模型分析结果</text>
        <text x="24" y="66" fill="#475569" fontSize="12.5">检出可疑结节 · 1 处</text>
        <text x="24" y="92" fill="#475569" fontSize="12.5">置信度</text>
        <rect x="92" y="82" width="120" height="8" rx="4" fill="#E2E8F0" />
        <motion.rect x="92" y="82" width="120" height="8" rx="4" fill="#06B6D4"
          initial={{ width: 0 }} whileInView={{ width: 108 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
        <text x="24" y="116" fill="#F43F5E" fontSize="12" fontWeight="700">建议：进一步检查（辅助诊断，非最终结论）</text>
      </g>
    </>,
  )
}

/* 农业：无人机 + 精准农业 */
export function AgricultureScene() {
  return wrap(
    <>
      <text x="28" y="40" fill="#0F172A" fontSize="14" fontWeight="700">智慧农业 · 无人机巡田</text>
      {/* 田垄 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="40" y={120 + i * 32} width="400" height="16" rx="8" fill={i % 2 ? '#BBF7D0' : '#86EFAC'} />
      ))}
      {/* 无人机 */}
      <motion.g animate={{ x: [60, 380, 60], y: [78, 66, 78] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="-18" y="-6" width="36" height="14" rx="6" fill="#2563EB" />
        <line x1="-34" y1="0" x2="-18" y2="0" stroke="#475569" strokeWidth="3" />
        <line x1="18" y1="0" x2="34" y2="0" stroke="#475569" strokeWidth="3" />
        <motion.ellipse cx="-34" cy="0" rx="8" ry="3" fill="#06B6D4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.4, repeat: Infinity }} />
        <motion.ellipse cx="34" cy="0" rx="8" ry="3" fill="#06B6D4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.4, repeat: Infinity }} />
      </motion.g>
      <g transform="translate(470,110)">
        <rect width="120" height="96" rx="14" fill="#fff" stroke="#14B8A6" strokeWidth="1.6" />
        <text x="60" y="30" textAnchor="middle" fill="#14B8A6" fontSize="12" fontWeight="700">图像识别</text>
        <text x="60" y="56" textAnchor="middle" fill="#475569" fontSize="11.5">病虫害区域</text>
        <text x="60" y="78" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="700">精准变量作业</text>
      </g>
    </>,
  )
}

/* 能源：风光 + 电网调度 */
export function EnergyScene() {
  return wrap(
    <>
      <text x="28" y="40" fill="#0F172A" fontSize="14" fontWeight="700">智能能源调度 · 风光储协同</text>
      {/* 风机 */}
      <g transform="translate(110,180)">
        <rect x="-5" y="-60" width="10" height="120" fill="#94A3B8" />
        <motion.g style={{ transformBox: 'fill-box', transformOrigin: '0px -60px' }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
          {[0, 120, 240].map((d) => (
            <rect key={d} x="-3" y="-92" width="6" height="34" rx="3" fill="#2563EB" transform={`rotate(${d} 0 -60)`} />
          ))}
          <circle cy="-60" r="6" fill="#0F172A" />
        </motion.g>
      </g>
      {/* 光伏 */}
      <g transform="translate(230,180)">
        {[0, 1].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={c * 44} y={r * 26 - 40} width="40" height="22" rx="3" fill="#3B82F6" stroke="#fff" strokeWidth="1.5" />
          )),
        )}
        <line x1="60" y1="20" x2="60" y2="60" stroke="#94A3B8" strokeWidth="5" />
      </g>
      {/* 电网 */}
      <line x1="110" y1="250" x2="420" y2="250" stroke="#06B6D4" strokeWidth="2.4" className="flow-line" />
      <g transform="translate(400,150)">
        <rect width="180" height="90" rx="14" fill="#fff" stroke="#E2E8F0" />
        <text x="20" y="30" fill="#0F172A" fontSize="12" fontWeight="700">AI 负载预测与调度</text>
        <polyline points="20,66 45,54 70,60 95,42 120,50 145,34" fill="none" stroke="#14B8A6" strokeWidth="2.2" />
      </g>
    </>,
  )
}

export const EXPLORER_TABS = [
  { id: 'manufacturing', label: '制造', Scene: ManufacturingScene },
  { id: 'transport', label: '交通', Scene: TransportScene },
  { id: 'medical', label: '医疗', Scene: MedicalScene },
  { id: 'agriculture', label: '农业', Scene: AgricultureScene },
  { id: 'energy', label: '能源', Scene: EnergyScene },
]
