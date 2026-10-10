import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface EChartProps {
  option: echarts.EChartsOption
  className?: string
  style?: React.CSSProperties
  /** 延迟渲染（ms），用于等待容器布局 */
  delay?: number
  /** 事件名 → 处理函数（如 { click: (params) => ... }），每次 option 更新后重新绑定 */
  onEvents?: Record<string, (params: unknown) => void>
}

/** ECharts 通用封装：自动初始化、resize、销毁 */
export default function EChart({ option, className, style, delay = 0, onEvents }: EChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (!ref.current) return

    const init = () => {
      if (!chartRef.current) {
        chartRef.current = echarts.init(ref.current!)
      }
      chartRef.current.setOption(option, true)
      if (onEvents) {
        Object.entries(onEvents).forEach(([eventName, handler]) => {
          chartRef.current?.on(eventName, handler as (params: unknown) => void)
        })
      }
    }
    timer = setTimeout(init, delay)

    const ro = new ResizeObserver(() => {
      chartRef.current?.resize()
    })
    ro.observe(ref.current)

    const onResize = () => chartRef.current?.resize()
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(timer)
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      chartRef.current?.dispose()
      chartRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, onEvents])

  return <div ref={ref} className={className} style={{ width: '100%', height: '100%', ...style }} />
}
