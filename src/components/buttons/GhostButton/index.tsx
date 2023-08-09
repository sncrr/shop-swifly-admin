import styled from "styled-components";
import { colors } from "../../../theme";

export const GhostBtn = styled.button.attrs(() => ({
  className: "space-x-1"
}))`
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transition: background-color 100ms ease-out;
  border-radius: 0.125rem;

  &:hover {
    background-color: ${colors.inputFocus};
  }
`