import styled from "styled-components";
import { colors } from "../../../../theme";

export const NavSubList = styled.ul.attrs(() => ({
  className: "nav-sub-list"
}))`
  
  display: none;
  height: 100%;
  width: 20rem;
  position: absolute;
  top: 0;
  left: 4rem;
  text-align: left;
  background-color: ${colors.mainColor};

  li {
    padding: 0.5rem 1rem;
    transition: color 100ms ease-out;

    &:hover {
      color: ${colors.white};
    }
  }

`