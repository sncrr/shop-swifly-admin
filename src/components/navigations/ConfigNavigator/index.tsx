import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../theme";
import { CaretRightFill } from "../../../assets/svgs/Icons";

const ConfigNavigator = ({items, setGroup}:any) => {

    return (
        <Container>
            <ul>
                {
                    items.map((item: any, index: number) => (
                        <li key={index}>
                            <Link
                                to={`?group=${item.code}`}
                                onClick={() => setGroup(item)}
                            >
                                <div className="px-4 py-3 border-b flex items-center justify-between">
                                    {item.label}
                                    <CaretRightFill color={colors.inputFocus} />
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </Container>
    )
}

const Container = styled.div`
    width: 20rem;
    border: 1px solid ${colors.navBorder};

    li:hover {
        background-color: ${colors.navBorder};
    }

`

export default ConfigNavigator;