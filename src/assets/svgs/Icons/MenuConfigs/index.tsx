import { SvgProps, defaultColor, defualtSize, } from "..";

export function MenuConfigs({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M34.5833 8.33331H29.5833" />
      <path d="M22.9167 5V11.6667" />
      <path d="M22.9167 8.33331H4.58333" />
      <path d="M11.25 20H4.58333" />
      <path d="M17.9167 16.6667V23.3334" />
      <path d="M36.25 20H17.9167" />
      <path d="M34.5833 31.6666H29.5833" />
      <path d="M22.9167 28.3334V35" />
      <path d="M22.9167 31.6666H4.58333" />
    </svg>
  );
}
