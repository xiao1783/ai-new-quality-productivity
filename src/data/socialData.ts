/**
 * 「AI 对社会发展作用」专题数据集
 *
 * 数据分级（延续 README 数据真实性原则）：
 * - stat：真实数据，带来源、URL 与核实日期（2026-10-09 联网核实）
 * - concept：编者综合公开资料的概念模型，非统计口径
 * - simulation：教学交互模拟，参数为假设值，不构成任何预测
 */

import type { Industry } from './industryData'

export type SocialDataKind = 'stat' | 'concept' | 'simulation'

export interface SourceRef {
  source: string
  sourceEn: string
  url: string
  verifiedAt: string
}

const SRC = {
  cnnic47: {
    source: 'CNNIC《第47次中国互联网络发展状况统计报告》（2021.2，数据截至2020.12）',
    sourceEn: 'CNNIC 47th Statistical Report on China’s Internet Development (Feb 2021, data as of Dec 2020)',
    url: 'https://www.cac.gov.cn/2021-02/03/c_1613923422728645.htm',
    verifiedAt: '2026-10-09',
  },
  cnnic56: {
    source: 'CNNIC《第56次中国互联网络发展状况统计报告》（2025.7，数据截至2025.6）',
    sourceEn: 'CNNIC 56th Statistical Report on China’s Internet Development (Jul 2025, data as of Jun 2025)',
    url: 'https://www.cnnic.net.cn/NMediaFile/2025/0730/MAIN1753846666507QEK67ZS9DH.pdf',
    verifiedAt: '2026-10-09',
  },
  hai2025: {
    source: '斯坦福 HAI《AI Index Report 2025》（2025.4）转引美国 FDA 数据',
    sourceEn: 'Stanford HAI AI Index Report 2025 (Apr 2025), citing U.S. FDA data',
    url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report',
    verifiedAt: '2026-10-09',
  },
  moa2024: {
    source: '农业农村部（《人民日报》2024.12.17 刊发，2024 年度数据）',
    sourceEn: 'Ministry of Agriculture and Rural Affairs of China (People’s Daily, 17 Dec 2024)',
    url: 'http://paper.people.com.cn/rmrb/pc/content/202412/17/content_30046657.html',
    verifiedAt: '2026-10-09',
  },
  nea2024: {
    source: '国家能源局《2024年可再生能源并网运行情况》（2025.1.27）',
    sourceEn: 'National Energy Administration: 2024 Renewable Energy Grid Connection (27 Jan 2025)',
    url: 'http://www.nea.gov.cn/20250221/e10f363cabe3458aaf78ba4558970054/c.html',
    verifiedAt: '2026-10-09',
  },
  nbs2024: {
    source: '国家统计局《2024年经济运行数据》（2025.1.17）',
    sourceEn: 'National Bureau of Statistics of China: 2024 Economic Data (17 Jan 2025)',
    url: 'https://www.stats.gov.cn/sj/zxfb/202501/t20250117_1958332.html',
    verifiedAt: '2026-10-09',
  },
  agingPlan: {
    source: '新华社（中国政府网 2025.11.30 政策解读）：预计2035年左右60岁及以上人口突破4亿、占比超30%',
    sourceEn: 'Xinhua (gov.cn, 30 Nov 2025): population aged 60+ expected to exceed 400M (over 30%) by around 2035',
    url: 'https://www.gov.cn/zhengce/202511/content_7049923.htm',
    verifiedAt: '2026-10-09',
  },
  nea2020: {
    source: '国家能源局：截至2020年底全国可再生能源发电装机9.34亿千瓦',
    sourceEn: 'National Energy Administration: 934GW renewable installed capacity at end of 2020',
    url: 'http://www.nea.gov.cn/20250221/e10f363cabe3458aaf78ba4558970054/c.html',
    verifiedAt: '2026-10-09',
  },
  ifr2024: {
    source: 'IFR《World Robotics 2024》（2024.11）· 2023 年数据',
    sourceEn: 'IFR World Robotics 2024 (Nov 2024), 2023 data',
    url: 'https://ifr.org/ifr-press-releases/news/world-robotics-2024',
    verifiedAt: '2026-10-09',
  },
  wef2025: {
    source: '世界经济论坛《Future of Jobs Report 2025》（2025.1）· 预测区间 2025–2030',
    sourceEn: 'World Economic Forum, Future of Jobs Report 2025 (Jan 2025), 2025–2030 outlook',
    url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
    verifiedAt: '2026-10-09',
  },
} satisfies Record<string, SourceRef>

