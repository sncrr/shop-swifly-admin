import { InputHTMLAttributes } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string,
  flexible?: boolean,
  unbordered?: boolean,
  inputProps?: InputHTMLAttributes<HTMLInputElement>
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
  
  &:placeholder-shown {
    font-style: italic;
  }
`;

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
  ` : '' }
`;

export const FormInput = (props: Props) => {

  const { control } = useFormContext();

  return (
    <td className='py-2'>
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
            <Content $flexible={props.flexible} $unbordered={props.unbordered}>
              <Input
                {...props.inputProps}
                {...field}
              />
            </Content>
            <div className='text-red-500 text-xs h-2 pl-3'>
              {error?.message}
            </div>
          </>
        )}
      />
    </td>
  )
}