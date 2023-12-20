import styled from "styled-components";
import { colors } from "../../../../theme";

export const NavSubList = styled.ul.attrs(() => ({
  className: "nav-sub-list"
}))`
  
  display: none;
  max-height: 100%;
  min-height: 80vh;
  width: 20rem;
  position: absolute;
  top: 0;
  left: calc(7rem - 4px);
  text-align: left;
  background-color: ${colors.white};
  z-index: 1;

  //tailwind-dropshadow
  --tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);

  .title {
    color: ${colors.black};
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    font-size: 1.25rem;
    color: ${colors.navTitle};
    font-weight: bold;
  }
`