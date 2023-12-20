import { SvgProps, defaultColor, defualtSize, } from "..";

export function MenuStore({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.33334 10H36.6667V16.6667L35.5013 17.3659C33.6539 18.4743 31.3461 18.4743 29.4988 17.3659L28.3333 16.6667L27.1679 17.3659C25.3206 18.4743 23.0128 18.4743 21.1654 17.3659L20 16.6667L18.8346 17.3659C16.9873 18.4743 14.6794 18.4743 12.8321 17.3659L11.6667 16.6667L10.5013 17.3659C8.65393 18.4743 6.3461 18.4743 4.49879 17.3659L3.33334 16.6667V10Z" />
      <path d="M6.66668 18.7407V36.6666H33.3333V18.3333" />
      <path d="M6.66668 9.85181V3.33331H33.3333V9.99998" />
      <path d="M15.8333 26.6667H24.1667V36.6667H15.8333V26.6667Z" />
    </svg>
  );
}
