import { SvgProps, defaultColor, defualtSize, } from "..";

export function MenuContents({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round">
  <path d="M19.1667 3.33344H3.33334V21.6668H19.1667V3.33344Z" />
  <path d="M36.6667 28.3334H3.33334V35.8334H36.6667V28.3334Z" />
  <path d="M36.6667 3.33344H25.8333V10.0001H36.6667V3.33344Z" />
  <path d="M36.6667 15.0001H25.8333V21.6667H36.6667V15.0001Z" />
</svg>
  );
}
