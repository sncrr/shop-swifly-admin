import styled from "styled-components";
import { colors } from "../../../theme";

export const LinkBtn = styled.button.attrs(() => ({
  className: "space-x-1"
}))`
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 0.25rem;
  text-decoration: underline;
  color: ${colors.mainColor};
  transition: background-color 100ms ease-out;

  &:hover {
    /* background-color: ${colors.inputFocus}; */
  }
`