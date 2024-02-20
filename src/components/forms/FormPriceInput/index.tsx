import { InputHTMLAttributes, ReactNode } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInputContainer } from '..';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  nonTabular?: boolean,
  addionalNode?: ReactNode,
  flexible?: boolean,
  unbordered?: boolean,
  className?: string,
  description?: string,
  defaultValue?: string,
}

export const FormPriceInput = (props: Props) => {

  const { control } = useFormContext();

  const inputProps = {
    ...props,
    flexible: undefined,
    unbordered: undefined,
    className: undefined,
    additionalInput: undefined,
    description: undefined,
    defaultValue: undefined,
    addionalNode: undefined,
    nonTabular: undefined,
  }

  return (
    <Parent nonTabular={props.nonTabular} className={`form-control py-2 ${props.className ? props.className : ''}`} >
      <Controller
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        control={control}
        name={props.name}
        disabled={props.disabled}
        render={({
          field,
          fieldState: {
            error
          }
        }) => (
          <>
            <FormInputContainer flexible={props.flexible} unbordered={props.unbordered}>
              <Input
                {...inputProps}
                {...field}
                type='number'
                pattern="^\d*(\.\d{0,2})?$"
              />
            </FormInputContainer>
            {
              props.description ? (
                <div className='text-xs h-2 mb-3 mt-1 pl-3 text-gray-600'>
                  {props.description}
                </div>
              ) : null
            }
            <div className='text-red-500 text-xs h-2 pl-3'>
              {error?.message}
            </div>
          </>
        )}
      />
      {
        props.addionalNode ? (
          <div>
            {props.addionalNode}
          </div>
        ) : null
      }
    </Parent>
  )
}


const Parent = (props: any) => {

  const containerProps = {
    ...props
  };

  delete containerProps.nonTabular;

  if(props.nonTabular) {
    return(
      <div {...containerProps}>
        {containerProps.children}
      </div>
    )
  }
  else {
    return (
      <td {...containerProps}>
        {containerProps.children}
      </td>
    )
  }
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
    color: ${colors.disabledText};
    background-color: ${colors.gray05th};
  }
  &:read-only {
    color: ${colors.disabledText};
    background-color: ${colors.gray05th}; 
  }
  &::placeholder {
    color: ${colors.placeholder};
    /* font-style: italic; */
  }

`;