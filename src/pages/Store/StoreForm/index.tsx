import { useOutletContext, useParams } from "react-router-dom";
import {
  ButtonGroup,
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
  Reset,
  Save,
  Submit,
} from "../../../components/forms";
import { FormToggle } from "../../../components/forms/FormToggle";
import { StoreContext } from "..";
import { StoreSchema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Section } from "../../../components/containers";
import { BackBtn } from "../../../components/buttons";
import { useEffect, useState } from "react";
import { Store } from "../../../models/Store";
import { get } from "lodash";
import { getStore } from "../controllers";
import { Paths } from "../../../constants";
import { hideLoader, showLoader } from "../../../components/modals/slice";

export function StoreForm() {
  const { dispatch, navigate, storeState } = useOutletContext<StoreContext>();

  const { error } = storeState;

  const [selected, setSelected] = useState<Store>();

  const routePrams = useParams();

  const defaultValues = {
    name: selected && selected.name ? selected.name : "",
    code: selected && selected.code ? selected.code : "",
    isActive: selected ? !!selected.isActive : true,
    address: selected && selected.address ? selected.address : "",

    timeOpen: selected && selected.timeOpen ? selected.timeOpen : "",
    timeClose: selected && selected.timeClose ? selected.timeClose : "",

    continueEdit: false,
  };

  const formMethods = useForm({
    resolver: yupResolver(StoreSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    const selectedId = get(routePrams, "id", "");
    if (selectedId) {
      loadSelectedStore(selectedId);
    }
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [selected]);

  const loadSelectedStore = async (id: string) => {
    dispatch(showLoader({}));
    try {
      let result = await getStore(id);

      if (result) {
        setSelected(result);
      }
    } catch (error) {
      navigate(Paths.STORE);
    }
    dispatch(hideLoader());
  };

  const onSubmit = () => {};

  return (
    <Section>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ButtonGroup>
            <BackBtn navigate={navigate} />
            <Reset onClick={() => reset(defaultValues)} />

            <Save
              text="Save but continue editing"
              onClick={() => setValue("continueEdit", true)}
            />
            <Submit text="Save" />
          </ButtonGroup>
          <FormError>{error}</FormError>

          <FormSection id="store_info" isOpen title="Store Information">
            <FormGroup required>
              <FormLabel>Name</FormLabel>
              <FormInput name="name" />
            </FormGroup>
            <FormGroup required>
              <FormLabel>Code</FormLabel>
              <FormInput name="code" />
            </FormGroup>
            <FormGroup required>
              <FormLabel>Is Active</FormLabel>
              <FormToggle name="isActive" />
            </FormGroup>
            <FormGroup required>
              <FormLabel>Address</FormLabel>
              <FormInput name="address" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Opening Time</FormLabel>
              <FormInput name="timeOpen" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Closing Time</FormLabel>
              <FormInput name="timeClose" />
            </FormGroup>
          </FormSection>
        </Form>
      </FormProvider>
    </Section>
  );
}
