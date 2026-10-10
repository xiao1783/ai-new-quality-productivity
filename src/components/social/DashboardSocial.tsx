import { useMemo, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { AnimatePresence, motion } from 'framer-motion'
import SocialPanel from './SocialPanel'
import EChart from '../charts/EChart'
import SourceNote from '../ui/SourceNote'
import TakeawayNote from '../ui/TakeawayNote'
import { PALETTE } from '@/data/site'
import { DIGITAL_DIVIDE, FDA_DEVICES, RENEWABLE_CAPACITY, WEF_JOBS_SOCIAL } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

type TabId = 'inclusion' | 'medical' | 'green' | 'jobs'

export default function DashboardSocial() {
  const { lang, t, ta } = useLanguage()
  const [tab, setTab] = useState<TabId>('inclusion')

  const ts = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }

  const inclusionOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v}%` },
      legend: { bottom: 0, textStyle: { color: PALETTE.body, fontSize: 12 } },
      grid: { left: 8, right: 12, top: 30, bottom: 36, containLabel: true },
      xAxis: {
        type: 'category',
        data: DIGITAL_DIVIDE.years,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12 },
      },
      yAxis: { type: 'value', max: 100, splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10, formatter: '{value}%' } },
      series: [
        {
          name: lang === 'en' ? 'Urban' : '城镇',
          type: 'bar',
          barWidth: 30,
          label: { show: true, position: 'top', fontWeight: 700, fontSize: 12, color: PALETTE.ink, formatter: (p) => `${p.value}%` },
          itemStyle: { borderRadius: [7, 7, 0, 0], color: PALETTE.brand2 },
          data: DIGITAL_DIVIDE.urban,
        },
        {
          name: lang === 'en' ? 'Rural' : '农村',
          type: 'bar',
          barWidth: 30,
          label: { show: true, position: 'top', fontWeight: 700, fontSize: 12, color: PALETTE.ink, formatter: (p) => `${p.value}%` },
          itemStyle: { borderRadius: [7, 7, 0, 0], color: PALETTE.teal },
          data: DIGITAL_DIVIDE.rural,
        },
      ],
      animationDuration: 800,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )

  const medicalOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} ${lang === 'en' ? 'devices' : '个'}` },
      grid: { left: 8, right: 24, top: 30, bottom: 8, containLabel: true },
      xAxis: {
        type: 'category',
        data: FDA_DEVICES.years,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12.5 },
      },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10 } },
      series: [
        {
          type: 'bar',
          barWidth: 56,
          label: { show: true, position: 'top', fontWeight: 800, fontSize: 15, color: PALETTE.ink },
          itemStyle: {
            borderRadius: [9, 9, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: PALETTE.cyan }, { offset: 1, color: PALETTE.brand2 }] },
          },
          data: FDA_DEVICES.values,
        },
      ],
      animationDuration: 800,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )

  const greenOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} ${lang === 'en' ? '100M kW' : '亿千瓦'}` },
      grid: { left: 8, right: 24, top: 30, bottom: 8, containLabel: true },
      xAxis: {
        type: 'category',
        data: RENEWABLE_CAPACITY.years,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12.5 },
      },
      yAxis: { type: 'value', max: 22, splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10 } },
      series: [
        {
          type: 'bar',
          barWidth: 56,
          label: { show: true, position: 'top', fontWeight: 800, fontSize: 14, color: PALETTE.ink },
          itemStyle: {
            borderRadius: [9, 9, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#34D399' }, { offset: 1, color: PALETTE.teal }] },
          },
          data: RENEWABLE_CAPACITY.values,
          markLine: undefined,
        },
      ],
      animationDuration: 800,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )

  const jobsOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: (v) => `${v} ${lang === 'en' ? 'million' : '百万个'}`,
      },
      grid: { left: 8, right: 30, top: 24, bottom: 8, containLabel: true },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 10 },
      },
      yAxis: {
        type: 'category',
        data: ta('sv.d.jobsCats'),
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12.5 },
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          label: {
            show: true,
            position: 'right',
            fontWeight: 800,
            fontSize: 13,
            color: PALETTE.ink,
            formatter: (p) => (Number(p.value) > 0 ? `+${p.value}` : `${p.value}`),
          },
          itemStyle: {
            borderRadius: 6,
            color: (p) => [PALETTE.brand, PALETTE.rose, PALETTE.teal][p.dataIndex as number],
          },
          data: [WEF_JOBS_SOCIAL.created, WEF_JOBS_SOCIAL.displaced, WEF_JOBS_SOCIAL.net],
        },
      ],
      animationDuration: 800,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )

  const TABS: { id: TabId }[] = [{ id: 'inclusion' }, { id: 'medical' }, { id: 'green' }, { id: 'jobs' }]
  const tabIdx = TABS.findIndex((x) => x.id === tab)

  const chartMap: Record<TabId, { option: EChartsOption; subZh: string; subEn: string; tkZh: string; tkEn: string; sourceZh: string; sourceEn: string; h: number }> = {
    inclusion: {
      option: inclusionOption,
      subZh: '城镇 84.9% / 农村 69.2%（2025.6），差距由 23.9 收窄至 15.7 个百分点',
      subEn: 'Urban 84.9% / rural 69.2% (Jun 2025); gap narrowed from 23.9 to 15.7 pct',
      tkZh: ta('sv.d.tks')[0],
      tkEn: ta('sv.d.tksEn')[0],
      sourceZh: DIGITAL_DIVIDE.sourceZh,
      sourceEn: DIGITAL_DIVIDE.sourceEn,
      h: 320,
    },
    medical: {
      option: medicalOption,
      subZh: '美国 FDA 当年批准 AI 医疗器械数：2015 年 6 个 → 2023 年 223 个',
      subEn: 'AI medical devices authorized per year by U.S. FDA: 6 (2015) → 223 (2023)',
      tkZh: ta('sv.d.tks')[1],
      tkEn: ta('sv.d.tksEn')[1],
      sourceZh: FDA_DEVICES.sourceZh,
      sourceEn: FDA_DEVICES.sourceEn,
      h: 320,
    },
    green: {
      option: greenOption,
      subZh: `可再生能源装机 9.34 → 18.89 亿千瓦，2024 年占总装机约 ${RENEWABLE_CAPACITY.share2024}%`,
      subEn: `Renewable capacity 9.34 → 18.89 (100M kW), about ${RENEWABLE_CAPACITY.share2024}% of total in 2024`,
      tkZh: ta('sv.d.tks')[2],
      tkEn: ta('sv.d.tksEn')[2],
      sourceZh: RENEWABLE_CAPACITY.sourceZh,
      sourceEn: RENEWABLE_CAPACITY.sourceEn,
      h: 320,
    },
    jobs: {
      option: jobsOption,
      subZh: '2025–2030 年：创造 1.70 亿、替代 0.92 亿、净增 0.78 亿个岗位',
      subEn: '2025–2030: 170M created, 92M displaced, net +78M jobs',
      tkZh: ta('sv.d.tks')[3],
      tkEn: ta('sv.d.tksEn')[3],
      sourceZh: WEF_JOBS_SOCIAL.sourceZh,
      sourceEn: WEF_JOBS_SOCIAL.sourceEn,
      h: 300,
    },
  }
  const cur = chartMap[tab]

  return (
    <SocialPanel title={t('sv.d.title')} desc={t('sv.d.desc')}>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {TABS.map((tb, i) => (
            <button
              key={tb.id}
              type="button"
              onClick={() => setTab(tb.id)}
              className={`relative rounded-xl px-5 py-2.5 text-[13px] font-semibold transition ${tab === tb.id ? 'text-white' : 'bg-canvas-2 text-body hover:text-teal'}`}
            >
              {tab === tb.id && (
                <motion.span
                  layoutId="dashSocialTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal to-cyan shadow-[0_7px_16px_rgba(19,191,175,.25)]"
                  transition={{ duration: 0.22 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{ta('sv.d.tabs')[i]}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang + tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          <h4 className="text-[15.5px] font-bold text-ink">{ta('sv.d.chartTitles')[tabIdx]}</h4>
          <p className="mt-1 text-[12.5px] text-muted">{lang === 'en' ? cur.subEn : cur.subZh}</p>
          <div className="mt-2" style={{ height: cur.h }}>
            <EChart option={cur.option} />
          </div>
          <TakeawayNote accent={PALETTE.teal}>{lang === 'en' ? cur.tkEn : cur.tkZh}</TakeawayNote>
          <SourceNote>{lang === 'en' ? cur.sourceEn : cur.sourceZh}</SourceNote>
        </motion.div>
      </AnimatePresence>
    </SocialPanel>
  )
}
