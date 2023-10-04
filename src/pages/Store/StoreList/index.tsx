import { GhostBtn, LinkBtn } from "../../../components/buttons";
import { TBody, TData, THead, THeader, TRow, Table } from "../../../components/tables";
import { TableActions } from "../../../components/tables/TableActions";

export function StoreList ({stores} :any) {


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
                            <TData>{item.address}</TData>
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