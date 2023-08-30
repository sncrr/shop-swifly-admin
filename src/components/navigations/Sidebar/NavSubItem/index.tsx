import styled from "styled-components";
import { colors } from "../../../../theme";

export const NavSubItem = styled.li.attrs(() => ({
  className: "nav-sub-item"
}))`
  color: ${colors.white};
  padding: 0.5rem 1rem;
  transition: color 100ms ease-out;

  &:hover {
    color: ${colors.black};
  }
`