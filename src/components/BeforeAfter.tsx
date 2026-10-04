import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, User, ScanEye, Clock3 } from 'lucide-react'
import Reveal from './ui/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

const PRODUCT_X = [106, 258, 430, 602, 748]

function Product({ x, ai = false, defect = false, inspected = false }: { x: number; ai?: boolean; defect?: boolean; inspected?: boolean }) {
  const stroke = ai && inspected ? (defect ? '#F43F5E' : '#14B8A6') : '#8EA4B8'
  return (
    <g transform={`translate(${x} 292)`}>
      {ai && inspected && <motion.rect x="-8" y="-9" width="88" height="65" rx="9" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={defect ? '0' : '5 4'} animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 1.8, repeat: Infinity }} />}
      <path d="M6 8L18 0H57L69 8V40L57 48H18L6 40Z" fill={ai ? '#D6F4F0' : '#D8E2EC'} stroke={stroke} strokeWidth="2" />
      <circle cx="37.5" cy="24" r="13" fill="#F8FBFD" stroke={ai ? '#62CFC8' : '#9FB1C2'} strokeWidth="4" />
      <circle cx="37.5" cy="24" r="5" fill={ai ? '#9DE1DA' : '#B9C8D6'} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={i % 2 ? 59 : 16} cy={i < 2 ? 12 : 36} r="2.7" fill={ai ? '#47BEB6' : '#879DAF'} />)}
      {defect && <motion.path d="M56 4l-7 9 7 4-8 9" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={ai && inspected ? { opacity: [.4, 1, .4] } : undefined} transition={{ duration: 1.1, repeat: Infinity }} />}
    </g>
  )
}

