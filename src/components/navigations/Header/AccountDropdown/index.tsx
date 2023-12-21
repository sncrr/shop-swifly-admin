import { styled } from "styled-components";
import { colors } from "../../../../theme";

export const AccountDropdown = styled.button`
    
    ul {
        position: absolute;
        display: none;
        right: 1.5rem;
    }

    &:focus-within {
        ul {
            background-color: ${colors.white};
            display: block;
            padding: 0.5rem 1rem;
        }
    }
`