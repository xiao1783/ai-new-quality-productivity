/**
 * 「可视化多样性」扩展展区数据集（生态图谱 / 价值转化 / 区域图景）
 *
 * 口径分级（延续 socialData.ts 约定）：
 * - concept：编者综合公开资料构建的概念模型，非统计口径，界面显著标注
 * - simulation：教学交互模拟，参数为假设值，不构成任何预测
 * 散点图与平行坐标直接派生自 industryData + socialData 的既有概念评分矩阵，不另造数字。
 */

export type VizLang = 'zh' | 'en'

/* ================= 生态图谱：桑基图（concept） ================= */

export interface SankeyLike {
  nodes: { name: string; depth: number }[]
  links: { source: string; target: string; value: number }[]
}

/** 四层节点中文名（内部键）与英文名 */
const SANKEY_DICT: Record<string, string> = {
  // L0 基础要素
  数据: 'Data', 算法: 'Algorithms', 算力: 'Computing', 场景: 'Scenarios',
  // L1 核心能力
  感知理解: 'Perception', 预测预警: 'Forecasting', 智能决策: 'Decision-making', 内容生成: 'Content generation',
  // L2 重点产业
  智能制造: 'Smart manufacturing', 智慧医疗: 'Smart healthcare', 清洁能源: 'Clean energy',
  现代农业: 'Modern agriculture', 智慧交通: 'Smart transport', 普惠服务: 'Inclusive services',
  // L3 社会价值
  就业升级: 'Better jobs', 健康普惠: 'Health for all', 绿色低碳: 'Low-carbon', 安全便捷: 'Safety & convenience',
}

const SANKEY_LAYERS_ZH: string[][] = [
  ['数据', '算法', '算力', '场景'],
  ['感知理解', '预测预警', '智能决策', '内容生成'],
  ['智能制造', '智慧医疗', '清洁能源', '现代农业', '智慧交通', '普惠服务'],
  ['就业升级', '健康普惠', '绿色低碳', '安全便捷'],
]

const SANKEY_EDGES_ZH: [string, string, number][] = [
  // 基础要素 → 核心能力
  ['数据', '感知理解', 6], ['数据', '预测预警', 5], ['数据', '智能决策', 5], ['数据', '内容生成', 4],
  ['算法', '感知理解', 4], ['算法', '预测预警', 4], ['算法', '智能决策', 5], ['算法', '内容生成', 5],
  ['算力', '预测预警', 3], ['算力', '智能决策', 4], ['算力', '内容生成', 4],
  ['场景', '智能决策', 4], ['场景', '内容生成', 3],
  // 核心能力 → 重点产业
  ['感知理解', '智能制造', 5], ['感知理解', '智慧医疗', 5], ['感知理解', '智慧交通', 3],
  ['预测预警', '清洁能源', 5], ['预测预警', '现代农业', 3], ['预测预警', '智慧交通', 3], ['预测预警', '智能制造', 3],
  ['智能决策', '智能制造', 5], ['智能决策', '智慧医疗', 3], ['智能决策', '普惠服务', 4], ['智能决策', '现代农业', 2],
  ['内容生成', '普惠服务', 5], ['内容生成', '智慧医疗', 2],
  // 重点产业 → 社会价值
  ['智能制造', '就业升级', 6], ['智能制造', '安全便捷', 4],
  ['智慧医疗', '健康普惠', 7], ['智慧医疗', '就业升级', 2],
  ['清洁能源', '绿色低碳', 8],
  ['现代农业', '绿色低碳', 3], ['现代农业', '健康普惠', 3],
  ['智慧交通', '安全便捷', 5], ['智慧交通', '绿色低碳', 2],
  ['普惠服务', '就业升级', 3], ['普惠服务', '健康普惠', 3], ['普惠服务', '安全便捷', 2],
]

export function makeSankey(lang: VizLang): SankeyLike {
  const tr = (zh: string) => (lang === 'zh' ? zh : SANKEY_DICT[zh])
  const nodes = SANKEY_LAYERS_ZH.flatMap((layer, depth) => layer.map((zh) => ({ name: tr(zh), depth })))
  const links = SANKEY_EDGES_ZH.map(([s, t, value]) => ({ source: tr(s), target: tr(t), value }))
  return { nodes, links }
}

/* ================= 生态图谱：力导向关系图（concept） ================= */

export interface GraphLike {
  categories: { name: string }[]
  nodes: { id: string; name: string; category: number; symbolSize: number }[]
  links: { source: string; target: string; value?: number }[]
}

