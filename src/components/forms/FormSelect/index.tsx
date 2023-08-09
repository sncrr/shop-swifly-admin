import { useEffect, useState } from 'react';
import styled from "styled-components"
import { CaretDownFill } from "../../../assets/svgs"
import { colors } from "../../../theme"
import Select from 'react-select'


interface Props {
  options: any[],
  name: string,
  title?: string,
  labelKey?: string, // Key to get the label from a json object
  valueKey?: string, // Key to get the value from a json object
  defaultValue?: any,
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

// const Select = styled.select`
//   height: 100%;
//   display: inline;
//   min-height: 2.5rem;
//   padding: 0 0.5rem;
//   background-color: transparent;
//   z-index: 1;
//   appearance: none; // hide dropdown arrow
// `

export function FormSelect({
  options = [],
  name,
  title,
  labelKey = "label",
  valueKey = "value",
  defaultValue,
}: Props) {

  let list = options;
  let selected = defaultValue;
  if (labelKey || valueKey) {
    list = options.map((item) => {

      
      let newItem = { ...item }
      if (labelKey) {
        newItem.label = item[labelKey];
      }

      if (valueKey) {
        newItem.value = item[valueKey];
      }

      if(defaultValue) {
        if(newItem._id == defaultValue._id) {
          selected = newItem;
        }
      }

      return newItem;
    })
  }

  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    setValue(selected);
  }, [defaultValue])


  return (
    <>
      <input
        name={name}
        title={title}
        className='w-0 h-0 absolute'
        value={value && value._id ? value._id : ''}
        onChange={() => {}}
      />
      <Select
        defaultValue={value}
        value={value}
        onChange={setValue}
        options={list}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderWidth: 0,
            borderStyle: state.isFocused ? 'none' : 'none',
            boxShadow: 'none'
          }),
        }}
      />
    </>
  )

  // return (
  //   <Container>
  //     <Select 
  //       name={name}
  //       title={title}
  //       value={value}
  //       onChange={(e) => setValue(e.target.value)}
  //       className="w-full outline-none h-full"
  //     >
  //       {
  //         options.map((item: any, index: number) => (
  //           <option
  //             key={index}
  //             value={item[valueKey]}
  //           >
  //             {item[labelKey]}
  //           </option>
  //         ))
  //       }
  //     </Select>
  //     <label htmlFor={name} className="absolute right-2 z-0">
  //       <CaretDownFill color={colors.inputFocus} />
  //     </label>
  //   </Container>
  // )
}