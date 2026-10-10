import { useMemo } from 'react'
import type { EChartsOption } from 'echarts'
import EChart from '../charts/EChart'
import { PALETTE } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'

interface MiniStatBarsProps {
  labelsZh: string[]
  labelsEn: string[]
  values: number[]
  unitZh: string
  unitEn: string
  color?: string
  /** 多类别时的交替色，默认单色渐变 */
  colors?: string[]
  height?: number
}

/** 共享迷你横向条形图：用于 Hero 民生切换条、机制节点锚点 */
export default function MiniStatBars({
  labelsZh,
  labelsEn,
  values,
  unitZh,
  unitEn,
  color = PALETTE.teal,
  colors,
  height = 150,
}: MiniStatBarsProps) {
  const { lang } = useLanguage()
  const labels = lang === 'en' ? labelsEn : labelsZh
  const unit = lang === 'en' ? unitEn : unitZh

  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} ${unit}` },
      grid: { left: 4, right: 48, top: 6, bottom: 4, containLabel: true },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { show: false } },
      yAxis: {
        type: 'category',
        data: labels,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 11.5, width: 110, overflow: 'truncate' },
      },
      series: [
        {
          type: 'bar',
          barWidth: 13,
          label: {
            show: true,
            position: 'right',
            fontWeight: 700,
            fontSize: 11.5,
            color: PALETTE.ink,
            formatter: (p) => `${p.value}`,
          },
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: (p) => colors?.[p.dataIndex as number] ?? color,
          },
          data: values,
        },
      ],
      animationDuration: 600,
      animationDurationUpdate: 380,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, labels.join('|'), values.join('|'), unit],
  )

  return (
    <div style={{ height }}>
      <EChart option={option} />
    </div>
  )
}
