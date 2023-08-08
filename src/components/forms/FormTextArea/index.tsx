import { useEffect, useState} from 'react';
import styled from "styled-components";


interface Props {
  name: string,
  defaultValue?: string,
  required?: boolean,
}

export const TextArea = styled.textarea`
  
  height: 100%;
  display: inline;
  min-height: 4rem;
  padding: 0.5rem;
  background-color: transparent;
  width: 100%;
  outline: none;
`;

export function FormTextArea (props: Props) {

  const [value, setValue] = useState<string | undefined>("");

  useEffect(() => {
    setValue(props.defaultValue)
  }, [props.defaultValue])
  
  return (
    <TextArea
      name={props.name}
      required={props.required}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}