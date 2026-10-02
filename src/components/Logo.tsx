interface LogoProps {
  size?: number
}

/** 智启新质品牌 Logo */
export default function Logo({ size = 38 }: LogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-transparent.png`}
      width={size}
      height={size}
      alt="智启新质 Logo"
      draggable={false}
      className="rounded-[22%]"
      style={{ width: size, height: size }}
    />
  )
}
