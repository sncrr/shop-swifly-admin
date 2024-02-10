import { FormEvent, InputHTMLAttributes, ReactNode } from "react";
import { colors } from "../../../theme";
import styled from "styled-components";
import { Control } from "..";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean,
  unbordered?: boolean,

  children?: ReactNode,
  leftNode?: ReactNode,
  rightNode?: ReactNode,

  onSubmitValue?: (value: string) => any,
  onChangeText?: (value: string) => any,
}

export const TextField = (props: Props) => {

  const {
    name,
    rounded,
    unbordered,
    onSubmitValue,
    leftNode,
    rightNode,
    onChangeText
  } = props;

  const inputProps = {
    ...props,
    children: undefined,
    rounded: undefined,
    unbordered: undefined,
    leftNode: undefined,
    rightNode: undefined,
    onSubmitValue: undefined,
    onChangeText: undefined,
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const value: any = data.get(name ? name : 'input');

    if (onSubmitValue) {
      onSubmitValue(value ? value : '');
    }
  };
  
  return (
    <Control
      className="flex items-center"
      $rounded={rounded}
      $unbordered={unbordered}
      onSubmit={handleSubmit}
    >
      { leftNode }
      <Input
        {...inputProps}
        onChange={(e) => onChangeText ? onChangeText(e.target.value) : {}}
        name={name ? name : 'input'}
      />
      { rightNode }
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
  }

`;