/* ================= 民生领域（Hero） ================= */

export type HeroDomainId = 'jobs' | 'medical' | 'elderly' | 'inclusion' | 'food' | 'green'

export interface HeroDomain {
  id: HeroDomainId
  color: string
  big: { value: number; decimals: number; suffixZh: string; suffixEn: string }
  noteZh: string
  noteEn: string
  bars: { labelsZh: string[]; labelsEn: string[]; values: number[]; unitZh: string; unitEn: string }
  source: SourceRef
}

export const HERO_DOMAINS: HeroDomain[] = [
  {
    id: 'jobs',
    color: '#0F5BFB',
    big: { value: 78, decimals: 0, suffixZh: ' 百万个', suffixEn: ' M' },
    noteZh: '2025–2030 年全球净新增岗位预测（创造 1.70 亿、替代 0.92 亿）',
    noteEn: 'Projected net new jobs globally in 2025–2030 (170M created, 92M displaced)',
    bars: {
      labelsZh: ['新创造岗位', '被替代岗位', '净新增岗位'],
      labelsEn: ['Created', 'Displaced', 'Net new'],
      values: [170, 92, 78],
      unitZh: '百万个',
      unitEn: 'million',
    },
    source: SRC.wef2025,
  },
  {
    id: 'medical',
    color: '#06B6D4',
    big: { value: 223, decimals: 0, suffixZh: ' 个', suffixEn: '' },
    noteZh: 'FDA 当年批准的 AI 医疗器械：2015 年仅 6 个，2023 年达 223 个',
    noteEn: 'AI medical devices authorized by the U.S. FDA: 6 in 2015, 223 in 2023',
    bars: {
      labelsZh: ['2015 年', '2023 年'],
      labelsEn: ['2015', '2023'],
      values: [6, 223],
      unitZh: '个',
      unitEn: 'devices',
    },
    source: SRC.hai2025,
  },
  {
    id: 'elderly',
    color: '#8B5CF6',
    big: { value: 3.1, decimals: 1, suffixZh: ' 亿人', suffixEn: ' B' },
    noteZh: '2024 年末 60 岁及以上人口占 22.0%；老年群体互联网普及率已达 52.0%（2025.6）',
    noteEn: '22.0% of the population was aged 60+ at end-2024; 52.0% of seniors were online (Jun 2025)',
    bars: {
      labelsZh: ['老年群体普及率', '整体普及率'],
      labelsEn: ['Seniors online', 'Overall online'],
      values: [52.0, 79.7],
      unitZh: '%',
      unitEn: '%',
    },
    source: { ...SRC.nbs2024, source: `${SRC.nbs2024.source}；${SRC.cnnic56.source}`, sourceEn: `${SRC.nbs2024.sourceEn}; ${SRC.cnnic56.sourceEn}`, url: SRC.nbs2024.url, verifiedAt: '2026-10-09' },
  },
  {
    id: 'inclusion',
    color: '#13BFAF',
    big: { value: 15.7, decimals: 1, suffixZh: ' pct', suffixEn: ' pct' },
    noteZh: '城乡互联网普及率差距由 23.9（2020.12）收窄至 15.7 个百分点（2025.6）',
    noteEn: 'Urban-rural internet penetration gap narrowed from 23.9 (Dec 2020) to 15.7 pct (Jun 2025)',
    bars: {
      labelsZh: ['2020 城镇', '2020 农村', '2025 城镇', '2025 农村'],
      labelsEn: ['2020 urban', '2020 rural', '2025 urban', '2025 rural'],
      values: [79.8, 55.9, 84.9, 69.2],
      unitZh: '%',
      unitEn: '%',
    },
    source: { ...SRC.cnnic56, source: `${SRC.cnnic47.source}；${SRC.cnnic56.source}`, sourceEn: `${SRC.cnnic47.sourceEn}; ${SRC.cnnic56.sourceEn}`, url: SRC.cnnic47.url, verifiedAt: '2026-10-09' },
  },
  {
    id: 'food',
    color: '#257CF4',
    big: { value: 63.2, decimals: 1, suffixZh: '%', suffixEn: '%' },
    noteZh: '2024 年全国农业科技进步贡献率；农作物耕种收综合机械化率 74.3%，良种覆盖率超 96%',
    noteEn: 'Agricultural S&T progress contribution rate in 2024; farm mechanization 74.3%, improved seed coverage over 96%',
    bars: {
      labelsZh: ['科技进步贡献率', '综合机械化率'],
      labelsEn: ['S&T contribution', 'Mechanization'],
      values: [63.2, 74.3],
      unitZh: '%',
      unitEn: '%',
    },
    source: SRC.moa2024,
  },
  {
    id: 'green',
    color: '#10B981',
    big: { value: 18.89, decimals: 2, suffixZh: ' 亿千瓦', suffixEn: ' 100M kW' },
    noteZh: '2024 年底全国可再生能源装机，占总装机约 56%；2020 年底为 9.34 亿千瓦',
    noteEn: 'Renewable installed capacity at end-2024, about 56% of total; 9.34 (100M kW) at end-2020',
    bars: {
      labelsZh: ['2020 年', '2024 年'],
      labelsEn: ['2020', '2024'],
      values: [9.34, 18.89],
      unitZh: '亿千瓦',
      unitEn: '100M kW',
    },
    source: { ...SRC.nea2024, source: `${SRC.nea2020.source}；${SRC.nea2024.source}`, sourceEn: `${SRC.nea2020.sourceEn}; ${SRC.nea2024.sourceEn}`, url: SRC.nea2024.url, verifiedAt: '2026-10-09' },
  },
]

