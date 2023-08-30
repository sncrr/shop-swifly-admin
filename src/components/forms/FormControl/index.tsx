import styled from 'styled-components';
import { colors } from "../../../theme";


export const FormControl = styled.div<{ $unbordered?: boolean; $flex1?: boolean; }>`
  
  display: flex;
  align-items: center;
  min-height: calc(2.5rem + 2px);
  max-width: 40rem;
  border-radius: 0.1rem;
  
  padding: 0 0.5rem;

  border-width: ${props => props.$unbordered ? "0" : "1px"};

  ${props => !props.$unbordered ? `
    &:focus-within {
      outline-width: 1px;
      outline-style: solid;
      outline-color: ${colors.inputFocus};
    }
  ` : '' }

  ${props => props.$flex1 ? `
      flex: 1
    ` : '' }
`;