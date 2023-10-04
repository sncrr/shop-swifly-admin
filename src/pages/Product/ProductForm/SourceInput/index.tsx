import { FormControl, FormGroup, FormInput } from "../../../../components/forms"
import { TBody, TData, THead, THeader, TRow, Table } from "../../../../components/tables"
import { Store } from "../../../../types/Store/Store"

interface Props {
  stores: Store[],
}

export function SourceInput (props: Props) {

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
                <FormControl>
                  <FormInput type="number" defaultValue="0" min={0}/>
                </FormControl>
              </div>
            </TData>
            <TData>
              <div>
                <FormControl>
                  <FormInput type="number" defaultValue="0" min={0}/>
                </FormControl>
              </div>
            </TData>
          </TRow>
          {
            props.stores.map((store, index) => (
              <TRow key={index.toString()}>
                <TData>{store.name}</TData>
                <TData>
                  <div>
                    <FormControl>
                      <FormInput  min={0}/>
                    </FormControl>
                  </div>
                  <div>
                  <input id={`price_${store.code}`} checked type="checkbox" />
                    <label htmlFor={`price_${store.code}`}>Use Default Value</label>
                  </div>
                </TData>
                <TData>
                  <div>
                    <FormControl>
                      <FormInput  min={0}/>
                    </FormControl>
                  </div>
                  <div>
                    <input id={`stock_${store.code}`} checked type="checkbox" />
                    <label htmlFor={`stock_${store.code}`}>Use Default Value</label>
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