import styled from "styled-components";
import { colors } from "../../../theme";

export const Control = styled.form<{ 
  $unbordered?: boolean; 
  $flexible?: boolean; 
  $rounded?: boolean 
}>`
  width: 100%;
  max-width: 40rem;
  ${props => !props.$flexible ? "max-width: 30rem;" : ""}

  border-width: ${props => props.$unbordered ? "0" : "1px"};
  border-radius: ${props => props.$rounded ? "0.25rem" : "0"};

  ${props => !props.$unbordered ? `
    &:focus-within {
      outline-width: 1px;
      outline-style: solid;
      outline-color: ${colors.inputFocus};
    }
  ` : '' }
`;