/* ================= 认知展区：两种模式社会福祉（概念模型） ================= */

export const WELLBEING_DIMS_ZH = ['岗位质量', '资源环境', '服务可及', '收入效率']
export const WELLBEING_DIMS_EN = ['Job quality', 'Environment', 'Service access', 'Income efficiency']
export const WELLBEING_SCORES: Record<'traditional' | 'ai', number[]> = {
  traditional: [42, 38, 45, 40],
  ai: [82, 78, 85, 84],
}

/* ================= 机制展区：八节点社会价值锚点 ================= */

export type LoopNodeId = 'data' | 'perception' | 'analysis' | 'prediction' | 'decision' | 'execution' | 'feedback' | 'optimization'

export interface NodeAnchor {
  node: LoopNodeId
  big: { value: number; decimals: number; suffixZh: string; suffixEn: string }
  labelZh: string
  labelEn: string
  bars: { labelsZh: string[]; labelsEn: string[]; values: number[]; unitZh: string; unitEn: string }
  source: SourceRef
}

export const NODE_ANCHORS: NodeAnchor[] = [
  {
    node: 'data',
    big: { value: 5.15, decimals: 2, suffixZh: ' 亿人', suffixEn: ' M' },
    labelZh: '生成式 AI 用户规模（2025.6），数据普惠的基础',
    labelEn: 'Generative AI users (Jun 2025) — the base of inclusive data services',
    bars: { labelsZh: ['2024.12', '2025.6'], labelsEn: ['Dec 2024', 'Jun 2025'], values: [2.49, 5.15], unitZh: '亿人', unitEn: '100M' },
    source: SRC.cnnic56,
  },
  {
    node: 'perception',
    big: { value: 223, decimals: 0, suffixZh: ' 个', suffixEn: '' },
    labelZh: 'AI 感知能力进入医疗一线：FDA 2023 年批准 223 个 AI 医疗器械',
    labelEn: 'Perception reaches frontline care: 223 AI devices authorized by FDA in 2023',
    bars: { labelsZh: ['2015 年', '2023 年'], labelsEn: ['2015', '2023'], values: [6, 223], unitZh: '个', unitEn: 'devices' },
    source: SRC.hai2025,
  },
  {
    node: 'analysis',
    big: { value: 85, decimals: 0, suffixZh: ' 家', suffixEn: '' },
    labelZh: '全球 201 家灯塔工厂中中国占 85 家，数据分析能力居全球首位',
    labelEn: 'China operates 85 of the world’s 201 Lighthouse factories — the most of any country',
    bars: { labelsZh: ['中国', '其他国家'], labelsEn: ['China', 'Rest of world'], values: [85, 116], unitZh: '家', unitEn: 'sites' },
    source: { ...SRC.wef2025, source: '世界经济论坛全球灯塔网络（截至 2025.10，共 201 家，中国 85 家）', sourceEn: 'WEF Global Lighthouse Network (Oct 2025): 201 sites globally, 85 in China', url: 'https://www.weforum.org/projects/global-lighthouse-network/', verifiedAt: '2026-10-09' },
  },
  {
    node: 'prediction',
    big: { value: 18.89, decimals: 2, suffixZh: ' 亿千瓦', suffixEn: ' 100M kW' },
    labelZh: 'AI 功率预测支撑新能源消纳：2024 年可再生装机 18.89 亿千瓦',
    labelEn: 'Output forecasting enables renewable adoption: 1.889B kW installed by 2024',
    bars: { labelsZh: ['2020 年', '2024 年'], labelsEn: ['2020', '2024'], values: [9.34, 18.89], unitZh: '亿千瓦', unitEn: '100M kW' },
    source: { ...SRC.nea2024, source: `${SRC.nea2020.source}；${SRC.nea2024.source}`, sourceEn: `${SRC.nea2020.sourceEn}; ${SRC.nea2024.sourceEn}`, url: SRC.nea2024.url, verifiedAt: '2026-10-09' },
  },
  {
    node: 'decision',
    big: { value: 78, decimals: 0, suffixZh: ' 百万个', suffixEn: ' M' },
    labelZh: '智能调度式的资源重配，对应 2030 年全球净增 7,800 万岗位',
    labelEn: 'AI-driven reallocation corresponds to a net +78M jobs globally by 2030',
    bars: { labelsZh: ['新创造', '被替代', '净新增'], labelsEn: ['Created', 'Displaced', 'Net'], values: [170, 92, 78], unitZh: '百万个', unitEn: 'million' },
    source: SRC.wef2025,
  },
  {
    node: 'execution',
    big: { value: 470, decimals: 0, suffixZh: ' 台/万人', suffixEn: '' },
    labelZh: '中国制造业机器人密度 470 台/万人，把人从高危重复岗位中解放',
    labelEn: 'China’s manufacturing robot density: 470 per 10,000 workers, freeing people from risky repetitive jobs',
    bars: { labelsZh: ['全球平均', '中国'], labelsEn: ['World avg.', 'China'], values: [162, 470], unitZh: '台/万人', unitEn: 'per 10k' },
    source: SRC.ifr2024,
  },
  {
    node: 'feedback',
    big: { value: 18.44, decimals: 2, suffixZh: ' 万元/人', suffixEn: '' },
    labelZh: '反馈闭环持续改进生产：2025 年全员劳动生产率 18.44 万元/人（+6.1%）',
    labelEn: 'Closed-loop feedback lifts productivity: ¥184,400 per worker in 2025 (+6.1%)',
    bars: { labelsZh: ['2024 年', '2025 年'], labelsEn: ['2024', '2025'], values: [17.39, 18.44], unitZh: '万元/人', unitEn: '¥10k/person' },
    source: { ...SRC.nbs2024, source: '国家统计局《2025年国民经济和社会发展统计公报》（2026.2）', sourceEn: 'NBS 2025 National Economic and Social Development Statistical Communiqué (Feb 2026)', url: 'https://www.stats.gov.cn/', verifiedAt: '2026-10-09' },
  },
  {
    node: 'optimization',
    big: { value: 63.2, decimals: 1, suffixZh: '%', suffixEn: '%' },
    labelZh: '持续优化延伸到粮食安全：农业科技进步贡献率 63.2%（2024）',
    labelEn: 'Continuous optimization underpins food security: agricultural S&T contribution 63.2% (2024)',
    bars: { labelsZh: ['科技贡献率', '机械化率'], labelsEn: ['S&T contribution', 'Mechanization'], values: [63.2, 74.3], unitZh: '%', unitEn: '%' },
    source: SRC.moa2024,
  },
]

