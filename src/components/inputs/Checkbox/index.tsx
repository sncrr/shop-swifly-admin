import { InputHTMLAttributes, useState } from "react";
import { colors } from "../../../theme";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  onSubmit?: any,
  rounded?: boolean,
  unbordered?: boolean,
  defaultValue?: any
}

export const Checkbox = (props: Props) => {

  const [checked, setChecked] = useState(props.defaultValue);

  const {
    label,
    name,
    onSubmit
  } = props;

  const inputProps = {
    ...props,
    children: undefined,
    rounded: undefined,
    unbordered: undefined,
    onSubmit: undefined
  }

  // useEffect(() => {
  //   handleSubmit();
  // }, [checked]);

  const handleSubmit = (value: boolean) => {

    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <Control>
      <label className="relative text-left h-12">
        <Input
          {...inputProps}
          type="checkbox"
          name={name ? name : 'input'}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            handleSubmit(e.target.checked);
          }}
        />
        <span className="box">
          <span className="check border rounded-sm" />
        </span>
        <span className="pl-2 text-sm">
          {label}
        </span>
      </label>
    </Control>
  )
}

const Input = styled.input`
    outline: none;
    position: absolute;
    top: -1px;
    left: 2px;
    height: calc(1.5rem + 2px);
    width: calc(1.5rem - 2px);
    border-radius: 0.5rem;
    opacity: 0;
`;

export const Control = styled.div`
    text-align: left;

    .box{
        padding-top: 1px;
        padding-bottom: 1px;
        border: 1px solid ${colors.transparent};
        border-radius: 0.2rem;
    }

    .check {
        padding-left: calc(1.5rem - 2px);
        height: 0;
    }

    
    input:checked {
        opacity: 1;
    }

    input:focus + .box{

        border: 1px solid ${colors.inputFocus};
    }

`;