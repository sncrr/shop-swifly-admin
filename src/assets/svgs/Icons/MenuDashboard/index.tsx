import { SvgProps, defaultColor, defualtSize, } from "..";

export function MenuDashboard({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} stroke={color} viewBox="0 0 40 40" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0H40V40H0V0Z" stroke="none" />
      <path d="M3.33337 15H14.1667V35H3.33337V15Z" />
      <path d="M14.1667 5H25.0001V35H14.1667V5Z" />
      <path d="M25 21.6667H35.8333V35H25V21.6667Z" />
    </svg>
  );
}