/* ================= 产业展区：产业社会雷达（概念模型）+ 真实锚点 ================= */

export const INDUSTRY_SOCIAL_DIMS_ZH = ['就业带动', '服务可及', '绿色低碳', '安全健康', '效率与收入', '创新能力']
export const INDUSTRY_SOCIAL_DIMS_EN = ['Jobs', 'Access', 'Low-carbon', 'Safety & health', 'Efficiency & income', 'Innovation']

export type IndustryStatKey = 'robot' | 'fda' | 'renewable' | 'agritech'

export interface IndustrySocial {
  scores: number[]
  statKey?: IndustryStatKey
}

export const INDUSTRY_SOCIAL: Record<Industry['id'], IndustrySocial> = {
  manufacturing: { scores: [88, 72, 70, 82, 90, 86], statKey: 'robot' },
  medical: { scores: [70, 92, 60, 90, 78, 88], statKey: 'fda' },
  energy: { scores: [74, 76, 95, 80, 82, 84], statKey: 'renewable' },
  agriculture: { scores: [72, 84, 80, 76, 80, 78], statKey: 'agritech' },
  transport: { scores: [78, 80, 76, 88, 84, 74] },
  science: { scores: [66, 78, 70, 66, 72, 95] },
  finance: { scores: [70, 88, 62, 74, 86, 80] },
  education: { scores: [76, 94, 58, 72, 70, 82] },
}

