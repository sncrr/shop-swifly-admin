import { useEffect, useState} from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';


interface Props {
  type?: string,
  name?: string,
  defaultValue?: string,
  required?: boolean,
  placeholder?: string,
  className?: string,
  min?: number,
  max?: number,
  disabled?: boolean,
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

export function FormInput (props: Props) {

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if(props.defaultValue) {
      setValue(props.defaultValue)
    }
    else {
      setValue("")
    }
  }, [props.defaultValue])
  
  return (
    <Input
      className={props.className}
      placeholder={props.placeholder}
      name={props.name}
      type={props.type}
      required={props.required}
      value={value}
      onChange={e => setValue(e.target.value)}
      min={props.min}
      max={props.max}
      disabled={props.disabled}
    />
  )
}