/**
 * 真实权威数据集
 * 全部数据均来自权威机构公开发布的报告与统计公报（来源见 DATA_SOURCES）。
 * 注意：AI 生产力模拟器与 AI 实验室为教学交互模拟，不在此列。
 */

export interface HeroStat {
  icon: 'users' | 'trend' | 'badge'
  value: string
  label: string
}

export interface KpiStat {
  icon: 'trend' | 'globe' | 'gauge' | 'factory'
  value: number | string
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
}

/* ---------- 首页 Hero 关键指标 ---------- */

export const HERO_STATS: HeroStat[] = [
  { icon: 'users', value: '5.15亿', label: '生成式AI用户规模（2025.6）' },
  { icon: 'trend', value: '1.2万亿', label: 'AI产业规模·元（2025）' },
  { icon: 'badge', value: '70%', label: '生成式AI专利中国占比（WIPO）' },
]

export const HERO_STATS_SOURCE =
  '数据来源：CNNIC《生成式人工智能应用发展报告（2025）》· 中国信通院（2026.8 发布）· WIPO《生成式人工智能专利态势报告（2024）》'

/* ---------- 04 效率展区：KPI ---------- */

export const EFFICIENCY_KPIS: KpiStat[] = [
  {
    icon: 'trend',
    value: '2.6~4.4',
    suffix: '',
    label: '生成式AI每年全球经济增值潜力（万亿美元，上限）',
  },
  {
    icon: 'globe',
    value: 15.7,
    decimals: 1,
    suffix: '',
    label: 'AI 到 2030 年全球经济贡献（万亿美元，预测）',
  },
  {
    icon: 'gauge',
    value: 6.1,
    decimals: 1,
    prefix: '+',
    suffix: '%',
    label: '中国全员劳动生产率年增速（2025）',
  },
  {
    icon: 'factory',
    value: 470,
    suffix: ' 台',
    label: '中国制造业机器人密度 / 万人（2023）',
  },
]

/* 世界经济论坛《Future of Jobs Report 2025》（2025.1）：到 2030 年 */
export const WEF_JOBS = {
  unit: '百万个',
  categories: ['新创造岗位', '被替代岗位', '净新增岗位'],
  values: [170, 92, 78],
  source: '世界经济论坛《Future of Jobs Report 2025》（2025.1）· 预测区间 2025–2030',
}

/* 麦肯锡 MGI 2023.6 / 普华永道 2017.6：AI 经济价值测算（万亿美元） */
export interface ValueEstimate {
  name: string
  sub: string
  low: number
  high: number
  kind: 'range' | 'point'
}

export const AI_VALUE_ESTIMATES: ValueEstimate[] = [
  { name: '生成式AI · 年增值潜力', sub: '麦肯锡 MGI（2023.6）', low: 2.6, high: 4.4, kind: 'range' },
  { name: 'AI 到2030年全球GDP贡献', sub: '普华永道《Sizing the Prize》（2017.6）', low: 15.7, high: 15.7, kind: 'point' },
  { name: '传统 AI 与分析 · 年增值潜力', sub: '麦肯锡 MGI（2023.6）', low: 13.6, high: 22.1, kind: 'range' },
]

/* ---------- 07 数据驾驶舱：中国关键指标 ---------- */

export const DASHBOARD_KPIS: KpiStat[] = [
  { icon: 'trend', value: 1.2, decimals: 1, suffix: ' 万亿元+', label: '中国AI产业规模（2025）' },
  { icon: 'globe', value: 5.15, decimals: 2, suffix: ' 亿人', label: '生成式AI用户规模（2025.6）' },
  { icon: 'factory', value: 6600, suffix: ' 家+', label: '人工智能企业数量（2026.6）' },
  { icon: 'gauge', value: 611, suffix: ' 款', label: '已备案大模型（2025.11）' },
]

/* 斯坦福 HAI《AI Index Report 2025》（2025.4）：2024 年全球私人 AI 投资（亿美元） */
export const AI_INVESTMENT = {
  year: 2024,
  unit: '亿美元',
  items: [
    { name: '美国', value: 1091 },
    { name: '其他地区', value: 279, note: '按全球私人投资总额差额推算' },
    { name: '中国', value: 93 },
    { name: '英国', value: 45 },
  ],
  total: 1508,
  source: '斯坦福 HAI《AI Index Report 2025》（2025.4）· 2024 年全球私人 AI 投资 1,508 亿美元；「其他地区」为总额减美国、中国、英国后推算',
}

/* IFR《World Robotics 2024》（2024.11）：制造业机器人密度（台 / 万名员工，2023） */
export const ROBOT_DENSITY = {
  categories: ['全球平均', '中国', '新加坡', '韩国'],
  values: [162, 470, 770, 1012],
  source: 'IFR《World Robotics 2024》（2024.11）· 2023 年，中国居全球第三',
}

