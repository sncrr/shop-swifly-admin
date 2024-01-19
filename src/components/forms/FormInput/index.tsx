import { InputHTMLAttributes, ReactNode } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl } from '..';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  addionalNode?: ReactNode,
  flexible?: boolean,
  unbordered?: boolean,
  className?: string,
  description?: string,
  defaultValue?: string,
}

export const FormInput = (props: Props) => {

  const { control } = useFormContext();

  const inputProps = {
    ...props,
    flexible: undefined,
    unbordered: undefined,
    className: undefined,
    additionalInput: undefined,
    description: undefined,
    defaultValue: undefined,
  }

  return (
    <td className={`form-control py-2 ${props.className ? props.className : ''}`}>
      <Controller
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        control={control}
        name={props.name}
        render={({
          field,
          fieldState: {
            error
          }
        }) => (
          <>
            <FormControl flexible={props.flexible} unbordered={props.unbordered}>
              <Input
                {...inputProps}
                {...field}
              />
            </FormControl>
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
    </td>
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
    /* font-style: italic; */
  }

`;