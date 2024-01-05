import { InputHTMLAttributes } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl } from '..';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  flexible?: boolean,
  unbordered?: boolean,
  className?: string,
}

export const FormInput = (props: Props) => {

  const { control } = useFormContext();

  const inputProps = {
    ...props,
    flexible: undefined,
    unbordered: undefined,
    className: undefined
  }

  return (
    <td className={`form-control py-2 ${props.className ? props.className : ''}`}>
      <Controller
        defaultValue={''}
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
            <div className='text-red-500 text-xs h-2 pl-3'>
              {error?.message}
            </div>
          </>
        )}
      />
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