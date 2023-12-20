import { FormProvider, useForm } from "react-hook-form";
import { ButtonGroup, Form, FormControl, FormGroup, FormInput, FormLabel, FormSection, FormSelect, FormTextArea, Submit } from "../../../components/forms";
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

  const getParent = (id: string) => {
    if (id)
      return categories.find(({ _id }) => _id === id);
    else
      return {
        name: "None",
        value: ""
      }
  }

  const { register, handleSubmit } = useForm({

  });

  const onSubmit = async (e: any) => {
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl flexible>
            <FormInput 
              name="name"
              required
              defaultValue={selected?.name}
            />
          </FormControl>
        </FormGroup>
        {/* <FormGroup>
            <FormLabel>Parent</FormLabel>
            <FormControl flexible>
              <FormSelect
                name="parent"
                title="parent"
                labelKey="name"
                valueKey="_id"
                defaultValue={getParent(selected?.parent)}
                options={[
                  {
                    _id: "",
                    name: "None"
                  },
                  ...categories
                ]}
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl flexible>
              <FormTextArea
                name="description"
                defaultValue={selected?.description}
              />
            </FormControl>
          </FormGroup> */}
      </FormSection>

      <ButtonGroup>
        <Submit text="Save" />
      </ButtonGroup>
    </Form>
  )
}