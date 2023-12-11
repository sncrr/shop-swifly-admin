import { SvgProps, defaultColor, defualtSize, } from "..";

export function ArrowLeft({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M19 12H6M12 5l-7 7 7 7"/>
    </svg>
  );
}