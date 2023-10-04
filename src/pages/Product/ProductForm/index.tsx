import { useEffect } from "react";
import { 
  ButtonGroup,
  Form, 
  FormControl, 
  FormGroup, 
  FormInput, 
  FormLabel,
  FormTextArea,
  Submit,
} from "../../../components/forms";
import { FormToggle } from "../../../components/forms/FormToggle";
import { formUtils } from "../../../utils";
import { SourceInput } from "./SourceInput";
import { fetchStores } from "../../Store/actions";

interface Props {
  navigate: any,
  dispatch: any,
  storeState: any,
}

export function ProductForm (props: Props) {

  useEffect(() => {
    props.dispatch(fetchStores())
  }, [])

  const handleSubmit = (e:any) => {
      e.preventDefault();

      let data = formUtils.getFormData(e.target);
  }

  return (
      <section>
          <Form onSubmit={handleSubmit}>
              <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <FormControl $flex1>
                      <FormInput
                          type="text"
                          name="name"
                          required
                      />
                  </FormControl>
              </FormGroup>
              <FormGroup>
                  <FormLabel>SKU</FormLabel>
                  <FormControl $flex1>
                      <FormInput
                          type="text"
                          name="sku"
                          required
                      />
                  </FormControl>
              </FormGroup>
              <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormControl $flex1>
                      <FormTextArea
                          name="description"
                          required
                      />
                  </FormControl>
              </FormGroup>
              <SourceInput
                stores={props.storeState.stores}
              />

              <ButtonGroup>
                  <Submit>
                      Save
                  </Submit>
              </ButtonGroup>
          </Form>
      </section>
  )
}