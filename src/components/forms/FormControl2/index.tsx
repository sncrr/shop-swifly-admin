import styled from 'styled-components';
import { colors } from "../../../theme";
import { ReactNode } from 'react';

interface Props {
  children: ReactNode,
  flexible?: boolean,
  unbordered?: boolean,
  className?: string,
}

export const Content = styled.div<{ $unbordered?: boolean; $flexible?: boolean; }>`
  
  /* display: flex;
  align-items: center;
  min-height: calc(2.5rem + 2px);
  border-radius: 0.1rem; */
  
  /* padding: 0 0.5rem; */
  width: 100%;
  ${props => !props.$flexible ? "max-width: 30rem;" : `
    display: flex; 
    align-items: 
    center;
  `}

  border-width: ${props => props.$unbordered ? "0" : "1px"};

  ${props => !props.$unbordered ? `
    &:focus-within {
      outline-width: 1px;
      outline-style: solid;
      outline-color: ${colors.inputFocus};
    }
  ` : '' }
`;

export function FormControl2 (props : Props) {

  return (
    <div className={`p-1 ${props.className}`}>
      <Content $flexible={props.flexible} $unbordered={props.unbordered}>
        {props.children}
      </Content>
    </div>
  )
}