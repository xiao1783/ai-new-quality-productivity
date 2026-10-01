# 智启新质 · AI × New Quality Productive Forces

> **人工智能驱动新质生产力可视化数字展馆**
>
> 人工智能，正在重新定义生产力。从数据感知、智能决策到产业重构，探索人工智能如何成为新质生产力的重要驱动力。

这是一个大学课程作业项目，定位为 **沉浸式数字展馆 + 数据可视化网站 + AI 交互实验平台**。网站以完整的叙事逻辑串联「认知 → 机制 → 产业 → 效率 → 数据 → 未来 → 实验」七大展区，通过大量动态图表与可交互实验，展示 **AI 如何推动新质生产力**。

---

## 在线访问

GitHub 仓库：<https://github.com/xiao1783/ai-new-quality-productivity>

---

## 核心特性

- **沉浸式首页**：动态「AI 新质生产力引擎」，以 AI Core 为中心，连接数据、算法、算力、场景、人才五大技术要素与制造、医疗、能源、交通、农业、科研六大产业；节点浮动、数据流动、悬停高亮。
- **认知展区（01）**：传统生产模式 vs AI 驱动生产模式对比，点击 AI 节点触发转换动画；高科技 / 高效能 / 高质量三大特征卡片与微型动态图表。
- **机制展区（02）**：数据 → 感知 → 分析 → 预测 → 决策 → 执行 → 反馈 → 优化的智能生产闭环，支持「播放 AI 决策流程」逐个点亮节点；感知 / 认知 / 行动三大生产力动态 SVG。
- **产业展区（03）**：可交互产业地图（8 大领域，点击查看应用与价值面板）+ Industry Explorer 五个产业案例的动态场景（制造、交通、医疗、农业、能源）。
- **效率展区（04）**：KPI 看板、柱状 / 折线 / 雷达图、**AI 生产力模拟器**（4 个滑块实时计算指数）、Human × AI 协同、Before / After 拖动对比、AI 生产力网络关系图（悬停高亮整条价值路径）。
- **数据驾驶舱（07）**：KPI 卡片、产业应用环形图、AI 能力雷达、效率提升条形图、应用趋势折线、产业智能化热力图。
- **未来展区（05）**：2020 → 2025 → 2030 → Future 时间轴与「未来智能工厂」动态图。
- **AI 交互实验室（06）**：四个可亲手操作的实验——
  1. 机器视觉检测（框选缺陷 + 置信度）
  2. 智能调度（甘特图对比传统 / AI 排程）
  3. 预测性维护（自动标记异常振动）
  4. AI 决策（输入参数，输出产线分配方案与饼图）

---

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | React 18 + Vite 5 + TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 数据可视化 | Apache ECharts 5 |
| 图形与动画 | 原生 SVG / CSS + Framer Motion 11 |
| 图标 | lucide-react |

---

## 快速开始

### 环境要求

- **Node.js ≥ 18**（推荐 20 / 22 LTS）
- npm（或 pnpm / yarn）

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 3. 构建生产版本（输出到 dist/）
npm run build

# 4. 本地预览生产构建
npm run preview
```

---

## 目录结构

```
.
├── index.html               # 入口 HTML
├── package.json
├── vite.config.ts           # Vite 配置（别名 @、分包策略）
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx             # 应用入口
    ├── App.tsx              # 展区组装与叙事顺序
    ├── index.css            # Tailwind 与设计系统（配色 / 卡片 / 动画）
    ├── data/
    │   ├── site.ts          # 导航配置与图表配色
    │   └── industryData.ts  # 八大产业数据
    └── components/
        ├── Navbar.tsx       # 悬浮玻璃导航（滚动定位 + active）
        ├── Hero.tsx         # 首页
        ├── AICoreGraph.tsx  # AI 引擎动态图
        ├── Understand.tsx   # 01 认知
        ├── Mechanism.tsx    # 02 机制
        ├── Industry.tsx     # 03 产业地图
        ├── IndustryScenes.tsx   # 产业案例场景
        ├── Efficiency.tsx   # 04 效率看板
        ├── ProductivitySimulator.tsx
        ├── HumanAI.tsx
        ├── BeforeAfter.tsx
        ├── NetworkGraph.tsx
        ├── Dashboard.tsx    # 数据驾驶舱
        ├── Future.tsx       # 05 未来
        ├── AILab.tsx        # 06 AI 实验室
        ├── Footer.tsx       # 总结页
        ├── charts/
        │   └── EChart.tsx   # ECharts 通用封装
        └── ui/
            ├── Reveal.tsx       # 滚动进入动画
            ├── CountUp.tsx      # 数字增长动画
            └── SectionHeading.tsx
```

---

## 数据与真实性声明

本项目为教学可视化作品：

- 网站中出现的 KPI、百分比、指数、趋势等，**均为示意数据 / 模拟数据**，并已在页面显著位置标注；
- AI 实验室中的「检测、调度、维护、决策」均为前端交互模拟，**不调用真实 AI 模型，也不构成任何真实产业预测或统计结论**；
- 未来展区内容仅为概念性趋势展示。

---

## 浏览器兼容

- 桌面端优先适配 1920×1080，兼容 1440×900（Chrome / Edge / Firefox / Safari 现代版本）；
- 已适配平板与移动端（< 768px 自动切换单列布局，图表自适应缩放）。

---

## License

本项目仅用于大学课程学习与教学展示。

© 2026 智启新质 · AI × New Quality Productive Forces
