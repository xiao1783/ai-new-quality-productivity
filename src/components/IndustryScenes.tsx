import { motion } from 'framer-motion'
import type { ComponentType, ReactNode } from 'react'

type SceneProps = { accent: string }

export type IndustryCase = {
  id: string
  label: string
  eyebrow: string
  title: string
  summary: string
  accent: string
  steps: string[]
  statusLabel: string
  status: string
  valueLabel: string
  value: string
  keywords: string[]
  Scene: ComponentType<SceneProps>
}

const Frame = ({ children, label }: { children: ReactNode; label: string }) => (
  <svg viewBox="0 0 720 430" className="h-full min-h-[310px] w-full" role="img" aria-label={label}>
    <defs>
      <pattern id="case-grid" width="26" height="26" patternUnits="userSpaceOnUse">
        <path d="M26 0H0V26" fill="none" stroke="#DCEAF7" opacity=".55" />
      </pattern>
      <filter id="case-shadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dy="8" stdDeviation="9" floodColor="#2563EB" floodOpacity=".12" />
      </filter>
    </defs>
    <rect width="720" height="430" rx="24" fill="#F7FBFF" />
    <rect width="720" height="430" rx="24" fill="url(#case-grid)" />
    <circle cx="590" cy="60" r="190" fill="#CFFAFE" opacity=".2" />
    {children}
  </svg>
)

const SceneTitle = ({ title, caption }: { title: string; caption: string }) => <>
  <text x="34" y="42" fill="#0F172A" fontSize="16" fontWeight="750">{title}</text>
  <text x="34" y="65" fill="#64748B" fontSize="10.5">{caption}</text>
</>

