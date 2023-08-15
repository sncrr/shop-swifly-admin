import { Form, FormControl, FormGroup, FormInput, FormLabel, FormTextArea } from "../../../components/forms";
import { FormRow } from "../../../components/forms/FormRow";
import { FormSelect } from "../../../components/forms/FormSelect";
import { Submit } from "../../../components/forms/Submit";
// import { hideLoader, showLoader } from "../../../components/modals/reducer";
import { Category } from "../../../types/Inventory/Category";
import { formUtils } from "../../../utils";
import * as ToastActions from '../../../components/toasts/actions';
import { saveCategory } from "../actions";

interface Props {
  categories: Category[],
  dispatch: any,
  navigate: any,
  selected: Category
}


export function CategoryForm({
  categories,
  dispatch,
  selected,
}: Props) {

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let data = formUtils.getFormData(e.target);

    if (!data.parent) {
      data.parent = null;
    }

    dispatch(saveCategory({
      id: selected._id,
      data,
      navigateToItem: true
    }));
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <FormInput
              type="text"
              name="name"
              defaultValue={selected.name}
              required
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Parent</FormLabel>
          <FormControl>
            <FormSelect
              name="parent"
              title="parent"
              labelKey="name"
              valueKey="_id"
              defaultValue={selected.parent}
              options={[
                {
                  name: "None",
                  value: ""
                },
                ...categories
              ]}
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <FormTextArea
              name="description"
              defaultValue={selected.description}
            />
          </FormControl>
        </FormGroup>
        <FormRow className="p-1 justify-end">
          <Submit>SAVE</Submit>
        </FormRow>
      </Form>
    </div>
  )
}