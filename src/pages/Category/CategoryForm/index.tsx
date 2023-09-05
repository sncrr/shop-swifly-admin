import { ButtonGroup, Form, FormControl, FormGroup, FormInput, FormLabel, FormSelect, FormTextArea, Submit } from "../../../components/forms";
import { Category } from "../../../types/Inventory/Category";
import { formUtils } from "../../../utils";
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
      id: selected?._id,
      data,
      navigateToItem: true
    }));
  }

  const getParent = (id: string) => {
    console.log("ID", id);
    if(id)
      return categories.find(({_id}) => _id === id);
    else 
      return {
        name: "None",
        value: ""
      }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl $flex1>
            <FormInput
              type="text"
              name="name"
              defaultValue={selected?.name}
              required
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Parent</FormLabel>
          <FormControl $flex1>
            <FormSelect
              name="parent"
              title="parent"
              labelKey="name"
              valueKey="_id"
              defaultValue={getParent(selected?.parent)}
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
          <FormControl $flex1>
            <FormTextArea
              name="description"
              defaultValue={selected?.description}
            />
          </FormControl>
        </FormGroup>
        <ButtonGroup>
          <Submit>Save</Submit>
        </ButtonGroup>
      </Form>
    </div>
  )
}