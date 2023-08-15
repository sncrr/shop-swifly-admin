import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../theme";

interface Props {
    children?: React.ReactNode;
}

const Container = styled.th`
    border: 1px solid ${colors.inputFocus};
    background-color: ${colors.mainColor};
    color: ${colors.white};
`;

const Resizer = styled.div`
    width: 2px;
    cursor: col-resize;
    height: 100%;
    margin-left: calc(1rem - 2px);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3.5rem;
  padding-left: 1rem;
`;

export function THead({ children }: Props) {
    const initialWidth = 0; // Set your desired initial width
    const [columnWidth, setColumnWidth] = useState(initialWidth);
    const [resizing, setResizing] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setResizing(true);

        const initialMouseX = e.clientX;
        const initialWidthValue = columnWidth || initialWidth;

        const handleMouseMove = (event: MouseEvent) => {
            console.log("MOVING");

            const newWidth = initialWidthValue + event.clientX - initialMouseX;
            setColumnWidth(newWidth);
        };

        const handleMouseUp = () => {
            setResizing(false);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <Container style={{ width: columnWidth ? columnWidth : "auto" }}>
            <FlexContainer>
                <div className="flex-1">{children}</div>
                <Resizer
                    onMouseDown={handleMouseDown}
                />
            </FlexContainer>
        </Container>
    );
}
