import { GhostBtn, LinkBtn } from "../../../components/buttons";
import { TBody, TData, THead, THeader, TRow, Table } from "../../../components/tables";
import { TableActions } from "../../../components/tables/TableActions";
import { Product } from "../../../types/Inventory/Product";

interface Props {
  products: Product[],
  navigate: any,
  selected: Product
}

export function ProductList (props:Props) {
    return (
        <div className="p-4">
            <TableActions />
            <Table>
                <THeader>
                    <TRow>
                        <THead></THead>
                        <THead>ID</THead>
                        <THead>Name</THead>
                        <THead>Prices</THead>
                        <THead>Stocks</THead>
                        <THead>Description</THead>
                        <THead></THead>
                    </TRow>
                </THeader>
                <TBody>
                   {
                    props.products.map((item, index) => (
                        <TRow key={index}>
                            <TData>
                                <input type="checkbox" />
                            </TData>
                            <TData>{item._id}</TData>
                            <TData>{item.name}</TData>
                            <TData>
                              {
                                item.prices?.map((price, i) => (
                                  <DataList
                                    key={i.toString()}
                                    label={price.source}
                                    value={price.price}
                                  />
                                ))
                              }
                            </TData>
                            <TData>
                              {
                                item.stocks?.map((stock, i) => (
                                  <DataList
                                    key={i.toString()}
                                    label={stock.source}
                                    value={stock.quantity}
                                  />
                                ))
                              }
                            </TData>
                            <TData>{item.description}</TData>
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

function DataList ({label, value}: any) {

  return (
    <>
    <span className="space-x-1">
      <span>{label}</span>
      <span>:</span>
      <span className=" font-semibold">{value}</span>
    </span>
    <br />
    </>
  )
}