import styled from 'styled-components';
import { colors } from "../../../theme";

export const Reset = styled.input.attrs(() => ({
  name: 'reset',
  type: 'reset'
}))`

  font-size: 1rem;
  font-weight: 600;
  min-height: 2.5rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:disabled {
    background-color: ${colors.mainColor}AA;
  }
`;