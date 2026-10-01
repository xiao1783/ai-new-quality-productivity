interface LogoProps {
  size?: number
}

/** 数据节点 + 神经网络 + 向上生产力曲线 */
export default function Logo({ size = 38 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="16" fill="#EFF4FF" />
      <circle cx="32" cy="33" r="6.5" fill="url(#logo-g)" />
      <circle cx="17" cy="21" r="3" fill="#2563EB" />
      <circle cx="47" cy="21" r="3" fill="#06B6D4" />
      <circle cx="17" cy="46" r="3" fill="#06B6D4" />
      <circle cx="47" cy="46" r="3" fill="#2563EB" />
      <g stroke="#94A3B8" strokeWidth="1.4" opacity="0.75">
        <path d="M32 33 17 21M32 33l15-12M32 33 17 46M32 33l15 13" />
      </g>
      <path
        d="M13 52 Q31 42 51 16"
        stroke="url(#logo-g)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