function ManufacturingScene({ accent }: SceneProps) {
  return <Frame label="工业相机采集图像、AI 检测缺陷并自动分拣的流水线">
    <SceneTitle title="AI 视觉质检 · 流水线" caption="CAMERA INPUT · DEFECT DETECTION · AUTO SORTING" />
    {/* 传送带 */}
    <rect x="35" y="280" width="610" height="58" rx="18" fill="#DDE9F5" />
    <rect x="52" y="292" width="576" height="30" rx="15" fill="#B9CBDE" />
    {[76,150,224,298,372,446,520,594].map(x=>(
      <g key={x}>
        <circle cx={x} cy="307" r="9" fill="#EEF6FC" stroke="#93ABC2" />
        <motion.path d={`M${x-4} 307h8`} stroke="#93ABC2" strokeWidth="2" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${x}px 307px` }} />
      </g>
    ))}
    <motion.path d="M62 300h556" stroke="#8FA9C2" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 14" opacity=".55" animate={{ strokeDashoffset: [0, -44] }} transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }} />

    {/* 在制品 */}
    {[80,205,330,455].map((x,i)=>(
      <motion.g key={x} animate={{x:[0,24,0]}} transition={{duration:3.2,delay:i*.25,repeat:Infinity,ease:'easeInOut'}}>
        <rect x={x} y="238" width="66" height="42" rx="9" fill={i===2?'#FFF1F2':'#EAF2FA'} stroke={i===2?'#FB7185':'#8CA7C0'} strokeWidth="2" />
        <path d={`M${x+8} 245h50`} stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity={i===2?.5:.75} />
        <path d={`M${x+15} 252h35M${x+15} 264h22`} stroke={i===2?'#FB7185':'#9BB0C4'} strokeWidth="3" strokeLinecap="round" />
        {i===2&&<>
          <motion.circle cx={x+48} cy="252" r="5" fill="#F43F5E" animate={{opacity:[.3,1,.3]}} transition={{duration:1.1,repeat:Infinity}} />
          {[[x-3,235,1,0],[x+62,235,-1,0],[x-3,283,1,0],[x+62,283,-1,0]].map(([bx,by,dx],k)=>(
            <motion.path key={k} d={`M${bx} ${by}h${dx*10}M${bx} ${by}v${by===235?10:-10}`} stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" animate={{opacity:[.25,1,.25]}} transition={{duration:1.1,repeat:Infinity,delay:k*.12}} />
          ))}
        </>}
      </motion.g>
    ))}

    {/* 相机 */}
    <path d="M258 78v70" stroke="#7895B1" strokeWidth="7" />
    <rect x="216" y="145" width="84" height="52" rx="14" fill="#fff" stroke={accent} strokeWidth="2" filter="url(#case-shadow)" />
    <circle cx="258" cy="171" r="15" fill="#0F172A" />
    <circle cx="258" cy="171" r="7" fill="#38BDF8" />
    <motion.circle cx="258" cy="171" r="11" fill="none" stroke="#38BDF8" strokeWidth="2" animate={{ scale: [1, 1.9], opacity: [0.55, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ transformOrigin: '258px 171px' }} />
    <motion.circle cx="290" cy="154" r="3" fill="#10B981" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.2, repeat: Infinity }} />
    <text x="243" y="192" fill="#94A3B8" fontSize="7" fontWeight="700">CAM-01</text>

    {/* 扫描光锥 */}
    <motion.path d="M226 197L198 280H318L290 197Z" fill={accent} animate={{opacity:[.06,.2,.06]}} transition={{duration:1.6,repeat:Infinity}} />
    <motion.line x1="202" x2="314" stroke="#38BDF8" strokeWidth="2" animate={{y1:[214,272,214],y2:[214,272,214]}} transition={{duration:2.1,repeat:Infinity}} />
    {[0,1].map(i=>(
      <motion.circle key={i} r="2.5" fill="#38BDF8" animate={{opacity:[.2,.9,.2]}}>
        <animateMotion dur={`${1.4+i*0.5}s`} repeatCount="indefinite" path="M258 200L258 276" />
      </motion.circle>
    ))}

    {/* 推料杆 */}
    <motion.g animate={{ rotate: [0, 0, -16, 0, 0] }} transition={{ duration: 3.2, times: [0, 0.6, 0.72, 0.84, 1], repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '648px 262px' }}>
      <rect x="645" y="262" width="5" height="26" rx="2.5" fill="#94A3B8" />
      <rect x="638" y="284" width="19" height="7" rx="3" fill="#FB7185" />
    </motion.g>
    <path d="M645 307h30v-64" fill="none" stroke="#94A3B8" strokeWidth="4" />
    <path d="M661 243h42l-20 35h-43Z" fill="#DFF7F1" stroke="#14B8A6" strokeWidth="2" />
    <text x="638" y="360" fill="#64748B" fontSize="10">PASS</text><text x="667" y="225" fill="#E11D48" fontSize="10" fontWeight="700">REJECT</text>

    {/* 数据流与 AI 判定卡 */}
    <motion.path d="M302 170C390 118 470 130 548 174" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 8" animate={{strokeDashoffset:[28,0]}} transition={{duration:1.4,repeat:Infinity,ease:'linear'}} />
    {[0,1].map(i=>(
      <motion.circle key={i} r="3" fill={accent} animate={{opacity:[.2,.9,.2]}}>
        <animateMotion dur={`${2.2+i*0.7}s`} repeatCount="indefinite" path="M302 170C390 118 470 130 548 174" />
      </motion.circle>
    ))}
    <g transform="translate(535 132)" filter="url(#case-shadow)"><rect width="142" height="86" rx="18" fill="#fff" stroke="#CFE0F1" /><circle cx="33" cy="34" r="18" fill={accent} opacity=".12" /><text x="33" y="39" textAnchor="middle" fill={accent} fontSize="14" fontWeight="800">AI</text><text x="62" y="32" fill="#0F172A" fontSize="12" fontWeight="700">缺陷已识别</text><motion.circle cx="135" cy="27" r="3" fill="#10B981" animate={{opacity:[.25,1,.25]}} transition={{duration:1.2,repeat:Infinity}} /><text x="62" y="52" fill="#64748B" fontSize="10">置信度 96%</text><rect x="20" y="67" width="102" height="5" rx="3" fill="#E2E8F0" /><motion.rect x="20" y="67" height="5" rx="3" fill={accent} animate={{ width: [10, 96, 96] }} transition={{ duration: 2.4, times: [0, 0.45, 1], repeat: Infinity, repeatDelay: 0.6 }} /></g>
  </Frame>
}

function TransportScene({ accent }: SceneProps) {
  const cars=[[70,192],[150,192],[500,192],[575,192],[120,246],[430,246],[345,108],[345,292]]
  return <Frame label="AI 感知道路拥堵并优化交通信号和行驶路径">
    <SceneTitle title="智能交通调度 · 城市路网" caption="TRAFFIC SENSING · CONGESTION PREDICTION · ROUTE CONTROL" />
    <rect x="45" y="137" width="630" height="142" rx="26" fill="#DCE8F3" /><rect x="285" y="80" width="150" height="286" rx="26" fill="#DCE8F3" />
    <rect x="45" y="188" width="630" height="42" fill="#F8FBFD" /><rect x="45" y="242" width="630" height="36" fill="#F8FBFD" /><rect x="339" y="80" width="43" height="286" fill="#F8FBFD" />
    <path d="M55 209H665M360 88V356" stroke="#AFC2D4" strokeWidth="2" strokeDasharray="15 12" />
    <path d="M55 260H330M392 260H665" stroke="#AFC2D4" strokeWidth="2" strokeDasharray="15 12" />
    {/* 斑马线 */}
    {[0,1,2,3,4].map(i=><rect key={i} x={300+i*9} y="192" width="5" height="38" rx="2" fill="#fff" opacity=".6" />)}
    {[0,1,2,3,4].map(i=><rect key={i} x="342" y={112+i*9} width="38" height="5" rx="2" fill="#fff" opacity=".55" />)}
    {/* 拥堵趋势 */}
    <motion.rect x="440" y="188" width="225" height="42" fill="#FB923C" animate={{opacity:[.12,.22,.12]}} transition={{duration:2,repeat:Infinity}} />
    <text x="514" y="180" fill="#EA580C" fontSize="10" fontWeight="700">拥堵趋势</text>
    <motion.path d="M470 176l14-8 10 4 16-12" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
    {/* 绿色优化路径 */}
    <motion.path d="M58 209H267Q310 209 310 254V352" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.4}} />
    <motion.path d="M58 209H267Q310 209 310 254V352" fill="none" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="4 10" animate={{strokeDashoffset:[0,-28]}} transition={{duration:1.2,repeat:Infinity,ease:'linear'}} />
    {[0,1,2].map(i=>(
      <motion.circle key={i} r="3.5" fill="#10B981" animate={{opacity:[.2,1,.2]}}>
        <animateMotion dur="2.8s" begin={`${i*0.9}s`} repeatCount="indefinite" path="M58 209H267Q310 209 310 254V352" />
      </motion.circle>
    ))}
    {/* 车辆 */}
    {cars.map(([x,y],i)=>{
      const down = y>230&&x>330
      const congested = x>=500&&y===192
      return (
        <motion.g key={i} animate={down?{y:[0,-22,0]}:(y===246?{x:[0,-26,0]}:{x:[0,26,0]})} transition={{duration:congested?4.6:3+i*.2,repeat:Infinity,ease:'easeInOut'}}>
          <rect x={x} y={y} width="34" height="17" rx="6" fill={congested?'#F97316':(down||y===246?'#06B6D4':'#2563EB')} />
          <rect x={x+8} y={y-5} width="18" height="9" rx="4" fill={congested?'#FB923C':'#60A5FA'} />
          <circle cx={x+8} cy={y+17} r="3" fill="#334155" /><circle cx={x+26} cy={y+17} r="3" fill="#334155" />
          <circle cx={y===246?x+1:x+33} cy={y+8} r="2" fill="#FEF3C7" />
          {congested&&<motion.circle cx={x+2} cy={y+8} r="2" fill="#EF4444" animate={{opacity:[1,.2,1]}} transition={{duration:.7,repeat:Infinity}} />}
        </motion.g>
      )
    })}
    {/* 信号灯 */}
    {[[310,154],[410,230]].map(([x,y],i)=>(
      <g key={i} transform={`translate(${x} ${y})`}>
        <rect width="17" height="49" rx="6" fill="#172033" />
        {i===0
          ? <motion.circle cx="8.5" cy="11" r="5" fill="#22C55E" animate={{opacity:[1,.35,1]}} transition={{duration:1.8,repeat:Infinity}} />
          : <motion.circle cx="8.5" cy="39" r="5" fill="#EF4444" animate={{opacity:[1,.4,1]}} transition={{duration:1.8,repeat:Infinity}} />}
        <circle cx="8.5" cy="25" r="5" fill="#F59E0B" opacity=".22" />
        {i===0?<circle cx="8.5" cy="39" r="5" fill="#EF4444" opacity=".22"/>:<circle cx="8.5" cy="11" r="5" fill="#22C55E" opacity=".22"/>}
      </g>
    ))}
    {/* 路侧传感器雷达波 */}
    {[0,1].map(i=>(
      <motion.circle key={i} cx="254" cy="209" r="6" fill="none" stroke={accent} strokeWidth="1.5" animate={{ scale: [1, 2.6], opacity: [0.55, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.9 }} style={{ transformOrigin: '254px 209px' }} />
    ))}
    {[110,182,254,326,398,470,542].map((x,i)=><motion.circle key={x} cx={x} cy="209" r="3.5" fill={accent} animate={{opacity:[.15,1,.15]}} transition={{duration:1.2,repeat:Infinity,delay:i*.12}} />)}
    <g transform="translate(82 88)" filter="url(#case-shadow)"><rect width="169" height="64" rx="16" fill="#fff" stroke="#D5E4F2" /><motion.circle cx="31" cy="32" r="21" fill={accent} opacity=".1" animate={{scale:[.9,1.12,.9]}} transition={{duration:2,repeat:Infinity}} style={{transformOrigin:'31px 32px'}} /><circle cx="31" cy="32" r="18" fill={accent} opacity=".12" /><text x="31" y="37" textAnchor="middle" fill={accent} fontSize="13" fontWeight="800">AI</text><text x="59" y="28" fill="#0F172A" fontSize="11" fontWeight="700">绿灯延长 18s</text><text x="59" y="46" fill="#64748B" fontSize="10">分流路径已生成</text></g>
  </Frame>
}

function MedicalScene({ accent }: SceneProps) {
  return <Frame label="AI 扫描医学影像、定位病灶并输出风险分析">
    <SceneTitle title="AI 影像辅助诊断 · CT 分析" caption="IMAGE INPUT · LESION LOCALIZATION · RISK ANALYSIS" />
    <defs>
      <radialGradient id="med-vign" cx=".5" cy=".45" r=".75">
        <stop offset=".55" stopColor="#0B1420" stopOpacity="0" />
        <stop offset="1" stopColor="#0B1420" stopOpacity=".55" />
      </radialGradient>
    </defs>
    <g transform="translate(42 88)" filter="url(#case-shadow)">
      <rect width="370" height="300" rx="22" fill="#101B2C" />
      <rect x="20" y="20" width="330" height="250" rx="14" fill="#17263A" />
      <path d="M150 48Q89 83 92 184Q102 232 151 218Q181 190 182 142Q183 190 214 218Q264 232 276 184Q277 83 216 48Q190 38 182 71Q174 38 150 48Z" fill="#8293A6" opacity=".72" />
      <path d="M161 69Q119 92 119 175Q126 204 153 197Q175 171 173 107ZM203 69Q246 92 246 175Q239 204 211 197Q190 171 192 107Z" fill="#26384C" />
      <path d="M182 72V206" stroke="#B7C5D2" strokeWidth="6" opacity=".55" />
      {[70,120,220,290].map(y=><path key={y} d={`M28 ${y}h60M250 ${y}h70`} stroke="#2C3E52" strokeWidth="1" />)}
      {/* 病灶 */}
      <motion.ellipse cx="225" cy="139" rx="23" ry="17" fill={accent} animate={{opacity:[.15,.45,.15],scale:[.94,1.06,.94]}} transition={{duration:1.7,repeat:Infinity}} />
      {[0,1].map(i=><motion.circle key={i} cx="225" cy="139" r="16" fill="none" stroke="#22D3EE" strokeWidth="1.5" animate={{ scale: [1, 2.2], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.9 }} style={{ transformOrigin: '225px 139px' }} />)}
      <rect x="199" y="118" width="54" height="44" rx="7" fill="none" stroke="#22D3EE" strokeWidth="2.5" />
      {[[196,115,1,1],[256,115,-1,1],[196,165,1,-1],[256,165,-1,-1]].map(([bx,by,dx,dy],i)=>(
        <motion.path key={i} d={`M${bx+dx*4} ${by}h${-dx*9}M${bx} ${by+dy*4}v${-dy*9}`} stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" animate={{opacity:[.35,1,.35]}} transition={{duration:1.4,repeat:Infinity,delay:i*.15}} />
      ))}
      <path d="M256 130h30v-16h28" fill="none" stroke="#67E8F9" strokeWidth="1.2" opacity=".8" />
      <text x="290" y="110" fill="#67E8F9" fontSize="8.5" fontWeight="700">结节 · 8mm</text>
      {/* 扫描线与拖影 */}
      <motion.rect x="34" width="302" height="26" fill="#22D3EE" animate={{ y: [42, 240, 42], opacity: [0, 0.13, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.line x1="34" x2="336" stroke="#67E8F9" strokeWidth="2" animate={{y1:[47,248,47],y2:[47,248,47]}} transition={{duration:3.2,repeat:Infinity,ease:'easeInOut'}} />
      <rect x="20" y="20" width="330" height="250" rx="14" fill="url(#med-vign)" />
      <text x="24" y="290" fill="#94A3B8" fontSize="10">SLICE 18 / 42</text>
      <rect x="110" y="283" width="80" height="4" rx="2" fill="#26384C" />
      <motion.rect x="110" y="283" width="34" height="4" rx="2" fill="#22D3EE" animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.text x="276" y="290" fill="#67E8F9" fontSize="10" fontWeight="700" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.4, repeat: Infinity }}>● AI SCANNING</motion.text>
    </g>
    <g transform="translate(448 102)"><rect width="230" height="134" rx="18" fill="#fff" stroke="#CCE2EF" /><text x="20" y="31" fill="#0F172A" fontSize="12" fontWeight="700">病灶定位结果</text><text x="20" y="57" fill="#64748B" fontSize="10">异常区域</text><motion.circle cx="185" cy="53" r="3.5" fill={accent} animate={{opacity:[.3,1,.3]}} transition={{duration:1.2,repeat:Infinity}} /><text x="197" y="57" textAnchor="end" fill={accent} fontSize="11" fontWeight="700">已发现</text><text x="20" y="83" fill="#64748B" fontSize="10">风险评分</text><rect x="84" y="75" width="108" height="8" rx="4" fill="#E2E8F0" /><motion.rect x="84" y="75" width="79" height="8" rx="4" fill={accent} initial={{scaleX:0}} animate={{scaleX:1}} style={{transformOrigin:'84px 79px'}} transition={{duration:1}} /><motion.rect x="84" y="75" width="14" height="8" rx="4" fill="#fff" animate={{ x: [84, 149, 149], opacity: [0, .6, 0] }} transition={{ duration: 2, times: [0, 0.25, 1], repeat: Infinity, repeatDelay: 1.2 }} /><rect x="20" y="101" width="190" height="22" rx="8" fill="#ECFEFF" /><text x="115" y="116" textAnchor="middle" fill="#0E7490" fontSize="10" fontWeight="700">建议：结合临床进一步检查</text></g>
    <g transform="translate(448 258)">{[0,1,2].map(i=>(
      <g key={i} transform={`translate(${i*74} 0)`}>
        <motion.rect width="62" height="70" rx="12" fill="#E8F2F8" stroke={i===1?accent:'#C7DAE8'} strokeWidth={i===1?2:1.2} animate={i===1?{opacity:[.7,1,.7]}:{}} transition={{duration:1.6,repeat:Infinity}} />
        <path d="M18 16Q10 28 16 50Q26 54 31 39Q36 54 46 50Q52 28 44 16Q36 13 31 23Q25 13 18 16Z" fill="#607991" opacity={.45+i*.18} />
        {i===1&&<motion.rect x="22" y="34" width="18" height="14" rx="3" fill="none" stroke={accent} strokeWidth="1.5" animate={{opacity:[.3,1,.3]}} transition={{duration:1.6,repeat:Infinity}} />}
        <text x="31" y="64" textAnchor="middle" fill="#64748B" fontSize="8">SLICE {17+i}</text>
      </g>
    ))}</g>
    <motion.path d="M411 183C430 183 432 168 448 168" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 7" animate={{strokeDashoffset:[24,0]}} transition={{duration:1.3,repeat:Infinity,ease:'linear'}} />
    <motion.circle r="3" fill={accent} animate={{opacity:[.2,.9,.2]}}>
      <animateMotion dur="1.8s" repeatCount="indefinite" path="M411 183C430 183 432 168 448 168" />
    </motion.circle>
  </Frame>
}

function AgricultureScene({ accent }: SceneProps) {
  return <Frame label="无人机采集农田影像、识别异常并提供精准干预建议">
    <SceneTitle title="智慧农业巡检 · 精准干预" caption="AERIAL CAPTURE · CROP ANALYSIS · PRECISE INTERVENTION" />
    {/* 农田 */}
    <g transform="translate(40 113) skewX(-12)">
      {[0,1,2,3,4,5].map(r=><path key={r} d={`M0 ${r*48+24}H450`} stroke="#fff" strokeWidth="1" opacity=".14" />)}
      {[0,1,2,3,4].map(r=>[0,1,2,3,4,5].map(c=>{const bad=(r===1&&c===3)||(r===2&&c===3);return <motion.rect key={`${r}-${c}`} x={c*75} y={r*48} width="65" height="38" rx="5" fill={bad?'#FBBF24':(r+c)%2?'#86D6A4':'#63C58A'} stroke="#fff" strokeWidth="2" animate={{opacity:bad?[.6,.95,.6]:[.7,.82,.7]}} transition={{duration:bad?1.6:3.4,repeat:Infinity,delay:(r+c)*.12}} />}))}
      {[257,257].map((x,i)=><motion.g key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}><path d={`M${x} ${67+i*48}c-5-7-8-10-8-14a8 8 0 0 1 16 0c0 4-3 7-8 14Z`} fill="#fff" opacity=".85" /></motion.g>)}
    </g>
    {/* 无人机投影 */}
    <motion.ellipse cx="243" cy="384" rx="34" ry="6" fill="#0F172A" animate={{ cx: [243, 508, 243], opacity: [.05, .1, .05] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} />
    {/* 无人机 */}
    <motion.g animate={{x:[125,390,125],y:[0,-12,0]}} transition={{duration:6.5,repeat:Infinity,ease:'easeInOut'}}>
      <motion.ellipse cx="61" cy="97" rx="15" ry="4" fill="#22D3EE" opacity=".35" animate={{ scaleX: [1, .25, 1] }} transition={{ duration: .5, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '61px 97px' }} />
      <motion.ellipse cx="175" cy="97" rx="15" ry="4" fill="#22D3EE" opacity=".35" animate={{ scaleX: [1, .25, 1] }} transition={{ duration: .5, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '175px 97px' }} />
      <rect x="90" y="88" width="56" height="18" rx="8" fill="#2563EB" />
      <rect x="98" y="92" width="22" height="10" rx="4" fill="#60A5FA" />
      <path d="M90 97H61M146 97h29" stroke="#516A82" strokeWidth="4" strokeLinecap="round" />
      <motion.circle cx="140" cy="94" r="2.5" fill="#4ADE80" animate={{opacity:[.3,1,.3]}} transition={{duration:1,repeat:Infinity}} />
      <circle cx="118" cy="110" r="7" fill="#0F172A" />
      <circle cx="118" cy="110" r="3" fill="#22D3EE" />
      {[0,1].map(i=><motion.circle key={i} cx="118" cy="116" r="8" fill="none" stroke="#22D3EE" strokeWidth="1.5" animate={{ scale: [1, 2.4], opacity: [0.5, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.8 }} style={{ transformOrigin: '118px 116px' }} />)}
      <motion.path d="M105 116L78 254H170L131 116Z" fill={accent} animate={{ opacity: [.07, .16, .07] }} transition={{ duration: 1.8, repeat: Infinity }} />
    </motion.g>
    {/* 缺水选区 */}
    <motion.rect x="287" y="153" width="72" height="86" rx="8" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="7 5" animate={{opacity:[.4,1,.4]}} transition={{duration:1.5,repeat:Infinity}} />
    {[[284,150,1,1],[362,150,-1,1],[284,242,1,-1],[362,242,-1,-1]].map(([bx,by,dx,dy],i)=>(
      <motion.path key={i} d={`M${bx+dx*5} ${by}h${-dx*11}M${bx} ${by+dy*5}v${-dy*11}`} stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" animate={{opacity:[.4,1,.4]}} transition={{duration:1.5,repeat:Infinity,delay:i*.15}} />
    ))}
    <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
      <path d="M323 178c-6-8-9-12-9-16a9 9 0 0 1 18 0c0 4-3 8-9 16Z" fill="#FBBF24" />
      <circle cx="323" cy="162" r="2" fill="#fff" opacity=".9" />
    </motion.g>
    {/* 巡检分析卡 */}
    <g transform="translate(524 108)" filter="url(#case-shadow)"><rect width="158" height="174" rx="20" fill="#fff" stroke="#CCE7DE" /><text x="20" y="28" fill="#0F172A" fontSize="12" fontWeight="700">巡检分析</text><circle cx="32" cy="52" r="9" fill="#FBBF24" opacity=".25" /><text x="50" y="56" fill="#92400E" fontSize="10" fontWeight="700">缺水区域 · 2</text><rect x="50" y="62" width="88" height="5" rx="2.5" fill="#F1F5F9" /><motion.rect x="50" y="62" width="30" height="5" rx="2.5" fill="#FBBF24" initial={{scaleX:0}} animate={{scaleX:1}} style={{transformOrigin:'50px 64px'}} transition={{duration:.9}} /><circle cx="32" cy="88" r="9" fill="#34D399" opacity=".25" /><text x="50" y="92" fill="#166534" fontSize="10" fontWeight="700">长势良好 · 86%</text><rect x="50" y="98" width="88" height="5" rx="2.5" fill="#F1F5F9" /><motion.rect x="50" y="98" width="76" height="5" rx="2.5" fill="#34D399" initial={{scaleX:0}} animate={{scaleX:1}} style={{transformOrigin:'50px 100px'}} transition={{duration:.9,delay:.15}} /><path d="M20 118H138" stroke="#E2E8F0" /><text x="20" y="140" fill="#64748B" fontSize="9">RECOMMENDATION</text><text x="20" y="158" fill={accent} fontSize="11" fontWeight="700">精准灌溉 + 定点巡检</text></g>
    <motion.path d="M358 194C428 158 465 166 522 178" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 7" animate={{strokeDashoffset:[24,0]}} transition={{duration:1.3,repeat:Infinity,ease:'linear'}} />
    <motion.circle r="3" fill={accent} animate={{opacity:[.2,.9,.2]}}>
      <animateMotion dur="2s" repeatCount="indefinite" path="M358 194C428 158 465 166 522 178" />
    </motion.circle>
  </Frame>
}

function EnergyScene({ accent }: SceneProps) {
  return <Frame label="AI 汇聚风光储和负荷数据，预测需求并动态调度能源">
    <SceneTitle title="智能能源调度 · 风光储协同" caption="MULTI-SOURCE DATA · LOAD FORECAST · SUPPLY-DEMAND BALANCE" />
    <defs>
      <linearGradient id="solar-shine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* 太阳 */}
    <g transform="translate(600 56)">
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1="-17" x2="0" y2="-24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${i * 45})`} />
        ))}
      </motion.g>
      <motion.circle r="11" fill="#FDE68A" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.6, repeat: Infinity }} />
    </g>
    {/* 风机 */}
    <g transform="translate(95 194)">
      <ellipse cx="0" cy="112" rx="30" ry="5" fill="#0F172A" opacity=".06" />
      <path d="M0 0V104" stroke="#7891A8" strokeWidth="7" />
      <motion.g animate={{rotate:360}} transition={{duration:6,repeat:Infinity,ease:'linear'}}>
        <path d="M0 0L-12-76Q4-83 7-72ZM0 0L72 28Q64 43 52 36ZM0 0L-60 49Q-71 37-59 28Z" fill="#55B8E8" />
      </motion.g>
      <circle r="10" fill="#fff" stroke="#2563EB" strokeWidth="3" />
      <motion.circle r="4" fill="#2563EB" animate={{ opacity: [.4, 1, .4] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <text x="0" y="128" textAnchor="middle" fill="#64748B" fontSize="10">WIND</text>
    </g>
    {/* 光伏 */}
    <g transform="translate(184 244)">
      {[0,1].map(r=>[0,1,2].map(c=><motion.rect key={`${r}-${c}`} x={c*43} y={r*29} width="38" height="24" rx="3" fill="#3B82F6" stroke="#BFDBFE" animate={{opacity:[.72,1,.72]}} transition={{duration:2,repeat:Infinity,delay:(r+c)*.15}} />))}
      <motion.rect x="0" y="0" width="34" height="53" fill="url(#solar-shine)" animate={{ x: [0, 96, 96], opacity: [0, .7, 0] }} transition={{ duration: 2.6, times: [0, 0.45, 1], repeat: Infinity, repeatDelay: 1.6 }} />
      <text x="61" y="83" textAnchor="middle" fill="#64748B" fontSize="10">SOLAR</text>
    </g>
    {/* 储能 */}
    <g transform="translate(515 248)">
      <rect width="80" height="69" rx="12" fill="#fff" stroke="#14B8A6" strokeWidth="2" />
      <rect x="17" y="18" width="46" height="30" rx="5" fill="#CCFBF1" />
      <rect x="63" y="28" width="5" height="10" rx="2" fill="#14B8A6" />
      <motion.rect x="21" y="22" width="38" height="22" rx="3" fill="#14B8A6" animate={{ scaleX: [.25, .9, .25] }} style={{ transformOrigin: '21px 33px' }} transition={{ duration: 2.4, repeat: Infinity }} />
      <motion.path d="M66 12l-5 8h4l-3 7 8-9h-4l4-6Z" fill="#F59E0B" animate={{ opacity: [.45, 1, .45] }} transition={{ duration: 1.4, repeat: Infinity }} />
      <text x="40" y="88" textAnchor="middle" fill="#64748B" fontSize="10">STORAGE</text>
    </g>
    {/* 负荷 */}
    <g transform="translate(610 165)">
      <path d="M0 90V0L42 23V90ZM42 90V41L76 57V90Z" fill="#9EBBD2" />
      {[[8,32],[20,44],[32,56],[50,58],[58,68]].map(([wx,wy],i)=>(
        <motion.rect key={i} x={wx} y={wy} width="8" height="10" rx="1.5" fill="#DCEFFB" animate={{ opacity: [.25, .95, .25] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }} />
      ))}
      <text x="36" y="112" textAnchor="middle" fill="#64748B" fontSize="10">LOAD</text>
    </g>
    {/* AI 能源核心 */}
    <g transform="translate(355 175)" filter="url(#case-shadow)">
      <motion.circle r="62" fill={accent} animate={{scale:[.94,1.08,.94],opacity:[.07,.16,.07]}} transition={{duration:2.2,repeat:Infinity}} />
      <motion.circle r="56" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 10" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
      <circle r="45" fill="#fff" stroke={accent} strokeWidth="2.5" />
      <text y="-3" textAnchor="middle" fill={accent} fontSize="17" fontWeight="800">AI</text>
      <text y="17" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="700">ENERGY CORE</text>
    </g>
    <motion.circle r="3.5" fill={accent}>
      <animateMotion dur="3.6s" repeatCount="indefinite" path="M355 119a56 56 0 1 1 -0.1 0" />
    </motion.circle>
    {/* 能量流 */}
    {[[95,194],[245,270],[555,282],[645,255]].map(([x,y],i)=>(
      <g key={i}>
        <motion.path d={`M${x} ${y}Q${(x+355)/2} ${y-55} 355 175`} fill="none" stroke={i===3?'#06B6D4':accent} strokeWidth="2.5" strokeDasharray="5 7" animate={{strokeDashoffset:[24,0],opacity:[.45,1,.45]}} transition={{duration:1.4,repeat:Infinity,ease:'linear',delay:i*.12}} />
        <motion.circle r="3" fill={i===3?'#06B6D4':accent} animate={{opacity:[.2,.9,.2]}}>
          <animateMotion dur={`${2+i*0.4}s`} repeatCount="indefinite" path={`M${x} ${y}Q${(x+355)/2} ${y-55} 355 175`} />
        </motion.circle>
      </g>
    ))}
    {/* 负荷预测卡 */}
    <g transform="translate(246 80)"><rect width="218" height="52" rx="15" fill="#fff" stroke="#CFE2EF" /><text x="18" y="23" fill="#64748B" fontSize="9">LOAD FORECAST</text><motion.path d="M18 39 52 31 84 34 116 20 150 26 198 14" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }} /><motion.circle cx="198" cy="14" r="3" fill="#10B981" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} /><text x="196" y="38" textAnchor="end" fill="#10B981" fontSize="9" fontWeight="700">BALANCED</text></g>
  </Frame>
}

