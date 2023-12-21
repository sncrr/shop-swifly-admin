import { FormProvider, useForm } from "react-hook-form";
import { ButtonGroup, Form, FormControl, FormGroup, FormInput, FormLabel, FormSection, FormSelect, FormTextArea, Reset, Submit } from "../../../components/forms";
import { Category } from "../../../types/Inventory/Category";
import { saveCategory, selectCategory } from "../actions";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorySchema, mapCreateCategory } from "./schema";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { getCategory } from "../controllers";
import { hideLoader, showLoader } from "../../../components/modals/actions";
import { BackBtn } from "../../../components/buttons";
import { Save } from "../../../components/forms/Save";

interface Props {
  categories: Category[],
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  selected: Category | null
}

const NONE_ITEM = {
  _id: "",
  name: "None"
}

export const CategoryForm = (props: Props) => {

  const {
    dispatch,
    categories,
    selected,
    navigate
  } = props;

  const routePrams = useParams();

  const formMethods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues: {
      name: get(selected, 'name', ''),
      parent: get(selected, 'parent', {}),
      description: get(selected, 'description', ''),
      continueEdit: false,
    }
  })

  const {
    handleSubmit,
    reset,
    setValue
  } = formMethods;

  const [loading, setLoading] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {

		const selectedId = get(routePrams, 'id', '');

		const loadSelectedCategory = async () => {
      dispatch(showLoader());
			try {
				let result = await getCategory(selectedId, {
          populate: 'parent'
        });

				if (result) {
					dispatch(selectCategory(result));
				}
			} catch (error) {
        dispatch(selectCategory(null));
				navigate("/admin/categories");
			}
      dispatch(hideLoader());
      setLoading(false);
		}

		if (selectedId) {
			if(selected && selectedId == selected._id) {
        setLoading(false);
        return;
      }

      loadSelectedCategory();
		}
    else {
      dispatch(selectCategory(null));
      setLoading(false);
    }
	}, []);

  const getParent = (id: string) => {
    if(id)
      return categories.find(({_id}) => _id === id);
    else
      return NONE_ITEM
  }

  useEffect(() => {
    if(selected) {
      let newList = categories.filter(({_id}) => selected._id != _id);
      setFilteredCategories(newList);
    }
    else {
      setFilteredCategories(categories)
    }
  }, [categories])

  useEffect(() => {

    if(selected && !loading) {
      let newList = categories.filter(({_id}) => selected._id != _id);
      setFilteredCategories(newList);
      resetForm();
    }
    else {
      resetForm();
    }
  }, [loading, selected]);

  const onSubmit = async (values: any) => {
    const data = mapCreateCategory(values);
    
    dispatch(saveCategory({
      id: selected?._id,
      data,
      hasLoader: true,
      navigateBack: !values.continueEdit  
    }));

    setValue("continueEdit", false);
  }

  const resetForm = () => {
    if(selected) {
      reset({
        name: selected?.name,
        parent: getParent(selected?.parent?._id),
        description: selected?.description
      });
    }
    else {
      reset({
        name: '',
        parent: NONE_ITEM,
        description: ''
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ButtonGroup>
          <BackBtn navigate={navigate} />
          <Reset onClick={resetForm} />

          <Save 
            text="Save but continue editing" 
            onClick={() => setValue("continueEdit", true)} 
          />
          <Submit text="Save" />
        </ButtonGroup>
        <FormSection
          title="Category Information"
          isOpen
        >
          <FormGroup required>
            <FormLabel>Name</FormLabel>
            <FormInput name="name" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormSelect 
              name="parent" 
              labelKey="name"
              valueKey="_id"
              options={[
                NONE_ITEM,
                ...filteredCategories
              ]}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormInput name="description" />
          </FormGroup>

          {/* <FormGroup $required>
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
          </FormGroup> */}

          {/* <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl flexible>
              <FormTextArea
                name="description"
                defaultValue={selected?.description}
              />
            </FormControl>
          </FormGroup> */}

        </FormSection>
      </Form>
    </FormProvider>
  )
}