import { Link } from "react-router-dom";
import { BarChart, Box2, Shop } from "../../../assets/svgs";
import { Coin } from "../../../assets/svgs/Coin";
import { colors } from "../../../theme";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import { NavSubList } from "./NavSubList";
import { Paths } from "../../../constants";
import { NavSubItem } from "./NavSubItem";
import { styled } from "styled-components";
import { navigations } from "./navigations";


const ICON_SIZE = 20;
const ICON_COLOR = colors.white;

interface Props {

}

const Container = styled.aside`
  background-color: ${colors.mainDark};
  height: 100vh;
  width: 4rem;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
`

export function Sidebar({ }: Props) {
  


  return (
    <Container>
      <div>

      </div>

      <div>
        <NavList>
          {
            navigations.map((item, index) => (
              <NavListItem key={index}>
                {
                  item.children ? (
                    <div>
                      <item.icon color={ICON_COLOR} size={ICON_SIZE} />
                      <span>{item.label}</span>
                      <NavSubList>
                        {
                          item.children.map((child, childIndex) => (
                            <NavSubItem key={childIndex}>
                              <Link to={child.path}>
                                {child.label}
                              </Link>
                            </NavSubItem>
                          ))
                        }
                      </NavSubList>
                    </div>
                  ) : (
                    <Link to={item.path}>
                      <item.icon color={ICON_COLOR} size={ICON_SIZE} />
                      <span>{item.label}</span>
                    </Link>
                  )
                }
              </NavListItem>
            ))
          }
        </NavList>
      </div>
    </Container>
  )
}