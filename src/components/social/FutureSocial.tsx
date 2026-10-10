import { useEffect, useMemo, useRef, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { motion } from 'framer-motion'
import { Pause, Play, RotateCcw, Sparkles } from 'lucide-react'
import SocialPanel from './SocialPanel'
import EChart from '../charts/EChart'
import SourceNote from '../ui/SourceNote'
import TakeawayNote from '../ui/TakeawayNote'
import { PALETTE } from '@/data/site'
import { SOCIAL_TIMELINE } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

/** 把当前播放位置之后的数据置空，实现折线「生长」 */
function visible<T>(arr: (T | null)[], idx: number): (T | null)[] {
  return arr.map((v, i) => (i <= idx ? v : null))
}

export default function FutureSocial() {
  const { lang, t } = useLanguage()
  const years = SOCIAL_TIMELINE.years
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!playing) return
    if (idx >= years.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setIdx((i) => Math.min(i + 1, years.length - 1)), 1150)
    return () => window.clearTimeout(timer.current)
  }, [playing, idx, years.length])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const option = useMemo<EChartsOption>(() => {
    const showForecastArea = idx >= 2
    return {
      textStyle: { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (v) => (v == null ? '-' : `${v}`),
      },
      legend: {
        top: 0,
        itemWidth: 16,
        itemHeight: 9,
        textStyle: { color: PALETTE.body, fontSize: 11.5 },
        data: [
          lang === 'en' ? 'Aging rate · actual' : '老龄化率 · 实测',
          lang === 'en' ? 'Aging rate · outlook' : '老龄化率 · 展望',
          lang === 'en' ? 'Renewable capacity' : '可再生装机',
        ],
      },
      grid: { left: 8, right: 14, top: 44, bottom: 10, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: years,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12.5 },
      },
      yAxis: [
        {
          type: 'value',
          name: lang === 'en' ? '% aged 60+' : '60岁以上占比 %',
          nameTextStyle: { color: PALETTE.muted, fontSize: 10.5, padding: [0, 0, 0, 4] },
          min: 0,
          max: 34,
          splitLine: { lineStyle: { color: PALETTE.grid } },
          axisLabel: { color: PALETTE.muted, fontSize: 10, formatter: '{value}%' },
        },
        {
          type: 'value',
          name: lang === 'en' ? '100M kW' : '亿千瓦',
          nameTextStyle: { color: PALETTE.muted, fontSize: 10.5 },
          min: 0,
          max: 22,
          splitLine: { show: false },
          axisLabel: { color: PALETTE.muted, fontSize: 10 },
        },
      ],
      series: [
        {
          name: lang === 'en' ? 'Aging rate · actual' : '老龄化率 · 实测',
          type: 'line',
          symbolSize: 9,
          lineStyle: { width: 3, color: PALETTE.rose },
          itemStyle: { color: PALETTE.rose },
          label: {
            show: true,
            position: 'top',
            fontWeight: 800,
            fontSize: 11.5,
            color: PALETTE.rose,
            formatter: (p) => (p.value == null ? '' : `${p.value}%`),
          },
          data: visible(SOCIAL_TIMELINE.agingActual, idx),
        },
        {
          name: lang === 'en' ? 'Aging rate · outlook' : '老龄化率 · 展望',
          type: 'line',
          connectNulls: true,
          symbolSize: 9,
          lineStyle: { width: 2.5, type: 'dashed', color: '#FB7185' },
          itemStyle: { color: '#FB7185' },
          label: {
            show: true,
            position: 'top',
            fontWeight: 800,
            fontSize: 11.5,
            color: '#E11D48',
            formatter: (p) => (p.value == null ? '' : `${p.value}%`),
          },
          data: visible(SOCIAL_TIMELINE.agingForecast, idx),
          markArea: showForecastArea
            ? {
                silent: true,
                itemStyle: { color: 'rgba(245,158,11,0.07)' },
                label: {
                  position: 'insideTop',
                  color: '#D97706',
                  fontSize: 10.5,
                  fontWeight: 700,
                  formatter: lang === 'en' ? 'OUTLOOK ZONE' : '展望区间',
                },
                data: [[{ xAxis: '2025' }, { xAxis: '2035' }]],
              }
            : undefined,
        },
        {
          name: lang === 'en' ? 'Renewable capacity' : '可再生装机',
          type: 'line',
          yAxisIndex: 1,
          symbolSize: 9,
          smooth: false,
          lineStyle: { width: 3, color: PALETTE.teal },
          itemStyle: { color: PALETTE.teal },
          areaStyle: { color: 'rgba(19,191,175,0.10)' },
          label: {
            show: true,
            position: 'bottom',
            fontWeight: 800,
            fontSize: 11.5,
            color: '#0F9488',
            formatter: (p) => (p.value == null ? '' : `${p.value}`),
          },
          data: visible(SOCIAL_TIMELINE.renewable, idx),
        },
      ],
      animationDuration: 720,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, idx])

  const genaiPoints = [
    { year: '2024.12', value: 2.49, reached: idx >= 1 },
    { year: '2025.6', value: 5.15, reached: idx >= 2 },
  ]

  return (
    <SocialPanel
      title={t('sv.f.title')}
      desc={t('sv.f.desc')}
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-primary !py-2 !text-[12.5px]"
            onClick={() => {
              if (idx >= years.length - 1 && !playing) setIdx(0)
              setPlaying((p) => !p)
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? (lang === 'en' ? 'Pause' : '暂停') : lang === 'en' ? 'Play' : '播放'}
          </button>
          <button
            type="button"
            className="btn btn-ghost !py-2 !text-[12.5px]"
            onClick={() => {
              setPlaying(false)
              setIdx(0)
            }}
          >
            <RotateCcw size={14} /> {t('c.reset')}
          </button>
        </div>
      }
    >
      {/* 年份轨 */}
      <div className="flex items-center gap-1.5">
        {years.map((y, i) => {
          const active = i <= idx
          const current = i === idx
          return (
            <button
              key={y}
              type="button"
              onClick={() => {
                setPlaying(false)
                setIdx(i)
              }}
              className="group relative flex-1"
              aria-label={`${y}`}
            >
              <span
                className={`block h-1.5 rounded-full transition-colors ${active ? 'bg-gradient-to-r from-teal to-cyan' : 'bg-slate-200 group-hover:bg-slate-300'}`}
              />
              <span
                className={`mt-2 block text-center text-[11.5px] font-bold transition-colors ${
                  current ? 'text-teal' : active ? 'text-body' : 'text-slate-400'
                }`}
              >
                {y}
              </span>
              {current && (
                <motion.span
                  layoutId="futureSocialDot"
                  className="absolute -top-[5px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-teal shadow"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5 h-[330px]">
        <EChart option={option} />
      </div>

      {/* 生成式 AI 用户：仅实测里程碑，不外推 */}
      <div className="mt-2 flex flex-wrap items-center gap-3 rounded-2xl border border-brand/15 bg-brand/[0.04] px-4 py-3">
        <span className="flex items-center gap-1.5 text-[12px] font-bold text-brand">
          <Sparkles size={14} />
          {lang === 'en' ? 'Generative AI users (measured only, no extrapolation)' : '生成式 AI 用户（仅实测，不外推）'}
        </span>
        {genaiPoints.map((p) => (
          <span
            key={p.year}
            className={`rounded-lg px-2.5 py-1 text-[12px] font-semibold transition ${
              p.reached ? 'bg-white text-ink shadow-sm' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {p.year} · <b>{p.value}</b> {lang === 'en' ? '×100M' : '亿人'}
          </span>
        ))}
      </div>

      <TakeawayNote className="mt-4" accent={PALETTE.teal}>
        {t('sv.f.tk')}
      </TakeawayNote>
      <SourceNote>
        {lang === 'en'
          ? `${SOCIAL_TIMELINE.agingActualSource.replace(/[；;]/g, '; ')}; outlook: ${SOCIAL_TIMELINE.agingForecastSource}; renewable: ${SOCIAL_TIMELINE.renewableSource}; GenAI: ${SOCIAL_TIMELINE.genaiSource}`
          : `${SOCIAL_TIMELINE.agingActualSource}；展望依据：${SOCIAL_TIMELINE.agingForecastSource}；可再生：${SOCIAL_TIMELINE.renewableSource}；生成式 AI：${SOCIAL_TIMELINE.genaiSource}`}
      </SourceNote>
    </SocialPanel>
  )
}
