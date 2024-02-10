import { FormCheckBox, FormInput } from "../../../../components/forms";
import { FormPriceInput } from "../../../../components/forms/FormPriceInput";
import {
  TData,
  THead,
  THeader,
  TRow,
  Table,
} from "../../../../components/tables";
import { Store } from "../../../../models/Store";
import { useFormContext } from "react-hook-form";

interface Props {
  stores: Store[];
}

interface CellProps {
  id: string | undefined;
  inputName: string;
  checkBoxName: string;
}

function Cell(props: CellProps) {
  const { watch } = useFormContext();
  const checked = watch(props.checkBoxName);

  return (
    <td className="pl-0 border-b-2">
      <Table>
        <tbody>
          <TRow>
            <FormPriceInput
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
              defaultValue={checked}
            />
          </TRow>
        </tbody>
      </Table>
    </td>
  );
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
            <TData className="border-b-2">Default</TData>
            <FormInput
              name="prices.default.value"
              type="number"
              className="px-2 border-b-2"
            />
            <FormInput
              type="number"
              name="stocks.default.value"
              className="px-2 border-b-2"
            />
          </TRow>
          {props.stores.map((store, index) => (
            <TRow key={index.toString()}>
              <TData className="border-b-2">{store.name}</TData>
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
          ))}
        </tbody>
      </Table>
    </div>
  );
}
