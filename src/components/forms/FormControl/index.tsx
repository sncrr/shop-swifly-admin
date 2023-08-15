import styled from 'styled-components';
import { colors } from "../../../theme";


export const FormControl = styled.div<{ $unbordered?: string; }>`
 
  min-height: calc(2.5rem + 2px);
  max-width: 40rem;
  /* width: 100%; */
  border-radius: 0.1rem;

  border-width: ${props => props.$unbordered ? "0" : "1px"};

  ${props => !props.$unbordered ? `
    &:focus-within {
      outline-width: 1px;
      outline-style: solid;
      outline-color: ${colors.inputFocus};
    }
  ` : '' }
`;