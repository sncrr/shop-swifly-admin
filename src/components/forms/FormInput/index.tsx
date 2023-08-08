import { useEffect, useState} from 'react';
import styled from "styled-components";


interface Props {
  type: string,
  name: string,
  defaultValue?: string,
  required?: boolean,
}

const Input = styled.input`
  
  height: 100%;
  display: inline;
  min-height: 2.5rem;
  padding: 0 0.5rem;
  background-color: transparent;
`;

export function FormInput (props: Props) {

  const [value, setValue] = useState<string | undefined>("");

  useEffect(() => {
    setValue(props.defaultValue)
  }, [props.defaultValue])
  
  return (
    <Input
      name={props.name}
      type={props.name}
      required={props.required}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}