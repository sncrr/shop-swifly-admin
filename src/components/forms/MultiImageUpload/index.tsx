import styled from "styled-components";
import { colors } from "../../../theme";
import React, { useState } from "react";

interface Props {
    id: string,
    name?: string,
    required?: boolean,
    onChange?: any,
}

const Container = styled.div`

    position: relative;
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

export function MultiImageUpload(props:Props) {

    const [sources, setSources] = useState<string[]>([]);

    const handleOnDragHover = (e : React.DragEvent<HTMLLabelElement>) => {

    }

    const handleOnDrop = (e : React.DragEvent<HTMLLabelElement>) => {

    }

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        let files = e.target.files;
        if(files) {
            let sources = [];
            for (let i = 0, file; file = files[i]; i++) {
                sources[i] = parseFile(file);
            }

            setSources(sources);
            
            props.onChange ? props.onChange(files) : {};
        }

        // handleOnDragHover(e);
    }

    const parseFile = (file : File) => {

        if(file) {
            return URL.createObjectURL(file)
        }
        else {
            return '';
        }
    }

    return (
        <Container>

            <label 
                htmlFor={`image-upload-${props.id}`}
                onDragOver={handleOnDragHover}
                onDragLeave={handleOnDragHover}
                onDrop={handleOnDrop}
            >
                <div className="image-upload-label">
                    {
                        sources.length > 0? (
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
                id={`image-upload-${props.id}`}
                className='image-upload'
                type="file" 
                name={props.name}
                accept="image/*" 
                multiple
                onChange={handleOnChange}
                required={props.required}
            />
        </Container>
    )
}