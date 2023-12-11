import { styled } from 'styled-components';
import { colors } from '../../../theme';
import { useState } from 'react';

interface Props {
    name?: string,
    rounded?: boolean,
    defaultValue?: number,
}

const Container = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
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
        z-index: -10;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 1.5rem;
        width: 1.5rem;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        z-index: -10;
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

export function FormToggle({
    name,
    defaultValue,
    rounded = true
}: Props) {

    const [value, setValue] = useState(defaultValue ? defaultValue : 0);

    return (
        <Container>
            <input className='w-0 h-0 opacity-0' type="number" name={name} value={value} onChange={() => {}} />
            {
                rounded ? (
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            defaultChecked={defaultValue ? true : false}
                            onChange={e => {
                                setValue(e.target.checked ? 1 : 0)
                            }}
                        />
                        <span className="slider round"></span>
                    </label>
                ) : (
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            defaultChecked={defaultValue ? true : false}
                            onChange={e => {
                                setValue(e.target.checked ? 1 : 0)
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                )
            }
        </Container>
    )
}