const GRAPH_CATEGORIES = {
  zh: ['基础层', '模型层', '应用层', '治理层'],
  en: ['Foundation', 'Models', 'Applications', 'Governance'],
}

const GRAPH_NODES: { zh: string; en: string; cat: number; size: number }[] = [
  { zh: '芯片', en: 'Chips', cat: 0, size: 42 },
  { zh: '算力', en: 'Computing', cat: 0, size: 48 },
  { zh: '数据', en: 'Data', cat: 0, size: 48 },
  { zh: '云平台', en: 'Cloud', cat: 0, size: 40 },
  { zh: '大模型', en: 'LLMs', cat: 1, size: 56 },
  { zh: '开源社区', en: 'Open source', cat: 1, size: 38 },
  { zh: '算法框架', en: 'Frameworks', cat: 1, size: 40 },
  { zh: '工业', en: 'Industry', cat: 2, size: 36 },
  { zh: '医疗', en: 'Healthcare', cat: 2, size: 36 },
  { zh: '能源', en: 'Energy', cat: 2, size: 34 },
  { zh: '农业', en: 'Agriculture', cat: 2, size: 32 },
  { zh: '交通', en: 'Transport', cat: 2, size: 34 },
  { zh: '金融', en: 'Finance', cat: 2, size: 34 },
  { zh: '教育', en: 'Education', cat: 2, size: 32 },
  { zh: '标准', en: 'Standards', cat: 3, size: 30 },
  { zh: '安全', en: 'Safety', cat: 3, size: 30 },
  { zh: '伦理', en: 'Ethics', cat: 3, size: 28 },
  { zh: '人才', en: 'Talent', cat: 3, size: 32 },
]

const GRAPH_EDGES: [string, string][] = [
  ['芯片', '算力'], ['芯片', '大模型'], ['算力', '大模型'], ['算力', '算法框架'],
  ['数据', '大模型'], ['数据', '算法框架'], ['云平台', '大模型'], ['云平台', '算法框架'],
  ['开源社区', '大模型'], ['开源社区', '算法框架'],
  ['大模型', '工业'], ['大模型', '医疗'], ['大模型', '能源'], ['大模型', '农业'],
  ['大模型', '交通'], ['大模型', '金融'], ['大模型', '教育'],
  ['算法框架', '工业'], ['算法框架', '医疗'], ['算法框架', '交通'], ['算法框架', '金融'],
  ['标准', '大模型'], ['标准', '工业'], ['安全', '大模型'], ['安全', '金融'],
  ['伦理', '大模型'], ['人才', '大模型'], ['人才', '开源社区'],
]

export const GRAPH_COLORS = ['#0F5BFB', '#8B5CF6', '#13BFAF', '#F59E0B']

export function makeGraph(lang: VizLang): GraphLike {
  const pick = (n: (typeof GRAPH_NODES)[number]) => (lang === 'zh' ? n.zh : n.en)
  const nodes = GRAPH_NODES.map((n) => ({ id: n.zh, name: pick(n), category: n.cat, symbolSize: n.size }))
  const links = GRAPH_EDGES.map(([s, t]) => ({ source: s, target: t }))
  return {
    categories: GRAPH_CATEGORIES[lang].map((name) => ({ name })),
    nodes,
    links,
  }
}

/* ================= 生态图谱：矩形树图（concept，权重和=100） ================= */

export interface TreemapLike {
  data: { name: string; value: number; children?: { name: string; value: number }[] }[]
}

const TREEMAP_ZH = [
  { name: '技术驱动', value: 35, children: [{ name: '数据要素', value: 14 }, { name: '算力设施', value: 11 }, { name: '算法模型', value: 10 }] },
  {
    name: '产业落地', value: 42,
    children: [{ name: '智能制造', value: 12 }, { name: '智慧医疗', value: 8 }, { name: '能源交通', value: 9 }, { name: '现代农业', value: 5 }, { name: '公共服务', value: 8 }],
  },
  { name: '社会环境', value: 23, children: [{ name: '数字基建', value: 8 }, { name: '人才教育', value: 8 }, { name: '治理规范', value: 7 }] },
]

