import * as echarts from 'echarts'

/**
 * 中国省级地图 GeoJSON 加载器（本地 public/maps/china.json，地理底图：DataV.GeoAtlas）。
 * 模块级 Promise 缓存：StrictMode 双挂载只发一次请求；失败时释放缓存以支持重试。
 */
let loading: Promise<void> | null = null

export function loadChinaMap(): Promise<void> {
  if (loading) return loading
  loading = fetch(`${import.meta.env.BASE_URL}maps/china.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`china map: ${response.status}`)
      return response.json()
    })
    .then((geo) => {
      echarts.registerMap('china', geo)
    })
    .catch((error) => {
      loading = null
      throw error
    })
  return loading
}
