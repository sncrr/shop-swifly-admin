import styled from 'styled-components';
import { colors } from "../../../theme";


export const FormControl = styled.div`
  border-width: 1px;
  /* padding: auto; */
  min-height: calc(2.5rem + 2px);
  min-width: 20rem;
  border-radius: 0.25rem;
  
  input {
    width: 100%;
    outline: none;
    font-size: 1rem;
  }

  &:focus-within {
    outline-width: 1px;
    outline-style: solid;
    outline-color: ${colors.inputFocus};
  }
`;