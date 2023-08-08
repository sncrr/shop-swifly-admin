import { styled } from "styled-components";

export const AccountDropdown = styled.button`
    
    ul {
        display: none;
    }

    &:focus-within {
        ul {
            display: block;
        }
    }
`