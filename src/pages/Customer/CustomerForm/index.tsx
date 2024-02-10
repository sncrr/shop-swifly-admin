import { FormProvider, useForm } from "react-hook-form";
import {
  ButtonGroup,
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
  FormSelect,
  Reset,
  Save,
  Submit,
} from "../../../components/forms";
import { useOutletContext, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerSchema } from "./schema";
import { useEffect, useState } from "react";
import { get } from "lodash";
// import { getPaymentMethod } from "../controllers";
import { BackBtn } from "../../../components/buttons";
import { hideLoader, showLoader } from "../../../components/modals/slice";
// import { savePaymentMethod } from "../slice";
import { Paths } from "../../../constants";
import { CustomerContext } from "..";
import { GENDERS } from "../constants";
import { getCustomer } from "../controllers";
import { Customer } from "../../../models/Customer";

export const CustomerForm = () => {
  const { dispatch, navigate, customerState } = useOutletContext<CustomerContext>();
  const { error } = customerState;

  const [selected, setSelected] = useState<Customer>(new Customer());

  const routePrams = useParams();

  const defaultValues = {
    firstName: selected.firstName,
    lastName: selected.lastName,
    email: selected.email,
    dateOfBirth: selected.dateOfBirth,
    group: '',
    gender: '',
    continueEdit: false,
  };

  const formMethods = useForm({
    resolver: yupResolver(CustomerSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    dispatch(showLoader({}));
    //Load Selected Data
    const selectedId = get(routePrams, "id", "");
    const loadSelectedPaymentMethod = async () => {
      try {
        let result = await getCustomer(selectedId);

        if (result) {
          setSelected(result);
        }
      } catch (error) {
        navigate(Paths.CUSTOMER);
      }
    };

    if (selectedId) {
      loadSelectedPaymentMethod();
    }

    dispatch(hideLoader())
    
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [selected]);

  const onSubmit = async (values: any) => {
    console.log(values)
    // const data = mapFormPaymentMethod(values);

    // dispatch(
    //   savePaymentMethod({
    //     id: selected?._id,
    //     data: values,
    //     navigateBack: !values.continueEdit,
    //   })
    // );

    setValue("continueEdit", false);
  };

  return (
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
        
        <FormError>
          {error}
        </FormError>

        <FormSection title="Customer Information" isOpen>
          <FormGroup required>
            <FormLabel>Customer Group</FormLabel>
            <FormSelect
              name="group"
              options={GENDERS}
            />
          </FormGroup>

          <FormGroup required>
            <FormLabel>First Name</FormLabel>
            <FormInput name="firstName" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Last Name</FormLabel>
            <FormInput name="lastName" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Email</FormLabel>
            <FormInput name="email" type="email" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Date of Birth</FormLabel>
            <FormInput name="dateOfBirth" type="date" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Gender</FormLabel>
            <FormSelect
              name="gender"
              options={GENDERS}
            />
          </FormGroup>


        </FormSection>
      </Form>
    </FormProvider>
  );
};
