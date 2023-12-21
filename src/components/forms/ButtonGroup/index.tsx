import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem 2rem;
  
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem/* 32px */ * var(--tw-space-x-reverse));
    margin-left: calc(2rem/* 32px */ * calc(1 - var(--tw-space-x-reverse)));
  }
`