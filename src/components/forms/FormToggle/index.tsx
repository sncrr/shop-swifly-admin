import { styled } from 'styled-components';
import { colors } from '../../../theme';

interface Props {
    name?: string,
    rounded?: boolean,
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
    rounded = true
}: Props) {

    return (
        <Container>
            {
                rounded ? (
                    <label className="switch">
                        <input type="checkbox" name={name} />
                        <span className="slider round"></span>
                    </label>
                ) : (
                    <label className="switch">
                        <input type="checkbox" name={name} />
                        <span className="slider"></span>
                    </label>
                )
            }
        </Container>
    )
}