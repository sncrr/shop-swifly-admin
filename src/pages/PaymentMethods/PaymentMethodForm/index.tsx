import { FormProvider, useForm } from "react-hook-form";
import {
  ButtonGroup,
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
  FormTextArea,
  FormToggle,
  Reset,
  Save,
  Submit,
} from "../../../components/forms";
import { PaymentMethod } from "../../../models/PaymentMethod";
import { useOutletContext, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaymentMethodSchema } from "./schema";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { getPaymentMethod } from "../controllers";
import { BackBtn } from "../../../components/buttons";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { savePaymentMethod } from "../slice";
import { Paths } from "../../../constants";
import { PaymentMethodContext } from "..";

export const PaymentMethodForm = () => {
  const { dispatch, navigate, paymentMethodState } = useOutletContext<PaymentMethodContext>();
  const { error } = paymentMethodState;

  const [selected, setSelected] = useState<PaymentMethod>();

  const routePrams = useParams();


  const defaultValues = {
    name: selected && selected.name ? selected.name : "",
    code: selected && selected.code ? selected.code : "",
    description: selected ? selected.description : "",
    redirectUrl: selected && selected.redirectUrl ? selected.redirectUrl : {},
    isEnabled: selected ? !!selected.isEnabled : true,
    continueEdit: false,
  };

  const formMethods = useForm({
    resolver: yupResolver(PaymentMethodSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    dispatch(showLoader({}));
    //Load Selected Data
    const selectedId = get(routePrams, "id", "");
    const loadSelectedPaymentMethod = async () => {
      try {
        let result = await getPaymentMethod(selectedId);

        if (result) {
          setSelected(result);
        }
      } catch (error) {
        navigate(Paths.PAYMENT_METHOD);
      }
    };

    if (selectedId) {
      loadSelectedPaymentMethod();
    }

    dispatch(hideLoader())
    
  }, []);

  useEffect(() => {
    reset(defaultValues);
    console.log(selected);
  }, [selected]);

  const onSubmit = async (values: any) => {
    // const data = mapFormPaymentMethod(values);

    dispatch(
      savePaymentMethod({
        id: selected?._id,
        data: values,
        navigateBack: !values.continueEdit,
      })
    );

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

        <FormSection title="Payment Method Information" isOpen>
          <FormGroup required>
            <FormLabel>Name</FormLabel>
            <FormInput name="name" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Is Enabled</FormLabel>
            <FormToggle name="isEnabled" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Code</FormLabel>
            <FormInput name="code" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextArea name="description" />
          </FormGroup>
        </FormSection>

        <FormSection title="Redirect URLs" isOpen>
          <FormGroup required>
            <FormLabel>Gateway</FormLabel>
            <FormInput name="redirectUrl.gateway" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Success</FormLabel>
            <FormInput name="redirectUrl.success" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Failed</FormLabel>
            <FormInput name="redirectUrl.failed" />
          </FormGroup>
        </FormSection>
      </Form>
    </FormProvider>
  );
};
