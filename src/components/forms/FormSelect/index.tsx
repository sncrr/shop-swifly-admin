import { useEffect, useState } from 'react';
import styled from "styled-components"
import { CaretDownFill } from "../../../assets/svgs"
import { colors } from "../../../theme"


interface Props {
  options: any[],
  name: string,
  title?: string,
  labelKey?: string, // Key to get the label from a json object
  valueKey?: string, // Key to get the value from a json object
  defaultValue?: string,
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Select = styled.select`
  height: 100%;
  display: inline;
  min-height: 2.5rem;
  padding: 0 0.5rem;
  background-color: transparent;
  z-index: 1;
  appearance: none; // hide dropdown arrow
`

export function FormSelect ({
  options = [],
  name,
  title,
  labelKey = "label",
  valueKey = "value",
  defaultValue = "",
}: Props) {

  const [value, setValue] = useState<string>("");
  
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])

  return (
    <Container>
      <Select 
        name={name}
        title={title}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full outline-none h-full"
      >
        {
          options.map((item: any, index: number) => (
            <option
              key={index}
              value={item[valueKey]}
            >
              {item[labelKey]}
            </option>
          ))
        }
      </Select>
      <label htmlFor={name} className="absolute right-2 z-0">
        <CaretDownFill color={colors.inputFocus} />
      </label>
    </Container>
  )
}