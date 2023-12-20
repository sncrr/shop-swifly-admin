import { SvgProps, defaultColor, defualtSize, } from "..";

export function MoreHorizontal({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} stroke={color} viewBox="0 0 24 24"
     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  );
}