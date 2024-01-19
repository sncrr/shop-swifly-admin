import { InputHTMLAttributes, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { colors } from "../../../theme";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    flexible?: boolean,
    label?: string,
    className?: string,
    description?: string,
    defaultValue?: any
}

export function FormCheckBox(props: Props) {

    const { control } = useFormContext();

    const inputProps = {
        ...props,
        description: undefined,
        flexible: undefined,
        className: undefined,
        defaultValue: undefined
    }

    return (
        <td className={`form-control py-2 ${props.description ? 'pt-4' : ''} ${props.className ? props.className : ''}`}>
            <Controller
                defaultValue={props.defaultValue ? props.defaultValue : false}
                control={control}
                name={props.name}
                render={({
                    field,
                    fieldState: {
                        error
                    }
                }) => (
                    <>
                        <FormControl>
                            <label className="relative text-left h-12">
                                <Input
                                    {...inputProps}
                                    {...field}
                                    checked={field.value}
                                    type="checkbox"
                                />
                                <span className="box">
                                    <span className="check border rounded-sm" />
                                </span>
                                <span className="pl-2 text-sm">
                                    {props.label}
                                </span>
                            </label>
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
        </td>
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

export const FormControl = styled.div`
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