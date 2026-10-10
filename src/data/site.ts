export const NAV_ITEMS = [
  { id: 'hero', label: '首页', en: 'Home' },
  { id: 'understand', label: '认知', en: 'Insight' },
  { id: 'mechanism', label: '机制', en: 'Mechanism' },
  { id: 'industry', label: '产业', en: 'Industry' },
  { id: 'efficiency', label: '效率', en: 'Efficiency' },
  { id: 'dashboard', label: '数据', en: 'Data' },
  { id: 'future', label: '未来', en: 'Future' },
  { id: 'lab', label: '实验室', en: 'Lab' },
  { id: 'sandbox', label: '沙盘', en: 'Sandbox' },
  { id: 'ecosystem', label: '生态', en: 'Ecosystem' },
  { id: 'value', label: '转化', en: 'Value' },
  { id: 'landscape', label: '区域', en: 'Regions' },
] as const

/** 统一图表配色 */
export const PALETTE = {
  brand: '#0F5BFB',
  brand2: '#257CF4',
  cyan: '#18B9EA',
  teal: '#13BFAF',
  ink: '#07122F',
  body: '#526681',
  muted: '#8DA2BA',
  line: '#D9E7F5',
  grid: 'rgba(15,23,42,0.06)',
  amber: '#F59E0B',
  rose: '#F43F5E',
}

export const CHART_FONT = {
  fontFamily:
    "Inter, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
}
