import { useEffect, useState } from 'react';
import styled from "styled-components"
import Select from 'react-select'


interface Props {
	options: any[],
	name?: string,
	title?: string,
	labelKey?: string, // Key to get the label from a json object
	valueKey?: string, // Key to get the value from a json object
	defaultValue?: any,
	multiple?: boolean,
	required?: boolean,
	onChanged?: any,
}

const Container = styled.div`
  width: 100%;
`

export function FormSelect({
	options = [],
	name,
	labelKey = "label",
	valueKey = "value",
	defaultValue,
	multiple,
	required,
	onChanged,
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

			if (defaultValue) {
				if (newItem._id == defaultValue._id) {
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
			<Container>
				<Select
					name={name}
					onChange={(value) => {
						setValue(value);
						onChanged ? onChanged(value) : {};
					}}
					value={value}
					options={list}
					isMulti={multiple}
					required={required}
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							borderWidth: 0,
							borderStyle: state.isFocused ? 'none' : 'none',
							boxShadow: 'none'
						}),
						valueContainer: (baseStyles) => ({
							...baseStyles,
							padding: 0,
							margin: 0,
						}),
						dropdownIndicator: (baseStyles) => ({
							...baseStyles,
							paddingRight: 0,
						}),
					}}
				/>
			</Container>
		</>
	)
}