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
        <TData>
            <div>
                <FormControl2>
                    <FormInput
                        type="number"
                        disabled={checked}
                        min={0}
                        defaultValue="0"
                        name={props.inputName}
                    />
                </FormControl2>
            </div>
            <div className="flex">
                <FormCheckBox 
                    id={props.id}
                    name={props.checkBoxName}
                    onChange={(e:any) => {
                        setChecked(e.target.checked);
                    }}
                    defaultValue={1}
                />
                <label className="pl-1" htmlFor={props.id}>Use Default Value</label>
            </div>
        </TData>
    )
}

export function SourceInput(props: Props) {

    return (
        <div className="mx-2 px-4">
            <Table>
                <THeader>
                    <TRow>
                        <THead>Store</THead>
                        <THead>Price</THead>
                        <THead>Stock</THead>
                    </TRow>
                </THeader>
                <TBody>
                    <TRow>
                        <TData>Default</TData>
                        <TData>
                            <div>
                                <FormControl2>
                                    <FormInput type="number" name="prices[default][value]" defaultValue="0" min={0} />
                                </FormControl2>
                            </div>
                        </TData>
                        <TData>
                            <div>
                                <FormControl2>
                                    <FormInput type="number" name="stocks[default][value]" defaultValue="0" min={0} />
                                </FormControl2>
                            </div>
                        </TData>
                    </TRow>
                    {
                        props.stores.map((store, index) => (
                            <TRow key={index.toString()}>
                                <TData>{store.name}</TData>
                                <Cell
                                    id={`price_${store.code}`}
                                    inputName={`prices[${store.code}][value]`}
                                    checkBoxName={`prices[${store.code}][useDefault]`}
                                />
                                <Cell
                                    id={`stock_${store.code}`}
                                    inputName={`stocks[${store.code}][value]`}
                                    checkBoxName={`stocks[${store.code}][useDefault]`}
                                />
                            </TRow>
                        ))
                    }
                </TBody>
            </Table>
        </div>
    )
}