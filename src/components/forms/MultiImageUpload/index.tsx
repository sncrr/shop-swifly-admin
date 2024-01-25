import styled from "styled-components";
import { colors } from "../../../theme";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { get } from "lodash";

interface Props {
    name: string,
    required?: boolean,
    onChange?: any,
}

const Container = styled.td`

    position: relative;
    padding: 1rem 0;
    max-width: 40rem;

    .image-upload {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: -10;
        opacity: 0;
    }

    .image-upload-label {
        border-radius: 0.5rem;
        border: 2px dashed ${colors.inputFocus};
        min-height: 16rem;
        min-width: 32rem;
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;
    }
    .image-upload-text {
        font-size: 0.75rem;
        text-align: center;
        width: 100%;
    }
    .image-upload-preview {
        height: 8rem;
        width: 8rem;
        margin: 2px;
        padding: 2px;
        border: 1px solid ${colors.gray10th};
        object-fit: contain;
    }
`

export function MultiImageUpload(props: Props) {

    const [sources, setSources] = useState<string[]>([]);

    const { control, setValue, watch, formState: { errors } } = useFormContext();

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
            let sources = [];
            for (let file of files) {
                sources.push(parseFile(file))
            }

            setSources(sources);
            setValue(`files.${props.name}.files`, sources)
            setValue(`files.${props.name}.changed`, true)

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
        setSources(value);
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
                        <div>
                            <label
                                htmlFor={`image-upload-${props.name}`}
                                onDragOver={handleOnDragHover}
                                onDragLeave={handleOnDragHover}
                                onDrop={handleOnDrop}
                            >
                                <div className="image-upload-label">
                                    {
                                        sources.length > 0 ? (
                                            sources.map((path, index) => (
                                                path && (
                                                    <img
                                                        key={index}
                                                        className="image-upload-preview"
                                                        src={path}
                                                        alt={`Preview ${index}`}
                                                    />
                                                )
                                            ))
                                        ) : (
                                            <div className='image-upload-text flex justify-center items-center'>
                                                Select images or drag here
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
                                multiple
                                onChange={(e) => {
                                    handleOnChange(e);
                                    field.onChange(e)
                                }}
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