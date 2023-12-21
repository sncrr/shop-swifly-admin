import styled from 'styled-components';
import { colors } from "../../../theme";

export const Reset = styled.input.attrs(() => ({
  name: 'reset',
  type: 'reset'
}))`
  /* width: 100%; */
  /* min-width: 4rem; */
  /* padding: 0.75rem 2.5rem; */
  /* color: ${colors.mainColor}; */
  font-size: 1rem;
  font-weight: 600;
  /* padding: 0.6rem; */
  min-height: 2.5rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:disabled {
    background-color: ${colors.mainColor}AA;
  }
`;