function Conveyor({ ai = false }: { ai?: boolean }) {
  return <>
    <rect x="46" y="346" width="830" height="58" rx="12" fill={ai ? '#C5EEE8' : '#D8E3ED'} stroke={ai ? '#78CEC4' : '#AFC0CF'} />
    <rect x="46" y="346" width="830" height="22" rx="9" fill={ai ? '#E3F8F4' : '#EDF3F7'} stroke={ai ? '#8DD8CF' : '#BCCAD6'} />
    <path d="M72 357h765" stroke={ai ? '#59C5BC' : '#A8B8C6'} strokeWidth="2" strokeDasharray="22 13" />
    {[95,205,315,425,535,645,755,840].map(x=><circle key={x} cx={x} cy="383" r="11" fill="#F7FAFC" stroke={ai ? '#84D3CA' : '#AABBC9'} strokeWidth="2" />)}
    {[110,430,750].map(x=><g key={x}><path d={`M${x} 404v38M${x-30} 442h60`} stroke={ai ? '#83BEB9' : '#9AACBC'} strokeWidth="7" strokeLinecap="round" /></g>)}
    <motion.path d="M75 334h750" stroke={ai ? '#5CCBC0' : '#AAB9C7'} strokeWidth="2" strokeDasharray="5 18" animate={{ strokeDashoffset: [0, -46] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
    {[128,330,535,735].map(x=><path key={x} d={`M${x} 327l12 7-12 7`} fill="none" stroke={ai ? '#36B9AE' : '#9AABBA'} strokeWidth="2" />)}
    {PRODUCT_X.map((x,i)=><Product key={x} x={x} ai={ai} defect={i===2} inspected={ai && i>=1} />)}
  </>
}

const FlowSteps = ({ ai = false }: { ai?: boolean }) => {
  const { t, ta } = useLanguage()
  const steps = ai ? ta('b.aiSteps') : ta('b.manualSteps')
  return <g transform="translate(56 454)">
    {steps.map((step,i)=><g key={step} transform={`translate(${i*(ai?205:270)} 0)`}><circle cx="8" cy="0" r="8" fill={ai?'#D5F5F0':'#E6EDF3'} stroke={ai?'#14B8A6':'#94A3B8'} /><text x="8" y="3.5" textAnchor="middle" fill={ai?'#0F766E':'#64748B'} fontSize="7" fontWeight="700">0{i+1}</text><text x="24" y="4" fill={ai?'#0F766E':'#52677A'} fontSize="10.5" fontWeight="700">{step}</text>{i<steps.length-1&&<path d={`M${ai?147:205} 0h34`} stroke={ai?'#7DD3CA':'#B5C3CF'} strokeDasharray="3 4" />}</g>)}
  </g>
}

function TraditionalScene() {
  const { t, ta } = useLanguage()
  return (
    <svg viewBox="0 0 960 480" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="传统人工质量检测生产线">
      <rect width="960" height="480" fill="#F3F6FA" />
      <path d="M0 88H960M0 165H960" stroke="#E5ECF2" /><path d="M40 0V480M920 0V480" stroke="#E8EEF4" />
      <g transform="translate(38 30)"><rect width="260" height="96" rx="17" fill="#fff" stroke="#DCE6EE" /><text x="20" y="27" fill="#64748B" fontSize="9" fontWeight="700" letterSpacing="1.5">MANUAL INSPECTION</text><text x="20" y="54" fill="#334155" fontSize="19" fontWeight="750">{t('b.manual')}</text><g transform="translate(20 68)">{ta('b.manualTags').map((t,i)=><g key={t} transform={`translate(${i*76} 0)`}><rect width="67" height="19" rx="7" fill="#F3F6FA" /><text x="33.5" y="13" textAnchor="middle" fill="#64748B" fontSize="8.5">{t}</text></g>)}</g></g>
      <g transform="translate(380 142)">
        <circle cx="50" cy="25" r="22" fill="#A8B7C5" /><path d="M32 23q18 10 36 0" fill="none" stroke="#6B8093" strokeWidth="2" />
        <path d="M20 55q30-20 60 0v100H20Z" fill="#8FA5B8" /><path d="M23 76l-32 54M77 76l42 45" stroke="#8FA5B8" strokeWidth="14" strokeLinecap="round" />
        <motion.g animate={{ rotate: [0, 7, 0, -4, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '122px 96px' }}>
          <circle cx="122" cy="123" r="22" fill="#F8FAFC" stroke="#52677A" strokeWidth="5" />
          <path d="M138 139l22 22" stroke="#52677A" strokeWidth="7" strokeLinecap="round" />
        </motion.g>
        <rect x="-1" y="128" width="50" height="36" rx="5" fill="#F8FAFC" stroke="#6B8093" /><path d="M9 139h28M9 149h19" stroke="#A0B0BF" strokeWidth="3" />
      </g>
      <path d="M500 275Q487 250 493 225" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 5" opacity=".65" />
      <g transform="translate(60 180)"><circle cx="17" cy="17" r="17" fill="#FFF7E6" /><path d="M17 8v10l7 4" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" /><text x="45" y="14" fill="#64748B" fontSize="9">MANUAL</text><text x="45" y="32" fill="#475569" fontSize="12" fontWeight="700">逐件检测</text></g>
      <Conveyor />
      <FlowSteps />
    </svg>
  )
}

function AIScene() {
  const { t, ta } = useLanguage()
  return (
    <svg viewBox="0 0 960 480" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="AI 机器视觉质量检测生产线">
      <defs><linearGradient id="scan-field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#22D3EE" stopOpacity=".03"/><stop offset="1" stopColor="#14B8A6" stopOpacity=".2"/></linearGradient></defs>
      <rect width="960" height="480" fill="#EFFCF8" />
      <path d="M0 88H960M0 165H960" stroke="#DFF3EE" /><path d="M40 0V480M920 0V480" stroke="#DCF2ED" />
      <g transform="translate(662 30)"><rect width="260" height="96" rx="17" fill="#fff" stroke="#CFEAE4" /><text x="240" y="27" textAnchor="end" fill="#0F8F88" fontSize="9" fontWeight="700" letterSpacing="1.5">MACHINE VISION</text><text x="240" y="54" textAnchor="end" fill="#153B47" fontSize="19" fontWeight="750">{t('b.aiFull')}</text><g transform="translate(20 68)">{ta('b.aiTags').map((t,i)=><g key={t} transform={`translate(${i*76} 0)`}><rect width="67" height="19" rx="7" fill="#EAF9F5" /><text x="33.5" y="13" textAnchor="middle" fill="#0F766E" fontSize="8.5">{t}</text></g>)}</g></g>
      <g transform="translate(430 85)"><path d="M50-30V10M20-30h60" stroke="#7796AC" strokeWidth="7" strokeLinecap="round" /><rect x="5" y="8" width="90" height="60" rx="13" fill="#2563EB" stroke="#164DB8" strokeWidth="2" /><rect x="18" y="20" width="48" height="36" rx="9" fill="#3185ED" /><circle cx="44" cy="38" r="15" fill="#0F172A" /><motion.circle cx="44" cy="38" r="15" fill="none" stroke="#67E8F9" strokeWidth="1.5" animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} style={{ transformOrigin: '44px 38px' }} /><circle cx="44" cy="38" r="7" fill="#67E8F9" /><motion.circle cx="79" cy="23" r="4" fill="#34D399" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} /><path d="M95 23h18v31H95" fill="#A5B9CA" stroke="#70879B" /></g>
      <path d="M440 153L390 344H575L520 153Z" fill="url(#scan-field)" />
      {[210,250,290].map(y=><line key={y} x1={420-(y-210)*.13} y1={y} x2={540+(y-210)*.25} y2={y} stroke="#37C8D0" strokeWidth="1" opacity=".25" />)}
      <motion.line x1="407" x2="555" stroke="#22D3EE" strokeWidth="2" animate={{y1:[190,325,190],y2:[190,325,190]}} transition={{duration:2.8,repeat:Infinity,ease:'easeInOut'}} />
      <path d="M402 276v-18h18M548 258h18v18M402 331v18h18M548 349h18v-18" fill="none" stroke="#0891B2" strokeWidth="2.5" /><text x="484" y="246" textAnchor="middle" fill="#0891B2" fontSize="8.5" fontWeight="700">INSPECTION ZONE</text>
      <motion.path d="M526 124C610 96 648 116 696 158" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="5 7" animate={{strokeDashoffset:[24,0]}} transition={{duration:1.4,repeat:Infinity,ease:'linear'}} />
      <motion.circle r="4" fill="#06B6D4" animate={{cx:[526,610,696],cy:[124,104,158]}} transition={{duration:1.8,repeat:Infinity,ease:'linear'}} />
      <g transform="translate(690 122)"><rect width="220" height="142" rx="17" fill="#fff" stroke="#A9E1D9" /><text x="18" y="26" fill="#153B47" fontSize="12" fontWeight="750">{t('i.aiVerdict')}</text><motion.circle cx="187" cy="22" r="4" fill="#14B8A6" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.3, repeat: Infinity }} /><text x="18" y="50" fill="#7A929B" fontSize="8">STATUS</text><text x="73" y="50" fill="#0F766E" fontSize="9" fontWeight="700">● INSPECTING</text><path d="M18 62H202" stroke="#E3F1EE"/><text x="18" y="83" fill="#78909A" fontSize="9">{t('b.current')}</text><text x="197" y="83" textAnchor="end" fill="#334155" fontSize="10" fontWeight="700">P-003</text><text x="18" y="104" fill="#78909A" fontSize="9">{t('b.result')}</text><motion.text x="197" y="104" textAnchor="end" fill="#E11D48" fontSize="10" fontWeight="800" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 1.1, repeat: Infinity }}>DEFECT FOUND</motion.text><rect x="18" y="116" width="184" height="14" rx="5" fill="#F0FDF9"/><text x="110" y="126" textAnchor="middle" fill="#0F766E" fontSize="8">{t('b.okNg')}</text></g>
      <g transform="translate(864 299)"><path d="M0 22h40M17 22v-30" stroke="#507284" strokeWidth="5" strokeLinecap="round"/><motion.path d="M17 6l25 16" stroke="#14B8A6" strokeWidth="6" strokeLinecap="round" animate={{rotate:[0,17,0]}} style={{transformOrigin:'17px 6px'}} transition={{duration:3,repeat:Infinity}}/><path d="M40 22l35-23" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4"/><rect x="48" y="42" width="64" height="31" rx="7" fill="#FFF1F2" stroke="#FDA4AF"/><text x="80" y="61" textAnchor="middle" fill="#BE123C" fontSize="9" fontWeight="700">NG BOX</text><text x="38" y="-12" fill="#0F766E" fontSize="8" fontWeight="700">OK LINE →</text></g>
      <Conveyor ai />
      <FlowSteps ai />
    </svg>
  )
}

