import { SvgProps, defaultColor, defualtSize, } from "..";

export function ArrowRight({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M5 12h13M12 5l7 7-7 7"/>
    </svg>
  );
}