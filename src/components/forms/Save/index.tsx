import styled from 'styled-components';
import { colors } from "../../../theme";

interface Props {
    text?: string,
    onClick?: any,
}

const Button = styled.button.attrs(() => ({
    id: 'submit',
    type: 'submit'
}))`

  /* padding: 0.75rem 1rem; */
  /* background-color: ${colors.mainColor}; */
  /* color: ${colors.white}; */
  font-size: 1rem;
  font-weight: 600;
  min-height: 2.5rem;
  border-radius: 0.2rem;

  &:disabled {
    background-color: ${colors.mainColor}AA;
  }
`;

export function Save(props : Props) {
    return (
        <Button onClick={props.onClick}>
            { props.text }
        </Button>
    )
}