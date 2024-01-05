import { styled } from "styled-components";
import { gray05th } from "../../../theme/colors";

export const TBody = styled.tbody`
    tr:nth-child(even):not(tr tr) {
        background-color: ${gray05th};
    }
`