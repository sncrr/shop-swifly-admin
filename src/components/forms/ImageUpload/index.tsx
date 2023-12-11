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
        height: 8rem;
        width: 8rem;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image-upload-text {
        font-size: 0.75rem;
        text-align: center;
    }
    .image-upload-preview {
        height: 8rem;
        width: 8rem;
        object-fit: contain;
    }
`

export function ImageUpload(props: Props) {

    const [source, setSource] = useState<string>('');

    const handleOnDragHover = (e : React.DragEvent<HTMLLabelElement>) => {

    }

    const handleOnDrop = (e : React.DragEvent<HTMLLabelElement>) => {

    }

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        let files = e.target.files;
        if(files) {
            for (let i = 0, file; file = files[i]; i++) {
                parseFile(file);
            }
            
            props.onChange ? props.onChange(files) : {};
        }
        // handleOnDragHover(e);
    }

    const parseFile = (file : File) => {

        if(file) {
            setSource(URL.createObjectURL(file))
        }
        else {
            setSource('');
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
                id={`image-upload-${props.id}`}
                className='image-upload'
                type="file" 
                name={props.name} 
                accept="image/*" 
                onChange={handleOnChange}
                required={props.required}
            />
        </Container>
    )
}