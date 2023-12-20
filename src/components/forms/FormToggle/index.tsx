import { styled } from 'styled-components';
import { colors } from '../../../theme';
import { InputHTMLAttributes } from 'react';

interface Props {
    inputProps?: InputHTMLAttributes<HTMLInputElement>,
    rounded?: boolean,
}

const Container = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
    position: relative;
    
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

export const FormToggle = (props: Props) => {

    return (
        <Container>
            {/* <input className='w-0 h-0 opacity-0' type="number" name={name} value={value} onChange={() => {}} /> */}
            {
                props.rounded === true ? (
                    <label className="switch">
                        <input 
                            {...props.inputProps}
                            type="checkbox"
                        />
                        <span className="slider round"></span>
                    </label>
                ) : (
                    <label className="switch">
                        <input 
                            {...props}
                            type="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                )
            }
        </Container>
    )
}