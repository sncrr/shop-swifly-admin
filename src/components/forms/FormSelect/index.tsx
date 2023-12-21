import { useEffect, useState } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select'

interface Props {
  name: string,

  flexible?: boolean,
  unbordered?: boolean,

	options: any[],
	title?: string,
	labelKey?: string, // Key to get the label from a json object
	valueKey?: string, // Key to get the value from a json object
	defaultValue?: any,
	multiple?: boolean,
	required?: boolean,
	onChanged?: any,
	placeholder?: string,
}

const Container = styled.div`
  width: 100%;
`

export const Content = styled.div<{ $unbordered?: boolean; $flexible?: boolean; }>`
  width: 100%;
  max-width: 40rem;
  ${props => !props.$flexible ? "max-width: 30rem;" : ""}

  border-width: ${props => props.$unbordered ? "0" : "1px"};
  border-radius: 0.25rem;

  ${props => !props.$unbordered ? `
    &:focus-within {
      outline-width: 1px;
      outline-style: solid;
      outline-color: ${colors.inputFocus};
    }
  ` : ''}
`;

export const FormSelect = (props: Props) => {

  const { control } = useFormContext();
  const {
    options = [],
    labelKey = "label",
    valueKey = "value",
    multiple,
  } = props;

  let list = options;
	
	// let selected = defaultValue;

	if (labelKey || valueKey) {
		list = options.map((item) => {
			let newItem = { ...item }
			if (labelKey) {
				newItem.label = item[labelKey];
			}

			if (valueKey) {
				newItem.value = item[valueKey];
			}

			// if (defaultValue) {
			// 	if (newItem._id == defaultValue._id) {
			// 		selected = newItem;
			// 	}
			// }
			return newItem;
		})
	}

	const getSelectedItem = (selected: string) => {
		if(selected)
      return list.find(({value}) => value === selected);
    else
      return null
	}

  return (
    <td className='py-2'>
      <Controller
        control={control}
        name={props.name}
        render={({
          field,
          fieldState: {
            error
          }
        }) => {

					if(field.value) {
						field = {
							...field,
							value: getSelectedItem(field.value[valueKey])
						}
					}

					return (
						<>
							<Content $flexible={props.flexible} $unbordered={props.unbordered}>
								<Container>
									<Select
										{...field}
										isMulti={multiple}
										options={list}
										styles={{
											control: (baseStyles, state) => ({
												...baseStyles,
												borderWidth: 0,
												borderStyle: state.isFocused ? 'none' : 'none',
												boxShadow: 'none'
											}),
											valueContainer: (baseStyles) => ({
												...baseStyles,
												padding: "0 0.5rem",
												margin: 0,
											}),
											dropdownIndicator: (baseStyles) => ({
												...baseStyles,
												padding: "0 0.5rem"
											}),
											indicatorSeparator: () => ({
												width: 0
											})
										}}
									/>
								</Container>
							</Content>
							<div className='text-red-500 text-xs h-2 pl-3'>
								{error?.message}
							</div>
						</>
					)
				}}
      />
    </td>
  )
}