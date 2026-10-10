import { useMemo } from 'react'
import type { EChartsOption } from 'echarts'
import { BarChart3, Quote } from 'lucide-react'
import SocialPanel from './SocialPanel'
import EChart from '../charts/EChart'
import CountUp from '../ui/CountUp'
import SourceNote from '../ui/SourceNote'
import TakeawayNote from '../ui/TakeawayNote'
import { PALETTE } from '@/data/site'
import {
  INDUSTRY_SOCIAL,
  INDUSTRY_SOCIAL_DIMS_ZH,
  INDUSTRY_SOCIAL_DIMS_EN,
  INDUSTRY_STATS,
} from '@/data/socialData'
import type { Industry } from '@/data/industryData'
import { useLanguage } from '@/i18n/LanguageContext'

export default function IndustrySocial({ industry }: { industry: Industry }) {
  const { lang, t } = useLanguage()
  const social = INDUSTRY_SOCIAL[industry.id]
  const dims = lang === 'en' ? INDUSTRY_SOCIAL_DIMS_EN : INDUSTRY_SOCIAL_DIMS_ZH
  const stat = social.statKey ? INDUSTRY_STATS[social.statKey] : undefined
  const color = industry.color

  const radarOption = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body },
      tooltip: {},
      radar: {
        radius: '66%',
        center: ['50%', '50%'],
        indicator: dims.map((name) => ({ name, max: 100 })),
        axisName: { color: PALETTE.body, fontSize: 11.5 },
        splitLine: { lineStyle: { color: PALETTE.line } },
        splitArea: { areaStyle: { color: ['#fff', '#F8FAFC'] } },
        axisLine: { lineStyle: { color: PALETTE.line } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: social.scores,
              name: lang === 'en' ? industry.enName : industry.name,
              lineStyle: { color, width: 2.4 },
              itemStyle: { color },
              areaStyle: { color: `${color}26` },
            },
          ],
        },
      ],
      animationDuration: 500,
      animationDurationUpdate: 450,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, industry.id, dims.join('|')],
  )

  return (
    <SocialPanel
      title={t('sv.i.title')}
      desc={t('sv.i.desc')}
      tag="concept"
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[320px]">
          <EChart option={radarOption} />
        </div>

        {/* 真实锚点 / 定性卡 */}
        <div className="flex flex-col justify-center gap-4">
          {stat ? (
            <div className="rounded-2xl border p-5" style={{ borderColor: `${color}33`, background: `${color}0A` }}>
              <p className="flex items-center gap-2 text-[12.5px] font-bold" style={{ color }}>
                <BarChart3 size={15} /> {lang === 'en' ? 'VERIFIED ANCHOR' : '真实数据锚点'}
              </p>
              <p className="mt-3 text-[34px] font-black leading-none text-ink">
                <CountUp
                  key={lang + industry.id}
                  end={stat.value}
                  decimals={stat.decimals}
                  suffix={lang === 'en' ? stat.suffixEn : stat.suffixZh}
                />
              </p>
              <p className="mt-2.5 text-[13px] font-semibold leading-relaxed text-body">
                {lang === 'en' ? stat.labelEn : stat.labelZh}
              </p>
              <SourceNote className="mt-3">{lang === 'en' ? stat.source.sourceEn : stat.source.source}</SourceNote>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center rounded-2xl border border-line/70 bg-canvas/60 p-5">
              <Quote size={20} className="text-teal" />
              <p className="mt-3 text-[14px] font-semibold leading-relaxed text-ink">
                {lang === 'en'
                  ? `${industry.enName} is reshaping access to services and everyday experience. A verified sector-wide anchor for this domain is being compiled; the radar on the left presents the editorial concept model only.`
                  : `${industry.name}正在重塑服务可及性与日常生活体验。该领域的全行业权威统一口径仍在完善，左侧雷达为编者综合的概念模型。`}
              </p>
            </div>
          )}
        </div>
      </div>

      <TakeawayNote className="mt-4" accent={color}>
        {t('sv.i.tk')}
      </TakeawayNote>
    </SocialPanel>
  )
}
