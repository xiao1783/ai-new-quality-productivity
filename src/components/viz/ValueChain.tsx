import { useMemo, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { Filter, Gauge as GaugeIcon, RotateCcw, ScatterChart } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import EChart from '../charts/EChart'
import VizChartCard from './VizChartCard'
import { PALETTE } from '@/data/site'
import { makeFunnel, gaugeModel, GAUGE_COLORS } from '@/data/vizData'
import { INDUSTRIES } from '@/data/industryData'
import { INDUSTRY_SOCIAL } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

const baseTextStyle = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }
const FUNNEL_COLORS = [PALETTE.brand, PALETTE.brand2, PALETTE.cyan, PALETTE.teal, PALETTE.amber]
const GAUGE_DEFAULT = 60

export default function ValueChain() {
  const { lang, t, ta } = useLanguage()
  const [input, setInput] = useState(GAUGE_DEFAULT)
  const gauges = gaugeModel(input)
  const gaugeNames = ta('val.gaGauges')

  const funnelOption = useMemo<EChartsOption>(() => {
    const { data } = makeFunnel(lang)
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const item = p as { name: string; value: number; dataIndex: number }
          const rate = item.dataIndex === 0 ? '100%' : `${Math.round((item.value / data[item.dataIndex - 1].value) * 100)}%`
          return `${item.name}<br/>${lang === 'en' ? 'Index' : '指数'} ${item.value} · ${lang === 'en' ? 'stage conversion' : '环节转化'} ${rate}`
        },
      },
      series: [
        {
          type: 'funnel',
          data,
          sort: 'descending',
          gap: 3,
          minSize: '28%',
          maxSize: '100%',
          top: 10,
          bottom: 10,
          label: { show: true, position: 'inside', color: '#fff', fontWeight: 700, fontSize: 12.5, formatter: '{b} {c}' },
          labelLine: { show: false },
          itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 5 },
          color: FUNNEL_COLORS,
          emphasis: { label: { fontSize: 14 } },
        },
      ],
      animationDuration: 900,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const gaugeOption = useMemo<EChartsOption>(() => {
    return {
      textStyle: baseTextStyle,
      series: gauges.map((value, i) => ({
        type: 'gauge',
        center: [`${17 + i * 33}%`, '60%'],
        radius: '62%',
        min: 0,
        max: 100,
        startAngle: 210,
        endAngle: -30,
        progress: { show: true, width: 12, roundCap: true, itemStyle: { color: GAUGE_COLORS[i] } },
        axisLine: { lineStyle: { width: 12, color: [[1, '#EDF1F7']] } },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-8%'],
          fontSize: 30,
          fontWeight: 800,
          color: GAUGE_COLORS[i],
          formatter: '{value}',
        },
        title: { offsetCenter: [0, '30%'], fontSize: 12.5, color: PALETTE.body, fontWeight: 600 },
        data: [{ value, name: gaugeNames[i] }],
      })),
    }
  }, [lang, gauges, gaugeNames])

  const scatterOption = useMemo<EChartsOption>(() => {
    const dimJobs = 0
    const dimAccess = 1
    const dimInnovation = 5
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const item = p as { seriesName: string; value: number[] }
          return `<b>${item.seriesName}</b><br/>${t('val.scAxisX')}：${item.value[0]}<br/>${t('val.scAxisY')}：${item.value[1]}<br/>${ta('val.scJobs')}：${item.value[2]}`
        },
      },
      legend: {
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: PALETTE.body, fontSize: 11.5 },
        type: 'scroll',
      },
      grid: { left: 10, right: 24, top: 20, bottom: 56, containLabel: true },
      xAxis: {
        type: 'value',
        name: t('val.scAxisX'),
        nameLocation: 'middle',
        nameGap: 28,
        nameTextStyle: { color: PALETTE.muted, fontSize: 12, fontWeight: 600 },
        min: 55,
        max: 100,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        name: t('val.scAxisY'),
        nameLocation: 'middle',
        nameGap: 36,
        nameTextStyle: { color: PALETTE.muted, fontSize: 12, fontWeight: 600 },
        min: 65,
        max: 100,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      series: INDUSTRIES.map((ind) => {
        const scores = INDUSTRY_SOCIAL[ind.id as keyof typeof INDUSTRY_SOCIAL].scores
        const x = scores[dimInnovation]
        const y = scores[dimAccess]
        const jobs = scores[dimJobs]
        return {
          type: 'scatter',
          name: lang === 'en' ? ind.enName : ind.name,
          data: [[x, y, jobs]],
          symbolSize: (v: number[]) => 13 + v[2] * 0.36,
          itemStyle: {
            color: ind.color,
            opacity: 0.85,
            borderColor: '#fff',
            borderWidth: 2,
            shadowBlur: 8,
            shadowColor: `${ind.color}40`,
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 11,
            fontWeight: 700,
            color: ind.color,
            formatter: lang === 'en' ? ind.enName.split(' ')[0] : ind.name,
          },
          emphasis: { scale: 1.3, itemStyle: { opacity: 1 } },
        }
      }),
      animationDuration: 900,
    }
  }, [lang, t, ta])

  return (
    <section id="value" className="scene section-pad relative bg-canvas">
      <div className="container-x">
        <SectionHeading index="10" en="VALUE CHAIN" title={t('val.title')} subtitle={t('val.sub')} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <VizChartCard
              title={t('val.fnTitle')}
              sub={t('val.fnSub')}
              tag="simulation"
              accent={PALETTE.amber}
              takeaway={t('val.fnTk')}
            >
              <div className="mt-2 h-[380px]">
                <EChart option={funnelOption} />
              </div>
            </VizChartCard>
          </Reveal>

          <Reveal delay={0.08}>
            <VizChartCard
              title={t('val.gaTitle')}
              sub={t('val.gaSub')}
              tag="simulation"
              accent={PALETTE.teal}
              takeaway={t('val.gaTk')}
            >
              <div className="mt-3 flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <GaugeIcon size={17} />
                </span>
                <div className="flex-1">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-[13px] font-semibold text-ink">
                      <Filter size={13} className="mr-1 inline text-teal" />
                      {t('val.gaSlider')}
                    </label>
                    <span className="rounded-lg bg-teal/10 px-2.5 py-0.5 text-[13px] font-bold text-teal">{input}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={input}
                    className="slider"
                    aria-label={t('val.gaSlider')}
                    onChange={(e) => setInput(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, ${PALETTE.teal} ${input}%, #E2E8F0 ${input}%)`,
                    }}
                  />
                </div>
                <button type="button" className="btn btn-ghost shrink-0 !px-3 !py-2 !text-[12px]" onClick={() => setInput(GAUGE_DEFAULT)}>
                  <RotateCcw size={13} /> {t('c.reset')}
                </button>
              </div>
              <div className="h-[300px]">
                <EChart option={gaugeOption} />
              </div>
            </VizChartCard>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <VizChartCard
            title={t('val.scTitle')}
            sub={t('val.scSub')}
            tag="concept"
            accent={PALETTE.brand}
            takeaway={t('val.scTk')}
          >
            <div className="mt-2 h-[440px]">
              <EChart option={scatterOption} />
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-muted">
              <ScatterChart size={13} className="text-brand" />
              {lang === 'en'
                ? 'X = innovation, Y = service access, bubble size = job creation. Scores reuse the six-dimension concept matrix of the Industry section.'
                : '横轴=创新能力，纵轴=服务可及，气泡大小=就业带动。评分复用产业展区六维概念矩阵。'}
            </p>
          </VizChartCard>
        </Reveal>
      </div>
    </section>
  )
}
