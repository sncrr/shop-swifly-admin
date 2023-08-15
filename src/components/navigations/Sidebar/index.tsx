import { Link } from "react-router-dom";
import { BarChart, BarChartLineFill, Box2, Shop } from "../../../assets/svgs";
import { Coin } from "../../../assets/svgs/Coin";
import { colors } from "../../../theme";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import { NavSubList } from "./NavSubList";
import { Paths } from "../../../constants";
import { NavSubItem } from "./NavSubItem";
import { styled } from "styled-components";


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
          <NavListItem>
            <Link to={Paths.DASHBOARD}>
              <BarChart color={ICON_COLOR} size={ICON_SIZE} />
              <span>Dashboard</span>
            </Link>
          </NavListItem>
          <NavListItem>
            <div>
              <Box2 color={ICON_COLOR} size={ICON_SIZE} />
              <span>Inventory</span>
            </div>
            <NavSubList>
              <NavSubItem>
                <Link to={Paths.CATEGORY}>
                  Categories
                </Link>
              </NavSubItem>
              <NavSubItem>
                <Link to={Paths.PRODUCT}>
                  Products
                </Link>
              </NavSubItem>
            </NavSubList>
          </NavListItem>
          <NavListItem>
            <Coin color={ICON_COLOR} size={ICON_SIZE} />
            <span>Profit</span>
            <NavSubList>
              <NavSubItem>
                <Link to={Paths.CATEGORY}>
                  Orders
                </Link>
              </NavSubItem>
              <NavSubItem>
                <Link to={Paths.PRODUCT}>
                  Invoices
                </Link>
              </NavSubItem>
            </NavSubList>
          </NavListItem>
          <NavListItem>
            <Shop color={ICON_COLOR} size={ICON_SIZE} />
            <NavSubList>
              <NavSubItem>
                <Link to={Paths.STORE}>
                  Stores
                </Link>
              </NavSubItem>
              <NavSubItem>
                <Link to={Paths.STORE}>
                  Delivery
                </Link>
              </NavSubItem>
              <NavSubItem>
                <Link to={Paths.STORE}>
                  Pick Up
                </Link>
              </NavSubItem>
            </NavSubList>
          </NavListItem>
        </NavList>
      </div>
    </Container>
  )
}