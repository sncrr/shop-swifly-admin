import { ReactNode, useState } from "react";

interface Props {
    children: ReactNode
}

export const Pagination = (props: Props) => {

    const { children } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    return children;
}