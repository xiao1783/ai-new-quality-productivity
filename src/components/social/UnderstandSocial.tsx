import { useMemo, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { Factory, Cpu } from 'lucide-react'
import SocialPanel from './SocialPanel'
import EChart from '../charts/EChart'
import TakeawayNote from '../ui/TakeawayNote'
import SourceNote from '../ui/SourceNote'
import { PALETTE } from '@/data/site'
import { WELLBEING_DIMS_ZH, WELLBEING_DIMS_EN, WELLBEING_SCORES } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

export default function UnderstandSocial() {
  const { lang, t, ta } = useLanguage()
  const [mode, setMode] = useState<'traditional' | 'ai'>('ai')
  const dims = lang === 'en' ? WELLBEING_DIMS_EN : WELLBEING_DIMS_ZH

  const radarOption = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body },
      tooltip: {},
      legend: {
        bottom: 0,
        data: ta('sv.u.modes'),
        textStyle: { color: PALETTE.body, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 8,
      },
      radar: {
        radius: '62%',
        center: ['50%', '48%'],
        indicator: dims.map((name) => ({ name, max: 100 })),
        axisName: { color: PALETTE.body, fontSize: 12.5 },
        splitLine: { lineStyle: { color: PALETTE.line } },
        splitArea: { areaStyle: { color: ['#fff', '#F8FAFC'] } },
        axisLine: { lineStyle: { color: PALETTE.line } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: WELLBEING_SCORES.traditional,
              name: ta('sv.u.modes')[0],
              lineStyle: { color: '#94A3B8', width: 2, type: 'dashed' },
              itemStyle: { color: '#94A3B8' },
              areaStyle: { color: 'rgba(148,163,184,0.14)' },
              opacity: mode === 'traditional' ? 1 : 0.35,
            },
            {
              value: WELLBEING_SCORES.ai,
              name: ta('sv.u.modes')[1],
              lineStyle: { color: PALETTE.teal, width: 2.6 },
              itemStyle: { color: PALETTE.cyan },
              areaStyle: { color: 'rgba(19,191,175,0.18)' },
              opacity: mode === 'ai' ? 1 : 0.35,
            },
          ],
        },
      ],
      animationDurationUpdate: 450,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, mode, dims.join('|')],
  )

  return (
    <SocialPanel title={t('sv.u.title')} desc={t('sv.u.desc')} tag="concept">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[340px]">
          <EChart option={radarOption} />
        </div>
        <div className="flex flex-col gap-3">
          {/* 模式切换 */}
          <div className="flex rounded-2xl bg-canvas-2 p-1.5" role="group" aria-label={t('sv.u.title')}>
            {(['traditional', 'ai'] as const).map((m, i) => {
              const MIcon = m === 'traditional' ? Factory : Cpu
              const active = mode === m
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[13.5px] font-bold transition ${active ? 'bg-white text-teal shadow-sm' : 'text-muted hover:text-ink'}`}
                >
                  <MIcon size={16} /> {ta('sv.u.modes')[i]}
                </button>
              )
            })}
          </div>

          {/* 四维读数 */}
          <div className="grid flex-1 gap-2.5">
            {dims.map((dim, i) => {
              const tv = WELLBEING_SCORES.traditional[i]
              const av = WELLBEING_SCORES.ai[i]
              const cur = mode === 'ai' ? av : tv
              return (
                <div key={dim} className="rounded-xl border border-line/70 bg-canvas/60 px-4 py-2.5">
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-semibold text-body">{dim}</span>
                    <span className="font-black" style={{ color: mode === 'ai' ? PALETTE.teal : '#94A3B8' }}>
                      {cur}
                      <span className="ml-1 text-[10.5px] font-semibold text-muted">
                        ({tv} → {av})
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200/70">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${cur}%`,
                        background: mode === 'ai' ? `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.cyan})` : '#94A3B8',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <TakeawayNote className="mt-4" accent={PALETTE.teal}>
        {t('sv.u.tk')}
      </TakeawayNote>
      <SourceNote>
        {lang === 'en'
          ? 'Editorial concept model compiled from public material (not a statistical series); anchors: WEF Future of Jobs Report 2025 (+78M net jobs by 2030); NBS 2025 communiqué (+6.1% labor productivity)'
          : '编者综合公开资料构建的概念模型，非统计序列；真实锚点：WEF《Future of Jobs Report 2025》（2030 年净增 7,800 万岗位）、国家统计局（2025 年全员劳动生产率 +6.1%）'}
      </SourceNote>
    </SocialPanel>
  )
}