export const INDUSTRY_STATS: Record<IndustryStatKey, { value: number; decimals: number; suffixZh: string; suffixEn: string; labelZh: string; labelEn: string; source: SourceRef }> = {
  robot: {
    value: 470,
    decimals: 0,
    suffixZh: ' 台/万人',
    suffixEn: '/10k',
    labelZh: '中国制造业机器人密度（2023）',
    labelEn: 'China manufacturing robot density (2023)',
    source: SRC.ifr2024,
  },
  fda: {
    value: 223,
    decimals: 0,
    suffixZh: ' 个',
    suffixEn: '',
    labelZh: 'FDA 当年批准 AI 医疗器械数（2023）',
    labelEn: 'AI medical devices authorized by FDA (2023)',
    source: SRC.hai2025,
  },
  renewable: {
    value: 18.89,
    decimals: 2,
    suffixZh: ' 亿千瓦',
    suffixEn: ' 100M kW',
    labelZh: '全国可再生能源装机（2024 底）',
    labelEn: 'National renewable capacity (end-2024)',
    source: SRC.nea2024,
  },
  agritech: {
    value: 63.2,
    decimals: 1,
    suffixZh: '%',
    suffixEn: '%',
    labelZh: '农业科技进步贡献率（2024）',
    labelEn: 'Agricultural S&T contribution rate (2024)',
    source: SRC.moa2024,
  },
}

/* ================= 效率展区：红利分配模拟器（概念模型） ================= */

