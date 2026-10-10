import { useMemo } from 'react'
import type { EChartsOption } from 'echarts'
import { Network, Share2, LayoutGrid } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import EChart from '../charts/EChart'
import VizChartCard from './VizChartCard'
import { PALETTE } from '@/data/site'
import { makeSankey, makeGraph, makeTreemap, GRAPH_COLORS } from '@/data/vizData'
import { WEF_JOBS_SOCIAL } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

const baseTextStyle = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }
const LAYER_COLORS = [PALETTE.brand, PALETTE.cyan, PALETTE.teal, PALETTE.amber]

export default function Ecosystem() {
  const { lang, t } = useLanguage()

  const sankeyOption = useMemo<EChartsOption>(() => {
    const { nodes, links } = makeSankey(lang)
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'sankey',
          data: nodes.map((n) => ({ ...n, itemStyle: { color: LAYER_COLORS[n.depth], borderColor: '#fff', borderWidth: 1, borderRadius: 3 } })),
          links,
          nodeAlign: 'justify',
          nodeWidth: 14,
          nodeGap: 10,
          top: 8,
          bottom: 8,
          left: 4,
          right: 18,
          emphasis: { focus: 'adjacency' },
          lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.4 },
          label: { color: PALETTE.ink, fontSize: 11.5, fontWeight: 600 },
        },
      ],
      animationDuration: 900,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const graphOption = useMemo<EChartsOption>(() => {
    const { categories, nodes, links } = makeGraph(lang)
    return {
      textStyle: baseTextStyle,
      tooltip: {},
      legend: {
        top: 0,
        itemWidth: 12,
        itemHeight: 8,
        textStyle: { color: PALETTE.body, fontSize: 12 },
        data: categories.map((c) => c.name),
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: nodes.map((n) => ({ ...n, label: { show: true } })),
          links,
          categories: categories.map((c, i) => ({ ...c, itemStyle: { color: GRAPH_COLORS[i] } })),
          roam: true,
          draggable: true,
          top: 40,
          bottom: 10,
          label: { position: 'right', fontSize: 11.5, color: PALETTE.body, fontWeight: 600 },
          force: { repulsion: 300, gravity: 0.07, edgeLength: [55, 130], friction: 0.18 },
          lineStyle: { color: 'source', curveness: 0.18, opacity: 0.4, width: 1.5 },
          emphasis: { focus: 'adjacency', lineStyle: { width: 3, opacity: 0.8 } },
          itemStyle: { borderColor: '#fff', borderWidth: 1.5, shadowBlur: 8, shadowColor: 'rgba(15,23,42,0.12)' },
        },
      ],
      animationDuration: 1000,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const treemapOption = useMemo<EChartsOption>(() => {
    const { data } = makeTreemap(lang)
    return {
      textStyle: baseTextStyle,
      tooltip: {
        formatter: (info) => {
          const p = info as { name: string; value: number | number[] }
          const v = Array.isArray(p.value) ? p.value[0] : p.value
          return `${p.name}：${v}${lang === 'en' ? ' (concept weight)' : '（概念权重）'}`
        },
      },
      series: [
        {
          type: 'treemap',
          data,
          nodeClick: 'zoomToNode',
          width: '100%',
          height: '100%',
          top: 6,
          bottom: 26,
          breadcrumb: { show: true, bottom: 0, itemStyle: { color: '#E2E8F0' }, textStyle: { color: PALETTE.body, fontSize: 11 } },
          label: { show: true, formatter: '{b}', fontSize: 12, fontWeight: 600, color: '#fff' },
          upperLabel: { show: true, height: 22, color: '#fff', fontWeight: 700, fontSize: 12 },
          levels: [
            { itemStyle: { borderColor: '#fff', borderWidth: 4, gapWidth: 4, borderRadius: 6 }, color: [PALETTE.brand, PALETTE.teal, PALETTE.amber] },
            { colorSaturation: [0.5, 0.78], itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2, borderRadius: 4 } },
          ],
        },
      ],
      animationDuration: 900,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return (
    <section id="ecosystem" className="scene section-pad relative bg-canvas-2">
      <div className="container-x">
        <SectionHeading index="09" en="ECOSYSTEM" title={t('eco.title')} subtitle={t('eco.sub')} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <VizChartCard
              title={t('eco.skTitle')}
              sub={t('eco.skSub')}
              tag="concept"
              accent={PALETTE.brand}
              takeaway={t('eco.skTk')}
            >
              <div className="mt-2 h-[420px]">
                <EChart option={sankeyOption} />
              </div>
            </VizChartCard>
          </Reveal>

          <Reveal delay={0.08}>
            <VizChartCard
              title={t('eco.tmTitle')}
              sub={t('eco.tmSub')}
              tag="concept"
              accent={PALETTE.teal}
              takeaway={t('eco.tmTk')}
            >
              <div className="mt-2 h-[300px]">
                <EChart option={treemapOption} />
              </div>
              {/* 真实锚点：与概念结构并存的可核实事实 */}
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-brand/15 bg-brand/[0.04] px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <LayoutGrid size={17} />
                </span>
                <p className="text-[12px] leading-relaxed text-body">
                  <b className="text-[17px] text-brand">
                    +<CountUp end={WEF_JOBS_SOCIAL.net} />
                    {lang === 'en' ? 'M' : ' 百万'}
                  </b>
                  {'　'}
                  {lang === 'en'
                    ? 'net new jobs globally by 2030 (WEF) — a real anchor behind the structural model.'
                    : '2030 年全球净新增岗位（世界经济论坛）——概念结构背后的真实锚点。'}
                </p>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">{WEF_JOBS_SOCIAL[lang === 'en' ? 'sourceEn' : 'sourceZh']}</p>
            </VizChartCard>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <VizChartCard
            title={t('eco.gpTitle')}
            sub={t('eco.gpSub')}
            tag="concept"
            accent="#8B5CF6"
            takeaway={t('eco.gpTk')}
          >
            <div className="mt-2 flex h-[480px] items-center justify-center rounded-2xl bg-canvas-2/50">
              <div className="h-full w-full">
                <EChart option={graphOption} />
              </div>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-muted">
              <Share2 size={13} className="text-violet-500" />
              <Network size={13} className="-ml-0.5 text-violet-500" />
              {lang === 'en'
                ? 'Drag nodes, scroll to zoom, click a node to highlight its connections.'
                : '可拖动节点、滚轮缩放，点击节点高亮其关联边。'}
            </p>
          </VizChartCard>
        </Reveal>
      </div>
    </section>
  )
}
