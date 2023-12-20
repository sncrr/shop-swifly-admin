import { SvgProps, defaultColor, defualtSize, } from "./Icons";

export function SvgName({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 16 16">
      
    </svg>
  );
}
