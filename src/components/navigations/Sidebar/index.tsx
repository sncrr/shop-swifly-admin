import { colors } from "../../../theme";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import { NavSubList } from "./NavSubList";
import { NavSubItem } from "./NavSubItem";
import { styled } from "styled-components";
import { sidebarNavigations } from "../../../pages/Admin/paths";
import { Link } from "@tanstack/react-router";

const ICON_SIZE = 32;
const ICON_COLOR = colors.black;
const ICON_ACTIVE_COLOR = colors.active;

interface Props {

}

const Container = styled.aside`
  background-color: ${colors.white};
  height: calc(100vh - 5rem);
  width: 7rem;
  position: fixed;
  z-index: 20;
  top: 5rem;
  left: 0;
  border-right: 0.3rem solid ${colors.navBorder};
`

export const Sidebar = ({ }: Props) => {

  const getIsActive = (item: any) => {

    if (item.path)
      return window.location.pathname.includes(item.path)

    else if (item.children)
      for (let child of item.children)
        if (window.location.pathname.includes(child.path))
          return true;

    return false;
  }

  return (
    <Container>
      <NavList>
        {
          sidebarNavigations.map((item, index) => {

            let isActive = getIsActive(item)

            return (
              <NavListItem
                key={index}
                className="nav-list-item"
                $isActive={isActive}
              >
                {
                  item.children ? (
                    <div>
                      <item.icon
                        color={isActive ? ICON_ACTIVE_COLOR : ICON_COLOR}
                        size={ICON_SIZE}
                      />
                      <span>{item.label}</span>
                      <NavSubList>
                        <div className="title">{item.label}</div>
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
                      <item.icon
                        color={isActive ? ICON_ACTIVE_COLOR : ICON_COLOR}
                        size={ICON_SIZE}
                      />
                      <span>{item.label}</span>
                    </Link>
                  )
                }
              </NavListItem>
            )
          })
        }
      </NavList>
    </Container>
  )
}