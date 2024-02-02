import { styled } from 'styled-components';
import { colors } from '../../../theme';
import { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  rounded?: boolean,
  className?: string,
}

export const FormToggle = (props: Props) => {

  const { rounded = true } = props

  const { control } = useFormContext();

  const inputProps = {
    ...props,
    rounded: undefined,
    className: undefined,
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
        }) => (
          <>
            <Container>
              <label className="switch">
                <input
                  {...inputProps}
                  {...field}
                  checked={!!field.value}
                  type="checkbox"
                />
                <span className={`slider ${rounded ? 'round' : ''}`}></span>
              </label>
            </Container>
            <div className='text-red-500 text-xs h-2 pl-3'>
              {error?.message}
            </div>
          </>
        )}
      />
    </td>

  )
}

const Container = styled.div`
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 0.75rem;
  
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 3.5rem;
    height: 2rem;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: ${colors.mainColor};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${colors.mainColor};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.5rem);
    -ms-transform: translateX(1.5rem);
    transform: translateX(1.5rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 4rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }

`;