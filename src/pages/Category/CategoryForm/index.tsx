import { useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, FormInput, FormLabel, FormTextArea } from "../../../components/forms";
import { FormRow } from "../../../components/forms/FormRow";
import { FormSelect } from "../../../components/forms/FormSelect";
import { Submit } from "../../../components/forms/Submit";
import { CategoryController } from "../../../controllers";
import { hideLoader, showLoader } from "../../../reducer/slices/modalSlice";
import { Category } from "../../../types/Category";
import { formUtils } from "../../../utils";
import { handleCreateCategory, handleUpdateCategory } from '../actions';
import { H1 } from '../../../components/typographies';
import * as ToastActions from '../../../components/toasts/actions';

interface Props {
  categories: Category[],
  dispatch: any,
  navigate: any,
}


export function CategoryForm({ categories, dispatch, navigate }: Props) {

  const queryString = location.search;
  const selectedId = queryString.slice(1);

  const [selected, setSelected] = useState<Category>(new Category());

  useEffect(() => {
    if (selectedId) {
      loadSelectedCategory();
    }
    else {
      setSelected(new Category());
    }
  }, [selectedId])

  const loadSelectedCategory = async () => {
    let result = await CategoryController.getCategory(selectedId);
    if (result) {
      setSelected(result);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let data = formUtils.getFormData(e.target);

    dispatch(showLoader())

    // let result;
    // //UPDATE
    // if (selectedId && selected) {
    //   result = await handleUpdateCategory(dispatch, selectedId, data);
    //   if(result) {
    //     ToastActions.showSuccessMessage(dispatch, "Category updated successfully");
    //   }
    // }
    // //CREATE
    // else {
    //   result = await handleCreateCategory(dispatch, data);
    //   if(result && result._id) {
    //     ToastActions.showSuccessMessage(dispatch, "Category added successfully");
    //     navigate(`?${result._id}`)
    //   }
    // }

    

    // dispatch(hideLoader())
  }

  return (
    <div>
      <H1>
        {
          selectedId && selectedId  ? selected.name : "CREATE NEW"
        }
      </H1>
      <Form onSubmit={handleSubmit}>
        <FormRow>
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
                defaultValue={selected.parent?._id}
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
        </FormRow>
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