const TREEMAP_EN = [
  { name: 'Technology', value: 35, children: [{ name: 'Data factors', value: 14 }, { name: 'Compute infra', value: 11 }, { name: 'Algorithms & models', value: 10 }] },
  {
    name: 'Adoption', value: 42,
    children: [{ name: 'Manufacturing', value: 12 }, { name: 'Healthcare', value: 8 }, { name: 'Energy & transport', value: 9 }, { name: 'Agriculture', value: 5 }, { name: 'Public services', value: 8 }],
  },
  { name: 'Environment', value: 23, children: [{ name: 'Digital infra', value: 8 }, { name: 'Talent & education', value: 8 }, { name: 'Governance', value: 7 }] },
]

export function makeTreemap(lang: VizLang): TreemapLike {
  return { data: lang === 'zh' ? TREEMAP_ZH : TREEMAP_EN }
}

/* ================= 价值转化：漏斗（simulation，单位：相对指数） ================= */

export interface FunnelLike {
  data: { name: string; value: number }[]
}

const FUNNEL_ZH = ['研发投入', '技术成熟', '试点验证', '规模部署', '社会价值实现']
const FUNNEL_EN = ['R&D input', 'Technology maturity', 'Pilot validation', 'Scaled deployment', 'Social value realized']
const FUNNEL_VALUES = [100, 62, 38, 21, 12]

export function makeFunnel(lang: VizLang): FunnelLike {
  const names = lang === 'zh' ? FUNNEL_ZH : FUNNEL_EN
  return { data: names.map((name, i) => ({ name, value: FUNNEL_VALUES[i] })) }
}

/* ================= 价值转化：联动仪表盘（simulation） ================= */

/**
 * 教学模型：input 为「转化投入强度」(0–100)
 * 技术就绪度 = 40 + 0.5x；产业化率 = 18 + 0.62x；社会价值转化率 = 10 + 0.7x
 */
export function gaugeModel(input: number): [number, number, number] {
  return [
    Math.round(40 + input * 0.5),
    Math.round(18 + input * 0.62),
    Math.round(10 + input * 0.7),
  ]
}

export const GAUGE_COLORS = ['#0F5BFB', '#13BFAF', '#8B5CF6']

/* ================= 区域图景：省级 AI 融合活跃度（concept，教学示意） =================
 * 省名与 public/maps/china.json（DataV.GeoAtlas）features.properties.name 逐字一致。
 * 指数依据数字经济发展梯度编设（40–92），非统计值。
 */
export const CHINA_INDEX: Record<string, number> = {
  北京市: 90, 天津市: 80, 河北省: 64, 山西省: 56, 内蒙古自治区: 52,
  辽宁省: 60, 吉林省: 56, 黑龙江省: 55,
  上海市: 92, 江苏省: 86, 浙江省: 88, 安徽省: 70, 福建省: 78, 江西省: 64, 山东省: 78,
  河南省: 66, 湖北省: 72, 湖南省: 68, 广东省: 90, 广西壮族自治区: 56, 海南省: 58,
  重庆市: 74, 四川省: 74, 贵州省: 58, 云南省: 52, 西藏自治区: 40,
  陕西省: 68, 甘肃省: 48, 青海省: 44, 宁夏回族自治区: 50, 新疆维吾尔自治区: 50,
  台湾省: 82, 香港特别行政区: 85, 澳门特别行政区: 70,
}

export const CHINA_LEVELS = {
  zh: [
    { label: '引领区', min: 80, color: '#0F5BFB' },
    { label: '活跃区', min: 60, color: '#38BDF8' },
    { label: '成长区', min: 0, color: '#BAE6FD' },
  ],
  en: [
    { label: 'Leading', min: 80, color: '#0F5BFB' },
    { label: 'Active', min: 60, color: '#38BDF8' },
    { label: 'Emerging', min: 0, color: '#BAE6FD' },
  ],
}

export function chinaLevelName(value: number, lang: VizLang): string {
  const levels = CHINA_LEVELS[lang]
  return (levels.find((l) => value >= l.min) ?? levels[levels.length - 1]).label
}

/* ================= 区域图景：社会价值玫瑰图（concept，结构权重和=100） ================= */

export const ROSE_ZH = ['就业升级', '健康普惠', '养老关怀', '数字普惠', '粮食安全', '绿色低碳']
export const ROSE_EN = ['Better jobs', 'Health for all', 'Eldercare', 'Inclusion', 'Food security', 'Low-carbon']
export const ROSE_VALUES = [26, 22, 14, 16, 9, 13]
export const ROSE_COLORS = ['#0F5BFB', '#06B6D4', '#8B5CF6', '#13BFAF', '#257CF4', '#10B981']
