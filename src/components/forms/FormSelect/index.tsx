import styled from "styled-components";
import { colors } from '../../../theme';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select'
import { Category } from "../../../models/Category";

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
  className?: string,
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
    placeholder
  } = props;

  let list = options;

  if (labelKey || valueKey) {
    list = options.map((item) => {
      let newItem = { ...item }
      if (labelKey) {
        newItem.label = item[labelKey];
      }

      if (valueKey) {
        newItem.value = item[valueKey];
      }
      return newItem;
    })
  }

  const getSelectedItem = (selected: string) => {
    if (selected)
      return list.find(({ value }) => value === selected);
    else
      return null
  }

  const getSelectedItems = (selectedItems: Category[]) => {

    if (selectedItems && selectedItems.length > 0) {
      let items = [];
      for (let selected of selectedItems) {
        let item = list.find(({ value }) => value === selected._id);
        if (item) {
          items.push(item)
        }
      }

      return items;
    }
    else
      return []
  }

  return (
    <td className={`form-control py-2 ${props.className ? props.className : ''}`}>
      <Controller
        control={control}
        name={props.name}
        render={({
          field,
          fieldState: {
            error
          }
        }) => {

          if (field.value) {
            field = {
              ...field,
              value: props.multiple
                ? getSelectedItems(field.value)
                : getSelectedItem(field.value[valueKey])
            }
          }

          return (
            <>
              <Content $flexible={props.flexible} $unbordered={props.unbordered}>
                <Container>
                  <Select
                    {...field}
                    placeholder={placeholder}
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
                      }),
                      placeholder: (baseStyles) => ({
                        ...baseStyles,
                        // fontStyle: "italic",
                        color: colors.placeholder
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