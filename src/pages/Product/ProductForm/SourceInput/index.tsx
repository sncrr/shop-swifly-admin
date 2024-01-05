import { useState } from "react";
import { FormCheckBox, FormInput } from "../../../../components/forms"
import { TBody, TData, THead, THeader, TRow, Table } from "../../../../components/tables"
import { Store } from "../../../../types/Store/Store"
import { FormControl2 } from "../../../../components/forms/FormControl2";

interface Props {
    stores: Store[],
}

interface CellProps {
    id: string | undefined,
    inputName: string,
    checkBoxName: string
}

function Cell(props: CellProps) {

    const [checked, setChecked] = useState<boolean>(true);

    return (
        <td className="pl-0 border-t-2">
            <Table>
                <tbody>
                    <TRow>
                        <FormInput
                            type="number"
                            disabled={checked}
                            min={0}
                            name={props.inputName}
                            className="px-2 pb-0 pt-4"
                        />
                    </TRow>
                    <TRow>
                        <FormCheckBox 
                            name={props.checkBoxName}
                            type="checkbox"
                            label="Use Default Value"
                            className="px-2 pt-0"
                        />
                    </TRow>
                </tbody>
            </Table>
        </td>
    )
}

export function SourceInput(props: Props) {

    return (
        <div className="">
            <Table>
                <THeader>
                    <TRow>
                        <THead>Store</THead>
                        <THead>Price</THead>
                        <THead>Stock</THead>
                    </TRow>
                </THeader>
                <tbody>
                    <TRow>
                        <TData>Default</TData>
                        <FormInput 
                            name="prices.default.value" 
                            type="number" 
                            className="px-2"
                        />
                        <FormInput 
                            type="number"
                            name="stocks.default.value"
                            className="px-2"
                        />
                    </TRow>
                    {
                        props.stores.map((store, index) => (
                            <TRow key={index.toString()}>
                                <TData className="border-t-2">{store.name}</TData>
                                <Cell
                                    id={`price_${store.code}`}
                                    inputName={`prices.${store.code}.value`}
                                    checkBoxName={`prices.${store.code}.useDefault.`}
                                />
                                <Cell
                                    id={`stock_${store.code}`}
                                    inputName={`stocks.${store.code}.value`}
                                    checkBoxName={`stocks.${store.code}.useDefault`}
                                />
                            </TRow>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}