import styled from "styled-components";
import { colors } from "../../../../theme";

export const NavSubItem = styled.li.attrs(() => ({
  className: "nav-sub-item"
}))`
  color: ${colors.black};
  padding: 0.5rem 1rem;
  transition: color 100ms ease-out;
  font-size: 0.9rem;

  &:hover {
    color: ${colors.black};
  }
`