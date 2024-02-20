import { useEffect, useState } from "react";
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
import { Checkbox } from "../../../../components/inputs/Checkbox";
import { get } from "lodash";

interface Props {
  stores: Store[];
  defaultValues: any;
}

export function SourceInput(props: Props) {

  const isOpenAdvancedPricing = (store: string | undefined) => {
    if (store) {
      const salePrice = get(props.defaultValues, `prices.${store}.salePrice`);
      return salePrice != undefined;
    }
    return false;
  };

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
            <TData className="border-b-2 font-bold">Default</TData>
            <td className="pl-0 border-b-2 align-top">
              <Table>
                <tbody>
                  <TRow>
                    <FormPriceInput
                      name="prices.default.value"
                      className="px-2"
                    />
                  </TRow>
                  <SalePrice
                    storeCode="default"
                    isChecked={isOpenAdvancedPricing("default")}
                  />
                </tbody>
              </Table>
            </td>
            <td className="pl-0 border-b-2 align-top">
              <Table>
                <tbody>
                  <TRow>
                    <FormInput
                      type="number"
                      name="stocks.default.value"
                      className="px-2"
                    />
                  </TRow>
                </tbody>
              </Table>
            </td>
          </TRow>
          {props.stores.map((store, index) => (
            <TRow key={index.toString()}>
              <TData className="border-b-2 font-bold">{store.name}</TData>
              <Cell
                id={`price_${store.code}`}
                type="prices"
                storeCode={store.code ? store.code : "default"}
                isOpenSalePrice={isOpenAdvancedPricing(store.code)}
              />
              <Cell
                id={`stock_${store.code}`}
                type="stocks"
                storeCode={store.code ? store.code : "default"}
              />
            </TRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

type CellProps = {
  id: string | undefined;
  type: string;
  storeCode: string;
  isOpenSalePrice?: boolean;
};
function Cell(props: CellProps) {
  const { watch } = useFormContext();
  const checked = watch(`${props.type}.${props.storeCode}.useDefault`);

  return (
    <td className="pl-0 border-b-2 align-top">
      <Table>
        <tbody>
          <TRow>
            {props.type == "prices" ? (
              <FormPriceInput
                disabled={checked}
                name={`${props.type}.${props.storeCode}.value`}
                className="px-2 pb-0 pt-4"
              />
            ) : (
              <FormInput
                type="number"
                disabled={checked}
                min={0}
                name={`${props.type}.${props.storeCode}.value`}
                className="px-2 pb-0 pt-4"
              />
            )}
          </TRow>
          <TRow>
            <FormCheckBox
              name={`${props.type}.${props.storeCode}.useDefault`}
              type="checkbox"
              label="Use Default Value"
              className="px-2 pt-0"
              defaultValue={checked}
            />
          </TRow>

          {props.type === "prices" && (
            <SalePrice
              storeCode={props.storeCode}
              isChecked={props.isOpenSalePrice ? props.isOpenSalePrice : false}
            />
          )}
        </tbody>
      </Table>
    </td>
  );
}

type SaleProps = {
  storeCode: string;
  isChecked: boolean;
};

const SalePrice = (props: SaleProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.isChecked);
  }, [props]);

  return (
    <tr>
      <td className="px-2">
        <div
          className={`flex mt-4 mb-2 pb-2 items-center max-w-[30rem] ${
            open ? "border-b border-mainColor" : ""
          }`}
        >
          <div>
            <Checkbox
              defaultValue={props.isChecked}
              onSubmit={(value: boolean) => setOpen(value)}
            />
          </div>
          <div className="text-sm ml-2text-mainColor">Advanced Pricing</div>
        </div>
        {open && (
          <div>
            <div>
              <label className="text-sm font-semibold">
                Sale Price
                <span className="text-red-500 ml-2">*</span>
              </label>
              <FormPriceInput
                name={`prices.${props.storeCode}.salePrice`}
                className="pt-0 pb-0"
                nonTabular
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Sale From</label>
              <FormInput
                type="datetime-local"
                min={0}
                name={`prices.${props.storeCode}.saleFrom`}
                className="pt-0 pb-0"
                nonTabular
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Sale To</label>
              <FormInput
                type="datetime-local"
                min={0}
                name={`prices.${props.storeCode}.saleTo`}
                className="pt-0 pb-0"
                nonTabular
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
