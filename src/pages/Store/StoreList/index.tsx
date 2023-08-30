import { GhostBtn, LinkBtn } from "../../../components/buttons";
import { TBody, TData, THead, THeader, TRow, Table } from "../../../components/tables";
import { TableActions } from "../../../components/tables/TableActions";

const stores = [
    {
        _id: 1,
        name: "Santa Rosa",
        code: "santa_rosa",
        location: "Santa Rosa, Laguna"
    },
    {
        _id: 2,
        name: "Santa Rosa",
        code: "santa_rosa",
        location: "Santa Rosa, Laguna"
    },
    {
        _id: 3,
        name: "Santa Rosa",
        code: "santa_rosa",
        location: "Santa Rosa, Laguna"
    },
    {
        _id: 4,
        name: "Santa Rosa",
        code: "santa_rosa",
        location: "Santa Rosa, Laguna"
    }
]

export function StoreList () {


    return (
        <div className="p-4">
            <TableActions />
            <Table>
                <THeader>
                    <TRow>
                        <THead></THead>
                        <THead>ID</THead>
                        <THead>Name</THead>
                        <THead>Code</THead>
                        <THead>Location</THead>
                        <THead></THead>
                    </TRow>
                </THeader>
                <TBody>
                   {
                    stores.map((item, index) => (
                        <TRow key={index}>
                            <TData>
                                <input type="checkbox" />
                            </TData>
                            <TData>{item._id}</TData>
                            <TData>{item.name}</TData>
                            <TData>{item.code}</TData>
                            <TData>{item.location}</TData>
                            <TData>
                                <div className="flex">
                                <LinkBtn>Edit</LinkBtn>
                                <LinkBtn>Delete</LinkBtn>
                                </div>
                            </TData>
                        </TRow>
                    ))
                   }
                </TBody>
            </Table>
        </div>
    )
}