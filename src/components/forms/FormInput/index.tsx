import { InputHTMLAttributes } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string,
}

const Input = styled.input`
  
  width: 100%;
  outline: none;
  font-size: 1rem;
  height: 100%;
  display: inline;
  min-height: 2.5rem;
  background-color: transparent;
  padding: 0.5rem;

  &:disabled {
    color: ${colors.inputFocus};
  }
  
  &:placeholder-shown {
    font-style: italic;
  }
`;

export const FormInput = (props : Props) => {
  
  return (
    <Input
      {...props}
    />
  )
}