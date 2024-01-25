import styled from "styled-components";
import { colors } from "../../../theme";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { get, isArray } from "lodash";

interface Props {
    name: string,
    required?: boolean,
    onChange?: any,
}

const Container = styled.td`
    position: relative;
    padding: 1rem 0;
    
    .border-box {
        width: 8rem;
        height: 8rem;
        border-radius: 0.5rem;
        border: 2px dashed ${colors.inputFocus};
    }

    .image-upload {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: -10;
        opacity: 0;
    }

    .image-upload-label {
        height: calc(8rem - 4px);
        width: calc(8rem - 4px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image-upload-text {
        font-size: 0.75rem;
        text-align: center;
    }
    
    .image-upload-preview {
        height: calc(8rem - 8px);
        width: calc(8rem - 8px);
        border-radius: 0.3rem;
        object-fit: contain;
    }
`

export function ImageUpload(props: Props) {

    const [source, setSource] = useState<string>('');

    const { control, setValue, watch, formState: {errors}} = useFormContext();
    
    const value = watch(`files.${props.name}.files`);

    const handleOnDragHover = (e: React.DragEvent<HTMLLabelElement>) => {
        console.log(e);
    }

    const handleOnDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        console.log(e);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let files = e.target.files;
        if (files) {
            for (let file of files) {
                let url = parseFile(file);
                // setSource(url);
                setValue(`files.${props.name}.files`, [url])
                setValue(`files.${props.name}.changed`, true)
            }

            props.onChange ? props.onChange(files) : {};
        }
        // handleOnDragHover(e);
    }

    const parseFile = (file: File) => {
        if (file) {
            return URL.createObjectURL(file)
        }
        else {
            return '';
        }
    }

    useEffect(() => {
        
        if(value) {
            if(isArray(value) && value.length > 0) {
                setSource(value[0]);
            }
            else {
                setSource('')
            }
        }
        else {
            setSource('')
        }
    }, [value])


    return (
        <Container>
            <Controller
                defaultValue={''}
                control={control}
                name={`files.${props.name}.value`}
                render={({
                    field
                }) => (
                    <>
                        <div className="border-box">
                            <label
                                htmlFor={`image-upload-${props.name}`}
                                onDragOver={handleOnDragHover}
                                onDragLeave={handleOnDragHover}
                                onDrop={handleOnDrop}
                            >
                                <div className="image-upload-label">
                                    {
                                        source ? (
                                            <img
                                                className="image-upload-preview"
                                                src={source}
                                                alt="Preview"
                                            />
                                        ) : (
                                            <div className='image-upload-text'>
                                                Select an image or drag here
                                            </div>
                                        )
                                    }

                                </div>
                            </label>
                            <input
                                {...field}
                                id={`image-upload-${props.name}`}
                                className='image-upload'
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    handleOnChange(e);
                                    field.onChange(e)
                                }}
                                required={props.required}
                            />
                        </div>
                        <div className='text-red-500 text-xs h-2 pl-3'>
                            {`${get(errors, `files.${props.name}.value.message`, '')}`}
                        </div>
                    </>
                )}
            />
        </Container>
    )
}