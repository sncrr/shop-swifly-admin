import { styled } from "styled-components";
import { colors } from "../../../theme";
import { TableHTMLAttributes } from "react";

interface Props extends TableHTMLAttributes<HTMLTableElement> {
    isLoading?: boolean;
}

export const StlyledTable = styled.table`
    /* border: 1px solid ${colors.inputFocus}; */
    /* padding: 1rem; */
    text-align: left;
    overflow: auto;
    width: 100%;
`

export const Table = (props: Props) => {

    const isLoading = props.isLoading;
    let tableProps = {
        ...props, isLoading: undefined
    }

    return (
        <div className="flex-1 relative">
            <StlyledTable {...tableProps} />
            {
                isLoading && (
                    <div className="absolute flex justify-center items-center bg-modal z-10 top-0 h-full w-full modal-backdrop">
                        Fetching...
                    </div>
                )
            }
        </div>
    )
}