export default function BeforeAfter() {
  const { t, ta } = useLanguage()
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const update = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  return (
    <div className="mt-20">
      <Reveal>
        <h3 className="text-center text-[26px] font-bold text-ink">{t('b.title')}</h3>
        <p className="mt-3 text-center text-[15px] text-body">{t('b.sub')}</p>
      </Reveal>

      <Reveal className="mt-7">
        <div className="card border border-line/60 p-4 shadow-[0_16px_44px_rgba(38,103,169,.08)] sm:p-6">
          <div className="mb-4 flex justify-center gap-2" aria-label="快速查看生产模式">
            <button onClick={() => setPos(100)} className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-[12px] font-semibold transition ${pos>75?'border-slate-300 bg-slate-100 text-ink':'border-line bg-white text-muted hover:border-slate-300'}`}><User size={14}/>● Traditional</button>
            <button onClick={() => setPos(0)} className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-[12px] font-semibold transition ${pos<25?'border-teal/30 bg-teal/10 text-teal':'border-line bg-white text-muted hover:border-teal/30'}`}><ScanEye size={14}/>● AI Powered</button>
          </div>

          <div
            ref={ref}
            className="relative select-none touch-none overflow-hidden rounded-[20px] border border-[#E5EDF6] bg-white"
            style={{ height: 'clamp(300px, 50vw, 520px)' }}
            onPointerDown={(e) => { setDragging(true); e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX) }}
            onPointerMove={(e) => dragging && update(e.clientX)}
            onPointerUp={(e) => { setDragging(false); e.currentTarget.releasePointerCapture(e.pointerId) }}
            onPointerCancel={() => setDragging(false)}
          >
            <div className="absolute inset-0"><AIScene /></div>
            <div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: `inset(0 ${100-pos}% 0 0)` }}><TraditionalScene /></div>

            <motion.div className="absolute inset-y-0 z-20 w-[2px] bg-brand/55" style={{ left: `${pos}%` }}>
              <motion.span animate={{scale:dragging?1.08:1,backgroundColor:dragging?'#EFF6FF':'#FFFFFF'}} whileHover={{scale:1.08}} className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/20 text-brand shadow-[0_7px_18px_rgba(37,99,235,.16)]">
                <ChevronLeft size={16}/><ChevronRight size={16} className="-ml-1.5"/>
              </motion.span>
            </motion.div>
          </div>

          <div className="mt-3 grid overflow-hidden rounded-xl border border-line/60 text-[10px] font-semibold sm:grid-cols-2">
            <div className="flex items-center justify-center gap-3 bg-slate-50 px-3 py-2.5 text-slate-600"><Clock3 size={13} className="text-amber-500"/><span>{t('b.manual')}</span><i className="h-3 w-px bg-slate-300"/><span>{ta('b.manualSteps')[1]}</span><i className="h-3 w-px bg-slate-300"/><span>{ta('b.manualTags')[2]}</span></div>
            <div className="flex items-center justify-center gap-3 bg-teal/7 px-3 py-2.5 text-teal"><ScanEye size={13}/><span>{ta('b.aiTags')[0]}</span><i className="h-3 w-px bg-teal/25"/><span>{ta('b.aiTags')[1]}</span><i className="h-3 w-px bg-teal/25"/><span>{ta('b.aiTags')[2]}</span></div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
