import { styled } from "styled-components"
import { colors } from "../../../theme"
import { AccountDropdown } from "./AccountDropdown"
import { CaretDownFill } from "../../../assets/svgs/Icons"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { removeAccessToken } from "../../../utils/authUtils"
import { useDispatch } from "react-redux"
import { setUser } from "../../../root/Admin/slice"

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const handleSignOut = () => {
        dispatch(setUser(null));
        removeAccessToken();
        navigate("/")
    }

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
                            <li onClick={handleSignOut}>Sign Out</li>
                        </ul>
                    </AccountDropdown>
                </div>
                
            </div>
        </Container>
    )
}