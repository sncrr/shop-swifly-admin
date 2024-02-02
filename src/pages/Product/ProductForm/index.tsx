//UTILS
import { useEffect, useState } from "react";
import {
  createProduct,
  generateNewSku,
  getProduct,
  updateProduct,
} from "../controllers";
import { BackBtn } from "../../../components/buttons";
import { useOutletContext, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductSchema, mapFormDefaultValues } from "./schema";
import { WEIGHT_UNITS } from "../../../constants/global";
import { fetchCategories, saveCategorySuccess } from "../../Category/slice";
import { Product } from "../../../models/Product";
import { get } from "lodash";
import { Paths } from "../../../constants";
import { saveProductFailed } from "../slice";
import { mapToFormData } from "../helper";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { failedToast, showToast } from "../../../components/toasts/slice";
import { fetchStores } from "../../Store/slice";

//COMPONENTS
import {
  ButtonGroup,
  Form,
  FormCheckBox,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
  FormSelect,
  FormTextArea,
  FormToggle,
  ImageUpload,
  MultiImageUpload,
  Reset,
  Save,
  Submit,
} from "../../../components/forms";
import { SourceInput } from "./SourceInput";
import { ProductContext } from "..";
import { Section } from "../../../components/containers";

export function ProductForm() {
  const { dispatch, navigate, storeState, categoryState } =
    useOutletContext<ProductContext>();

  const [errors, setErrors] = useState("");
  const { categories } = categoryState;
  const { stores } = storeState;

  const [defaultSku, setDefaultSku] = useState("");
  const [selected, setSelected] = useState<Product>();
  const [loading, setLoading] = useState(true);

  const routePrams = useParams();

  const defaultValues = mapFormDefaultValues(
    selected,
    stores,
    categories,
    defaultSku
  );

  const formMethods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = formMethods;

  useEffect(() => {
    //Load Stores and Categories
    dispatch(fetchStores({}));
    dispatch(fetchCategories({}));

    //Load Selected Data
    const selectedId = get(routePrams, "id", "");

    if (selectedId) {
      loadSelectedProduct(selectedId);
    } else {
      generateSku();
    }
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [stores, categories, selected, loading]);

  useEffect(() => {
    if (loading || categoryState.fetching || storeState.fetching) {
      dispatch(showLoader({ message: "Loading" }));
    } else {
      dispatch(hideLoader());
    }

    reset(defaultValues);
  }, [loading, categoryState.fetching, storeState.fetching]);

  const loadSelectedProduct = async (id: string) => {
    setLoading(true);

    try {
      let result = await getProduct(id);

      if (result) {
        setSelected(result);
      }
    } catch (error) {
      navigate(Paths.PRODUCT);
    }

    setLoading(false);
  };

  const generateSku = async () => {
    let defaultSku = "";
    try {
      defaultSku = await generateNewSku();
    } catch (error) {}

    setValue("sku", defaultSku);
    setDefaultSku(defaultSku);
    setLoading(false);
  };

  const onSubmit = async (values: any, event: any): Promise<any> => {
    setErrors("");

    let formData = mapToFormData(values, event);

    dispatch(showLoader("Saving Product..."));

    try {
      let result = null;
      if (selected && selected._id) {
        formData.append("id", selected._id);
        result = await updateProduct(selected._id, formData);
      } else {
        result = await createProduct(formData);
      }

      dispatch(saveCategorySuccess(result));
      dispatch(hideLoader());

      if (!values.continueEdit) {
        navigate(Paths.PRODUCT);
      } else {
        setSelected(result);
      }
    } catch (error: any) {
      dispatch(hideLoader());

      const message = get(error, "response.data.message", "");
      setErrors(message);
      dispatch(saveProductFailed(message));
      dispatch(showToast(failedToast("Product saving failed")));
    }
  };

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
          <FormError>{errors}</FormError>
          <FormSection
            id="product_info"
            title="Product Information"
            isOpen
            hasRequired
          >
            <FormGroup required>
              <FormLabel>Name</FormLabel>
              <FormInput name="name" />
            </FormGroup>
            <FormGroup required>
              <FormLabel>SKU</FormLabel>
              <FormInput name="sku" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Is Active</FormLabel>
              <FormToggle name="isActive" />
            </FormGroup>

            <FormGroup>
              <FormLabel>Categories</FormLabel>
              <FormSelect
                name="categories"
                labelKey="name"
                valueKey="_id"
                multiple
                options={categories}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea name="description" />
            </FormGroup>

            <FormGroup>
              <FormLabel>Weight</FormLabel>
              <FormInput
                name="weightValue"
                placeholder="Value"
                disabled={!get(watch("weightUnit"), "value", "")}
              />
              <FormSelect
                name="weightUnit"
                placeholder="None"
                options={WEIGHT_UNITS}
              />
            </FormGroup>
          </FormSection>

          <FormSection
            id="price_stocks"
            title="Price & Stocks"
            hasRequired
            isOpen
          >
            <tr>
              <td className="w-full pb-8" colSpan={2}>
                <SourceInput stores={stores} />
              </td>
            </tr>
            <FormGroup>
              <FormLabel>Minimum Cart Qty</FormLabel>
              <FormInput
                disabled={watch("minCartQty").useGlobal}
                name="minCartQty.value"
                type="number"
                description="Set the minimum quantity allowed in shopping cart"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel />
              <FormCheckBox
                label="Use Global Config"
                name="minCartQty.useGlobal"
                className="py-0"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Maximum Cart Qty</FormLabel>
              <FormInput
                disabled={watch("maxCartQty").useGlobal}
                name="maxCartQty.value"
                type="number"
                description="Set the maximum quantity allowed in shopping cart"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel />
              <FormCheckBox
                label="Use Global Config"
                name="maxCartQty.useGlobal"
                className="py-0"
              />
            </FormGroup>
          </FormSection>

          <FormSection
            id="media_gallery"
            title="Media Gallery"
            hasRequired
            isOpen
          >
            <FormGroup required>
              <FormLabel>Thumbnail</FormLabel>
              <ImageUpload name="thumbnail" />
            </FormGroup>

            <FormGroup>
              <FormLabel>Images</FormLabel>
              <MultiImageUpload name="views" />
            </FormGroup>
          </FormSection>
        </Form>
      </FormProvider>
    </Section>
  );
}
