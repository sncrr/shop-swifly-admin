import styled from "styled-components";
import { colors } from "../../../../theme";

export const NavListItem = styled.li.attrs(() => ({
  className: "nav-list-item"
}))`
  
  margin: auto 0;
  cursor: pointer;
  text-align: center;
  padding: 1rem 0;

  svg {
    vertical-align: middle;
    margin: 0 auto;
  }

  span {
    font-weight: 300;
    font-size: 0.6rem;
    text-transform: uppercase;
    text-align: center;
    color: ${colors.transparent};
    transition: color 100ms ease-out;
  }

  &:hover {
    background-color: ${colors.mainColor};
    color: ${colors.black};
    transition: background-color 100ms ease-out;

    span {
      color: ${colors.white};
    }

    .nav-sub-list {
      display: block;
    }
  }
`