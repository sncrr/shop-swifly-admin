import { styled } from "styled-components"
import { colors } from "../../../theme"
import { AccountDropdown } from "./AccountDropdown"
import { CaretDownFill } from "../../../assets/svgs/Icons"
import { useEffect, useState } from "react"

interface Props {
    user: any
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
    z-index: 10;
`

export function Header (props : Props) {

    const { user } = props;
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {

    }, [user]);

    return (
        <Container className="drop-shadow">
            <div>
                Title
            </div>
            <div>
                <div className="flex h-full w-72 border-l px-4">
                    <div>

                    </div>
                    <div className="flex-1">
                        <div>
                            {currentUser ? currentUser : ""}
                        </div>
                        <div>
                            {currentUser ? currentUser : ""}
                        </div>
                    </div>
                    <AccountDropdown>
                        <CaretDownFill />
                        <ul className="drop-shadow-md">
                            <li>Sign out</li>
                        </ul>
                    </AccountDropdown>
                </div>
                
            </div>
        </Container>
    )
}