/* 国家统计局历年国民经济和社会发展统计公报：全员劳动生产率（元/人） */
export const LABOR_PRODUCTIVITY = {
  years: ['2024', '2025'],
  values: [173898, 184413],
  growth: '+6.1%',
  source: '国家统计局《2025年国民经济和社会发展统计公报》（2026.2 发布）',
}

/* 中国信通院：AI 产业规模（亿元） */
export const INDUSTRY_SCALE = {
  years: ['2024', '2025'],
  values: [9000, 12000],
  labels: ['超 9,000 亿元', '超 1.2 万亿元'],
  growth: '+40%',
  source: '中国信通院《人工智能产业发展研究报告（2025）》（2025.9）及深度观察发布会（2026.8）',
}

/* CNNIC《生成式人工智能应用发展报告（2025）》（2025.10） */
export const GENAI_USERS = {
  points: ['2024.12', '2025.6'],
  values: [2.49, 5.15],
  unit: '亿人',
  note: '半年新增 2.66 亿人，普及率 36.5%',
  source: 'CNNIC《生成式人工智能应用发展报告（2025）》（2025.10）',
}

/* 国家数据局《数字中国发展报告（2024年）》（2025.4） */
export const COMPUTING_POWER = {
  value: 280,
  unit: 'EFLOPS',
  note: '智能算力占比 32% · 截至 2024 年底',
  source: '国家数据局《数字中国发展报告（2024年）》（2025.4）',
}

/* WEF 全球灯塔网络（截至 2025.10 第 14 批） */
export const LIGHTHOUSE = {
  china: 85,
  global: 201,
  source: '世界经济论坛全球灯塔网络（截至 2025.10）',
}

/* WIPO《生成式人工智能专利态势报告》（2024.7）：2014–2023 累计 */
export const WIPO_PATENT_SHARE = '约 70%'

/* ---------- 05 未来展区：权威机构量化预测 ---------- */

export const FUTURE_FORECASTS = [
  {
    value: '+7,800万',
    label: '到 2030 年全球净新增岗位',
    desc: '技术变革将新创造 1.7 亿个岗位、替代 9,200 万个',
    source: '世界经济论坛《Future of Jobs Report 2025》',
  },
  {
    value: '6,320亿$',
    label: '2028 年全球 AI 支出预测',
    desc: '2024–2028 年复合增长率约 29%',
    source: 'IDC《Worldwide AI Spending Guide》（2024.8）',
  },
  {
    value: '+7%',
    label: '生成式AI 对全球 GDP 的提升',
    desc: '预计在广泛采用后的十年内实现',
    source: '高盛研究《Generative AI Could Raise Global GDP by 7%》（2023.4）',
  },
]

/* ---------- 页尾数据来源清单 ---------- */

export const DATA_SOURCES: string[] = [
  '国家统计局：《2025年国民经济和社会发展统计公报》（2026.2）、《2024年统计公报》（2025.2）、数字经济核心产业增加值核算（2025.12）',
  '中国信通院：《人工智能产业发展研究报告（2025）》（2025.9）、深度观察发布会（2026.8）',
  'CNNIC 中国互联网络信息中心：《生成式人工智能应用发展报告（2025）》（2025.10）',
  '国家网信办：生成式人工智能服务已备案信息公告（2025.11）',
  '国家数据局：《数字中国发展报告（2024年）》（2025.4）',
  '世界经济论坛（WEF）：《Future of Jobs Report 2025》（2025.1）、全球灯塔网络批次公告（2025.10）',
  '麦肯锡全球研究院（MGI）：《The Economic Potential of Generative AI》（2023.6）',
  '普华永道（PwC）：《Sizing the Prize》全球AI研究（2017.6）',
  '斯坦福大学 HAI：《AI Index Report 2025》（2025.4）',
  'IDC：《Worldwide AI and Generative AI Spending Guide》（2024.8）',
  '高盛研究：《Generative AI Could Raise Global GDP by 7%》（2023.4）',
  'IFR 国际机器人联合会：《World Robotics 2024》（2024.11）',
  'WIPO 世界知识产权组织：《生成式人工智能专利态势报告》（2024.7）',
  'CNNIC 中国互联网络信息中心：《第47次中国互联网络发展状况统计报告》（2021.2）、《第56次中国互联网络发展状况统计报告》（2025.7）',
  '国家能源局：《2024年可再生能源并网运行情况》（2025.1.27）',
  '农业农村部：2024 年农业科技进步贡献率、农作物耕种收综合机械化率等年度数据（《人民日报》2024.12.17）',
  '新华社（中国政府网）：积极应对人口老龄化政策解读与 2035 年 60 岁及以上人口展望（2025.11.30）',
]
