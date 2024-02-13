import { FormProvider, useForm } from "react-hook-form";
import {
  ButtonGroup,
  Form,
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
import { Promotion } from "../../../models/Promotion";
import { useOutletContext, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { PromotionSchema } from "./schema";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { getPromotion } from "../controllers";
import { BackBtn } from "../../../components/buttons";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { fetchPromotions, savePromotion } from "../slice";
import { Paths } from "../../../constants";
import { PromotionContext } from "..";
import { generateCodeFromName } from "../../../root/helper";

export const PromotionForm = () => {
  const { dispatch, promotionState, navigate } =
    useOutletContext<PromotionContext>();

  const { promotions, error, saving} = promotionState;

  const [selected, setSelected] = useState<Promotion>(new Promotion());
  const [loading, setLoading] = useState(true);

  const routePrams = useParams();

  // const getParent = (id: any) => {
  //   if (id) return promotions.find(({ _id }) => _id === id);
  //   else return NONE_ITEM;
  // };

  const defaultValues = {
    name: selected.name,
    code: selected.code,
    isEnabled: selected.isEnabled,
    description: selected.description,
    startDate: selected.startDate,
    endDate: selected.endDate,
    continueEdit: false,
  };

  const formMethods = useForm({
    resolver: yupResolver(PromotionSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = formMethods;

  useEffect(() => {
    //Load Promotion
    dispatch(fetchPromotions({}));

    //Load Selected Data
    const selectedId = get(routePrams, "id", "");
    const loadSelectedPromotion = async () => {
      try {
        let result = await getPromotion(selectedId);

        if (result) {
          setSelected(result);
        }
      } catch (error) {
        navigate(Paths.CATEGORY);
      }
    };

    if (selectedId) {
      loadSelectedPromotion();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if(!error && !saving) {
      reset(defaultValues);
    }
  }, [promotions, selected, loading]);

  useEffect(() => {
    if (loading || promotionState.fetching) {
      dispatch(showLoader({ message: "Loading" }));
    } else {
      dispatch(hideLoader());
    }

    if(!error && !saving) {
      reset(defaultValues);
    }
  }, [loading, promotionState.fetching]);


  useEffect(() => {
    if(!selected._id) {
      let code = generateCodeFromName(watch('name'));
      setValue('code', code);
    }
  }, [watch('name')])

  const onSubmit = async (values: any) => {

    dispatch(
      savePromotion({
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
        <FormSection title="Promotion Information" isOpen>
          <FormGroup required>
            <FormLabel>Name</FormLabel>
            <FormInput name="name" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Code</FormLabel>
            <FormInput name="code" readOnly={!!selected._id}/>
          </FormGroup>

          <FormGroup required>
            <FormLabel>Is Enabled</FormLabel>
            <FormToggle name="isEnabled" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextArea name="description" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Start Date</FormLabel>
            <FormInput name="startDate" type="date" />
          </FormGroup>

          <FormGroup>
            <FormLabel>End Date</FormLabel>
            <FormInput name="endDate" type="date" />
          </FormGroup>
        </FormSection>
      </Form>
    </FormProvider>
  );
};
