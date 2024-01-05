import { TextareaHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from "styled-components";
import { FormControl } from '..';


interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string,
  flexible?: boolean,
  unbordered?: boolean,
  className?: string,
}

export function FormTextArea(props: Props) {
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
              <TextArea
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

export const TextArea = styled.textarea`
  height: 100%;
  display: inline;
  min-height: 7rem;
  padding: 0.5rem;
  background-color: transparent;
  width: 100%;
  outline: none;
`;