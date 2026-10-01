export interface Industry {
  id: string
  name: string
  en: string
  icon: string
  color: string
  angle: number
  applications: string[]
  values: string[]
  desc: string
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'manufacturing',
    name: '智能制造',
    en: 'Smart Manufacturing',
    icon: 'Factory',
    color: '#2563EB',
    angle: -90,
    desc: 'AI 贯穿设计、生产、检测与运维，让制造系统具备感知与自优化能力。',
    applications: ['机器视觉检测', '预测性维护', '智能生产调度', '数字孪生'],
    values: ['提高生产效率', '降低设备停机时间', '优化能源使用', '提升质量控制'],
  },
  {
    id: 'medical',
    name: '智慧医疗',
    en: 'Healthcare',
    icon: 'HeartPulse',
    color: '#06B6D4',
    angle: -45,
    desc: 'AI 辅助影像判读、药物研发与个性化诊疗，扩展医疗服务的能力边界。',
    applications: ['医学影像辅助诊断', '药物分子筛选', '智能问诊', '健康风险预测'],
    values: ['缩短诊断时间', '提升早筛准确率', '加速新药研发', '优化医疗资源'],
  },
  {
    id: 'energy',
    name: '智慧能源',
    en: 'Energy',
    icon: 'Zap',
    color: '#14B8A6',
    angle: 0,
    desc: 'AI 预测能源供需、调度风光储协同，支撑安全、低碳的新型能源体系。',
    applications: ['负载预测', '新能源功率预测', '智能电网调度', '设备故障预警'],
    values: ['提升新能源消纳', '降低供电损耗', '增强电网稳定性', '助力绿色低碳'],
  },
  {
    id: 'agriculture',
    name: '智慧农业',
    en: 'Agriculture',
    icon: 'Sprout',
    color: '#3B82F6',
    angle: 45,
    desc: 'AI 结合遥感、无人机与物联网，实现从“看天吃饭”到精准农业。',
    applications: ['病虫害图像识别', '产量预测', '精准灌溉施肥', '无人农机作业'],
    values: ['减少农药化肥', '提高土地产出', '降低人力投入', '保障粮食安全'],
  },
  {
    id: 'transport',
    name: '智能交通',
    en: 'Transport',
    icon: 'TrafficCone',
    color: '#0EA5E9',
    angle: 90,
    desc: 'AI 实时感知车流并预测拥堵，让信号灯、路网与出行协同优化。',
    applications: ['交通流量预测', '自适应信号控制', '自动驾驶', '智慧物流调度'],
    values: ['缓解城市拥堵', '降低事故率', '缩短通行时间', '提升物流效率'],
  },
  {
    id: 'science',
    name: '科学研究',
    en: 'Science',
    icon: 'Atom',
    color: '#6366F1',
    angle: 135,
    desc: 'AI for Science 正在改变科研范式，加速假设生成、模拟与发现。',
    applications: ['蛋白质结构预测', '材料逆向设计', '气候模拟', '文献知识挖掘'],
    values: ['缩短研发周期', '发现新材料', '处理海量实验数据', '催生交叉创新'],
  },
  {
    id: 'finance',
    name: '金融服务',
    en: 'Finance',
    icon: 'Landmark',
    color: '#0891B2',
    angle: 180,
    desc: 'AI 用于风控、反欺诈、智能投顾与运营自动化，提升金融服务质效。',
    applications: ['智能风控', '反欺诈识别', '智能客服', '量化投研'],
    values: ['降低风险损失', '提升审批效率', '个性化服务', '7×24 运营'],
  },
  {
    id: 'education',
    name: '智慧教育',
    en: 'Education',
    icon: 'GraduationCap',
    color: '#2DD4BF',
    angle: 225,
    desc: 'AI 构建因材施教的学习系统，让优质教育资源更可及、更个性化。',
    applications: ['自适应学习路径', '智能批改', '虚拟教师', '学情分析'],
    values: ['个性化学习', '减轻教师负担', '提升学习效率', '促进教育公平'],
  },
]