export const DIVIDEND_DEFAULTS = { total: 120, jobs: 42, wages: 34, publicGoods: 24 }

/** 归一化为占比；均衡度（0.5~1）影响社会发展指数 */
export function dividendModel(total: number, channels: [number, number, number]) {
  const sum = channels.reduce((a, b) => a + b, 0) || 1
  const shares = channels.map((c) => c / sum) as [number, number, number]
  const mean = 1 / 3
  const variance = shares.reduce((a, s) => a + (s - mean) ** 2, 0) / 3
  const balance = 1 - Math.sqrt(variance) // 0.42~1
  const index = Math.round(38 + (total / 200) * 42 * (0.7 + 0.3 * balance))
  return { shares, balance, index: Math.min(96, index) }
}

/* ================= 数据展区：民生仪表盘 ================= */

/** 数字普惠：城乡互联网普及率（%） */
export const DIGITAL_DIVIDE = {
  years: ['2020.12', '2025.6'],
  urban: [79.8, 84.9],
  rural: [55.9, 69.2],
  gap: [23.9, 15.7],
  sourceZh: `${SRC.cnnic47.source}；${SRC.cnnic56.source}`,
  sourceEn: `${SRC.cnnic47.sourceEn}; ${SRC.cnnic56.sourceEn}`,
}

/** FDA 当年批准 AI 医疗器械数 */
export const FDA_DEVICES = {
  years: ['2015', '2023'],
  values: [6, 223],
  sourceZh: SRC.hai2025.source,
  sourceEn: SRC.hai2025.sourceEn,
}

/** 可再生能源装机（亿千瓦） */
export const RENEWABLE_CAPACITY = {
  years: ['2020', '2024'],
  values: [9.34, 18.89],
  share2024: 56,
  sourceZh: `${SRC.nea2020.source}；${SRC.nea2024.source}`,
  sourceEn: `${SRC.nea2020.sourceEn}; ${SRC.nea2024.sourceEn}`,
}

/** WEF 就业（百万个），双向条形 */
export const WEF_JOBS_SOCIAL = {
  created: 170,
  displaced: -92,
  net: 78,
  sourceZh: SRC.wef2025.source,
  sourceEn: SRC.wef2025.sourceEn,
}

/* ================= 未来展区：社会发展时间轴 ================= */

export const SOCIAL_TIMELINE = {
  years: ['2020', '2024', '2025', '2030', '2035'],
  /** 60 岁及以上人口占比（%）：实测 + 规划判断 */
  agingActual: [18.7, 22.0, null, null, null],
  agingForecast: [null, 22.0, null, null, 30],
  /** 可再生能源装机（亿千瓦）：仅实测，不外推 */
  renewable: [9.34, 18.89, null, null, null],
  /** 生成式 AI 用户（亿人）：仅实测点 */
  genai: [null, 2.49, 5.15, null, null],
  agingActualSource: `${SRC.nbs2024.source}；第七次全国人口普查（2020 年 18.7%）`,
  agingForecastSource: SRC.agingPlan.source,
  renewableSource: `${SRC.nea2020.source}；${SRC.nea2024.source}`,
  genaiSource: SRC.cnnic56.source,
}

/* ================= 实验室展区：规模化部署估算器（教学模拟） ================= */

export const LAB_DEPLOY = {
  coeffs: { defectsPerLine: 1200, hoursPerLine: 8000, carbonPerLine: 60 },
  lineRange: [1, 50] as [number, number],
}

/** 沙盘展区：由同一演化水平派生的社会效益 KPI（概念推演） */
export function socialKpis(level: number): number[] {
  return [
    Math.round(40 + level * 38), // 就业结构升级
    Math.round(45 + level * 40), // 安全与环境
    Math.round(38 + level * 44), // 生活福祉
  ]
}

export const SOCIAL_KPI_COLORS = ['#0F5BFB', '#13BFAF', '#8B5CF6']
