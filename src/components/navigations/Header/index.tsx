import { styled } from "styled-components"
import { colors } from "../../../theme"
import { AccountDropdown } from "./AccountDropdown"

interface Props {

}

const Container = styled.nav`
    background-color: ${colors.white};
    padding: 1rem;
    width: 100vw;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    height: 5rem;
    border-bottom: 1px solid ${colors.navBorder};
`

export function Header ({} : Props) {

    return (
        <Container className="drop-shadow">
            <div>
                Title
            </div>
            <div>
                <AccountDropdown>
                    Account
                    <ul>
                        <li>Sign out</li>
                    </ul>
                </AccountDropdown>
            </div>
        </Container>
    )
}