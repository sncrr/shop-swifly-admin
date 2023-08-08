import styled from 'styled-components';
import { colors } from "../../../theme";


export const Submit = styled.button.attrs(() => ({
  type: 'submit'
}))`
  /* width: 100%; */
  /* min-width: 4rem; */
  padding: 0 1.5rem;
  background-color: ${colors.mainColor};
  color: ${colors.white};
  font-size: 0.9rem;
  font-weight: 600;
  /* padding: 0.6rem; */
  min-height: 2.5rem;
  border-radius: 0.2rem;

  &:disabled {
    background-color: ${colors.mainColor}AA;
  }
`;