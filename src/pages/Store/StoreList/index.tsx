import { LinkBtn } from "../../../components/buttons";
import { TBody, TData, THead, THeader, TRow, Table, TableControls } from "../../../components/tables";
import { Store } from "../../../models/Store";

export function StoreList ({stores} :any) {


    return (
        <div className="p-4">
            <TableControls />
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
                    stores.map((item:Store, index:number) => (
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