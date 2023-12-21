import styled from "styled-components";
import { MoreHorizontal } from "../../../assets/svgs/Icons/MoreHorizontal";
import { colors } from "../../../theme";

interface Props {
  buttons: {
    label: string,
    onClick: any
  }[]
}
const Menu = styled.button`
    
  ul {
    position: absolute;
    display: none;
    background-color: ${colors.white};
    text-align: left;
    border-radius: 0.3rem;

    li {
      padding: 0.5rem 1rem;
      transition: background-color 150ms ease-in;
    }
    
    li:hover {
      background-color: ${colors.inputFocus};
    }
  }

  &:focus-within {
    ul {
      display: block;
    }
  }
`

const RowActions = ({buttons}: Props) => {
  


  return (
    <Menu>
      <MoreHorizontal size={24} color={colors.mainColor} />
      <ul className="drop-shadow-md">
        {
          buttons.map((item, index) => (
            <li key={index} onClick={item.onClick}>
              {item.label}
            </li>
          ))
        }
      </ul>
    </Menu>
  )
}

export default RowActions;