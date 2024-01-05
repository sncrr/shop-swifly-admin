import { FormEvent, InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { colors } from "../../../theme";
import styled from "styled-components";
import { Control } from "..";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode,
  onSubmit?: any,
  rounded?: boolean,
  unbordered?: boolean,
}

export const TextField = (props: Props) => {

  const {
    rounded,
    unbordered,
    children,
    onSubmit,
  } = props;

  const inputProps = {
    ...props,
    children: undefined,
    rounded: undefined,
    unbordered: undefined,
    onSubmit: undefined
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const value = data.get('input');

    if (onSubmit) {
      onSubmit(value);
    }
  };
  
  return (
    <Control
      className="flex items-center"
      $rounded={rounded}
      $unbordered={unbordered}
      onSubmit={handleSubmit}
    >
      {children}
      <Input
        {...inputProps}
        name="input"
      />
    </Control>
  )
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
  &::placeholder {
    color: ${colors.placeholder};
    /* font-style: italic; */
  }

`;