export const EXPLORER_TABS: IndustryCase[] = [
  { id:'manufacturing', label:'制造', eyebrow:'SMART MANUFACTURING', title:'AI 视觉质检', summary:'工业相机持续采集产品图像，AI 实时定位缺陷，并联动产线完成自动分拣。', accent:'#2563EB', steps:['采集图像','缺陷识别','自动分拣'], statusLabel:'检测状态', status:'缺陷已识别', valueLabel:'响应动作', value:'自动分拣', keywords:['机器视觉','缺陷识别','质量控制','自动分拣'], Scene:ManufacturingScene },
  { id:'transport', label:'交通', eyebrow:'SMART MOBILITY', title:'AI 交通调度中枢', summary:'融合实时车流与路口状态，预测拥堵趋势，动态优化信号时长和车辆路径。', accent:'#0891B2', steps:['路况感知','拥堵预测','信号优化','路径疏导'], statusLabel:'通行效率', status:'持续提升', valueLabel:'拥堵风险', value:'动态下降', keywords:['车流感知','拥堵预测','信号控制','路径优化'], Scene:TransportScene },
  { id:'medical', label:'医疗', eyebrow:'AI HEALTHCARE', title:'AI 影像辅助诊断', summary:'AI 对医学影像进行扫描和特征分析，标记可疑病灶，为医生提供风险判断依据。', accent:'#0EA5C6', steps:['影像输入','病灶定位','风险分析','诊断建议'], statusLabel:'异常区域', status:'已发现', valueLabel:'输出方式', value:'辅助诊断建议', keywords:['医学影像','病灶识别','风险评估','辅助诊断'], Scene:MedicalScene },
  { id:'agriculture', label:'农业', eyebrow:'PRECISION AGRICULTURE', title:'AI 农业巡检', summary:'无人机采集农田影像，AI 分析作物长势和水分差异，输出精准干预建议。', accent:'#0FAD8C', steps:['空中采集','图像识别','长势分析','精准干预'], statusLabel:'巡检结果', status:'异常区域已识别', valueLabel:'推荐动作', value:'精准灌溉', keywords:['无人机巡检','作物识别','长势分析','精准干预'], Scene:AgricultureScene },
  { id:'energy', label:'能源', eyebrow:'INTELLIGENT ENERGY', title:'AI 能源调度', summary:'汇聚风电、光伏、储能和负荷数据，预测用能需求并动态平衡供需。', accent:'#089FA4', steps:['多源采集','负荷预测','供需匹配','智能调度'], statusLabel:'当前状态', status:'供需平衡优化', valueLabel:'输出动作', value:'动态分配', keywords:['负荷预测','供需匹配','能源优化','智能调度'], Scene:EnergyScene },
]
