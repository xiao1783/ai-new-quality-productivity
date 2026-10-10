import { useCallback, useEffect, useMemo, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { AlertCircle, Loader2, MapPin, RotateCcw, Wifi } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import EChart from '../charts/EChart'
import VizChartCard from './VizChartCard'
import { PALETTE } from '@/data/site'
import {
  CHINA_INDEX,
  ROSE_ZH,
  ROSE_EN,
  ROSE_VALUES,
  ROSE_COLORS,
  chinaLevelName,
} from '@/data/vizData'
import {
  INDUSTRY_SOCIAL,
  INDUSTRY_SOCIAL_DIMS_ZH,
  INDUSTRY_SOCIAL_DIMS_EN,
  DIGITAL_DIVIDE,
  RENEWABLE_CAPACITY,
} from '@/data/socialData'
import { INDUSTRIES } from '@/data/industryData'
import { loadChinaMap } from '@/utils/chinaMap'
import { useLanguage } from '@/i18n/LanguageContext'

const baseTextStyle = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }

export default function Landscape() {
  const { lang, t } = useLanguage()
  const [mapReady, setMapReady] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [selected, setSelected] = useState<{ name: string; value: number } | null>(null)

  const bootMap = useCallback(() => {
    setMapError(false)
    loadChinaMap()
      .then(() => setMapReady(true))
      .catch(() => setMapError(true))
  }, [])

  useEffect(() => {
    bootMap()
  }, [bootMap])

  const onMapClick = useCallback((params: unknown) => {
    const name = (params as { name?: string }).name ?? ''
    if (name && name in CHINA_INDEX) {
      setSelected({ name, value: CHINA_INDEX[name] })
    }
  }, [])
  const mapEvents = useMemo(() => ({ click: onMapClick }), [onMapClick])

  const mapOption = useMemo<EChartsOption>(() => {
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const item = p as { name: string; value?: number }
          return item.value == null
            ? item.name
            : `${item.name}<br/>${lang === 'en' ? 'AI integration activity index' : 'AI 融合活跃度指数'}：<b>${item.value}</b><br/>${lang === 'en' ? 'Tier' : '等级'}：${chinaLevelName(item.value, lang)}`
        },
      },
      visualMap: {
        type: 'continuous',
        min: 40,
        max: 92,
        left: 12,
        bottom: 8,
        calculable: true,
        text: [lang === 'en' ? 'High' : '高', lang === 'en' ? 'Low' : '低'],
        textStyle: { color: PALETTE.muted, fontSize: 11 },
        inRange: { color: ['#DBEAFE', '#60A5FA', '#0F5BFB'] },
      },
      series: [
        {
          type: 'map',
          map: 'china',
          roam: true,
          zoom: 1.12,
          top: 12,
          bottom: 36,
          label: { show: false },
          itemStyle: { areaColor: '#E8EEF6', borderColor: '#fff', borderWidth: 0.6 },
          emphasis: {
            label: { show: true, color: '#fff', fontWeight: 700, fontSize: 11 },
            itemStyle: { areaColor: PALETTE.amber, shadowBlur: 12, shadowColor: 'rgba(15,23,42,0.25)' },
          },
          select: {
            label: { show: true, color: '#fff', fontWeight: 700 },
            itemStyle: { areaColor: PALETTE.rose },
          },
          selectedMode: false,
          data: Object.entries(CHINA_INDEX).map(([name, value]) => ({ name, value })),
        },
      ],
      animationDuration: 900,
    }
  }, [lang])

  const roseOption = useMemo<EChartsOption>(() => {
    const names = lang === 'zh' ? ROSE_ZH : ROSE_EN
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const item = p as { name: string; value: number; percent: number }
          return `${item.name}：${item.value}（${item.percent}%）`
        },
      },
      legend: { bottom: 0, type: 'scroll', itemWidth: 10, itemHeight: 10, textStyle: { color: PALETTE.body, fontSize: 11 } },
      series: [
        {
          type: 'pie',
          radius: ['16%', '70%'],
          center: ['50%', '44%'],
          roseType: 'area',
          data: names.map((name, i) => ({
            name,
            value: ROSE_VALUES[i],
            itemStyle: { color: ROSE_COLORS[i], borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
          })),
          label: { color: PALETTE.body, fontSize: 10.5, formatter: '{b} {c}' },
          labelLine: { length: 8, length2: 6 },
        },
      ],
      animationDuration: 900,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const parallelOption = useMemo<EChartsOption>(() => {
    const dims = lang === 'zh' ? INDUSTRY_SOCIAL_DIMS_ZH : INDUSTRY_SOCIAL_DIMS_EN
    return {
      textStyle: baseTextStyle,
      legend: {
        bottom: 0,
        type: 'scroll',
        itemWidth: 14,
        itemHeight: 8,
        textStyle: { color: PALETTE.body, fontSize: 11.5 },
      },
      parallel: { left: 64, right: 36, top: 34, bottom: 44, parallelAxisDefault: { nameTextStyle: { color: PALETTE.body, fontSize: 11.5, fontWeight: 600 } } },
      parallelAxis: dims.map((name, i) => ({
        dim: i,
        name,
        min: 50,
        max: 100,
        nameGap: 18,
        axisLine: { lineStyle: { color: PALETTE.line } },
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 10 },
      })),
      series: INDUSTRIES.map((ind) => ({
        type: 'parallel',
        name: lang === 'en' ? ind.enName : ind.name,
        lineStyle: { color: ind.color, width: 2.4, opacity: 0.72 },
        emphasis: { lineStyle: { width: 4, opacity: 1 } },
        inactiveOpacity: 0.12,
        data: [INDUSTRY_SOCIAL[ind.id as keyof typeof INDUSTRY_SOCIAL].scores],
      })),
      animationDuration: 900,
    }
  }, [lang])

  return (
    <section id="landscape" className="scene section-pad relative bg-canvas-2">
      <div className="container-x">
        <SectionHeading index="11" en="LANDSCAPE" title={t('geo.title')} subtitle={t('geo.sub')} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <VizChartCard
              title={t('geo.mapTitle')}
              sub={t('geo.mapSub')}
              tag="concept"
              accent={PALETTE.brand}
              takeaway={t('geo.mapTk')}
            >
              {/* 选中省份状态行 */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-canvas-2/60 px-4 py-2.5">
                {selected ? (
                  <span className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
                    <MapPin size={15} className="text-brand" />
                    {selected.name}
                    <span className="rounded-lg bg-brand/10 px-2 py-0.5 text-[13px] text-brand">{selected.value}</span>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11.5px] font-semibold text-muted">{chinaLevelName(selected.value, lang)}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-[12.5px] text-muted">
                    <MapPin size={14} /> {t('geo.mapPick')}
                  </span>
                )}
                {selected && (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[11.5px] font-semibold text-muted hover:text-brand"
                    onClick={() => setSelected(null)}
                  >
                    <RotateCcw size={12} /> {t('c.reset')}
                  </button>
                )}
              </div>

              {/* 地图 / 加载 / 失败 三态（同尺寸占位避免跳动） */}
              <div className="relative mt-2 h-[440px]">
                {mapReady && <EChart option={mapOption} onEvents={mapEvents} />}
                {!mapReady && !mapError && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-canvas-2/50 text-muted">
                    <Loader2 size={26} className="animate-spin text-brand" />
                    <span className="text-[13px]">{t('geo.mapLoading')}</span>
                  </div>
                )}
                {mapError && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-canvas-2/50 text-muted">
                    <AlertCircle size={26} className="text-rose-500" />
                    <span className="text-[13px]">{t('geo.mapFail')}</span>
                    <button type="button" className="btn btn-primary !px-4 !py-2 !text-[12.5px]" onClick={bootMap}>
                      <RotateCcw size={13} /> {t('geo.mapRetry')}
                    </button>
                  </div>
                )}
              </div>

              {/* 真实锚点 */}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2.5 rounded-2xl border border-brand/15 bg-brand/[0.04] px-4 py-3">
                  <Wifi size={15} className="mt-0.5 shrink-0 text-brand" />
                  <p className="text-[11.5px] leading-relaxed text-body">
                    {lang === 'en'
                      ? 'National internet penetration reached 79.7% (Jun 2025); urban-rural gap narrowed to 15.7 pct.'
                      : '全国互联网普及率 79.7%（2025.6），城乡差距收窄至 15.7 个百分点。'}
                    <span className="mt-1 block text-[10.5px] text-muted">{DIGITAL_DIVIDE[lang === 'en' ? 'sourceEn' : 'sourceZh']}</span>
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-2xl border border-teal/15 bg-teal/[0.05] px-4 py-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-teal" />
                  <p className="text-[11.5px] leading-relaxed text-body">
                    {lang === 'en'
                      ? 'Renewable capacity 1.889B kW, ~56% of total (end-2024).'
                      : '可再生能源装机 18.89 亿千瓦、约占总装机 56%（2024 底）。'}
                    <span className="mt-1 block text-[10.5px] text-muted">{RENEWABLE_CAPACITY[lang === 'en' ? 'sourceEn' : 'sourceZh']}</span>
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[10.5px] text-muted">
                {lang === 'en'
                  ? 'Map boundary: DataV.GeoAtlas (Alibaba). Provincial index values are teaching placeholders, not statistics.'
                  : '地图边界：DataV.GeoAtlas（阿里）。省级指数为教学示意值，非统计口径。'}
              </p>
            </VizChartCard>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <VizChartCard
              title={t('geo.rsTitle')}
              sub={t('geo.rsSub')}
              tag="concept"
              accent="#8B5CF6"
              className="h-full"
              takeaway={t('geo.rsTk')}
            >
              <div className="mt-2 h-[330px]">
                <EChart option={roseOption} />
              </div>
            </VizChartCard>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <VizChartCard
            title={t('geo.ppTitle')}
            sub={t('geo.ppSub')}
            tag="concept"
            accent={PALETTE.teal}
            takeaway={t('geo.ppTk')}
          >
            <div className="mt-2 h-[380px]">
              <EChart option={parallelOption} />
            </div>
          </VizChartCard>
        </Reveal>
      </div>
    </section>
  )
}
