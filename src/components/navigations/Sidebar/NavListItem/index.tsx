import styled from "styled-components";
import { colors } from "../../../../theme";

interface NavListItemProps {
  $isActive?: boolean;
}

export const NavListItem = styled.li<NavListItemProps>`
  
  margin: auto 0;
  cursor: pointer;
  text-align: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.$isActive ? colors.active : colors.navBorder};
  z-index: 10;
  svg {
    vertical-align: middle;
    margin: 0 auto;
  }

  span {
    font-size: 0.7rem;
    text-align: center;
    transition: color 100ms ease-out;

    color: ${props => props.$isActive ? colors.active : colors.black};
  }

  &:hover {
    background-color: ${colors.navBorder};
    color: ${colors.black};
    transition: background-color 100ms ease-out;

    /* span {
      color: ${colors.active};
    } */

    .nav-sub-list {
      display: block;
    }
  }
`