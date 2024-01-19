import { useEffect, useState } from "react";
import {
    ButtonGroup,
    Form,
    FormCheckBox,
    FormControl,
    FormGroup,
    FormInput,
    FormLabel,
    FormSection,
    FormSelect,
    FormTextArea,
    FormToggle,
    ImageUpload,
    MultiImageUpload,
    Submit,
} from "../../../components/forms";
import { SourceInput } from "./SourceInput";
import { fetchStores } from "../../Store/actions";
import { getProduct } from "../controllers";
import { fetchCategories } from "../../Category/actions";
import { Category } from "../../../types/Inventory/Category";
import { BackBtn } from "../../../components/buttons";
import { selectProduct } from "../actions";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductSchema, productDefaultValues } from "./schema";
import { WEIGHT_UNITS } from "../constants";
import { Checkbox } from "../../../components/inputs/Checkbox";

interface Props {
    navigate: any,
    dispatch: any,
    storeState: any,
    categories: Category[]
}

export function ProductForm(props: Props) {

    const params = useParams();

    // const { selected } = props;
    const selectedId = params.id ? params.id : "";

    const [thumbnail, setThumbnail] = useState<any>();
    const [images, setImages] = useState<any>();
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    useEffect(() => {
        props.dispatch(fetchStores())
        props.dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if (selectedId) {
            loadSelectedCategory();
        }
    }, [selectedId])

    const formMethods = useForm({
        resolver: yupResolver(ProductSchema)
    })

    const {
        handleSubmit,
        reset
    } = formMethods;

    useEffect(() => {
        reset(productDefaultValues);
    }, [])

    const loadSelectedCategory = async () => {
        let result = await getProduct(selectedId);
        if (result) {
            props.dispatch(selectProduct(result));
        }
    }

    const onSubmit = async (values: any) => {

        console.log("VALUES", values);

        // e.preventDefault();

        // let data = new FormData(e.target);

        // let categoryIds = [];
        // for (let category of selectedCategories) {
        //     categoryIds.push(category._id);
        //     if (category._id) {
        //         data.append("categories[]", category._id);
        //     }
        // }

        // data.append("thumbnail", thumbnail[0]);
        // if (images.length > 0) {
        //     for (let i = 0, file; file = images[i]; i++) {
        //         data.append(`view_${i + 1}`, file);
        //     }
        // }

        // props.dispatch(saveProduct({
        //     id: props.selected?._id,
        //     data,
        //     navigateToItem: true
        // }));
    }

    return (
        <section>
            <FormProvider {...formMethods}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ButtonGroup>
                        {/* <Reset value="Reset"/> */}
                        <BackBtn navigate={props.navigate} />
                        <Submit text="Save" />
                    </ButtonGroup>
                    <FormSection id="product_info" title="Product Information" isOpen hasRequired>
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
                                options={[
                                    ...props.categories
                                ]}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormTextArea name="description"/>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Weight</FormLabel>
                            <FormInput name="weightValue" placeholder="Value" />
                            <FormSelect 
                                name="weightUnit" 
                                options={WEIGHT_UNITS}
                            />
                        </FormGroup>
                    </FormSection>


                    <FormSection  id="price_stocks" title="Price & Stocks" hasRequired isOpen>
                        <tr>
                            <td className="w-full pb-8" colSpan={2}>
                                <SourceInput
                                    stores={props.storeState.stores}
                                />
                            </td>
                        </tr>
                        <FormGroup>
                            <FormLabel>Minimum Cart Qty</FormLabel>
                            <FormInput 
                                name="minCartQty" 
                                type="number"
                                description="Set the minimum quantity allowed in shopping cart"
                                addionalNode={(
                                    <Checkbox
                                        label="Use System Config"
                                        name="minCartQty_useDefault"
                                    />
                                )}
                            />
                        </FormGroup>
  
                        <FormGroup>
                            <FormLabel>Maximum Cart Qty</FormLabel>
                            <FormInput 
                                name="maxCartQty" 
                                type="number"
                                description="Set the maximum quantity allowed in shopping cart"
                                addionalNode={(
                                    <Checkbox
                                        label="Use System Config"
                                        name="maxCartQty_useDefault"
                                    />
                                )}
                            />
                        </FormGroup>
                    </FormSection>

                    <FormSection id="media_gallery" title="Media Gallery" hasRequired isOpen>
                        <FormGroup>
                        <FormLabel>Thumbnail</FormLabel>
                        <ImageUpload 
                            name="images.thumbnail"
                            onChange={setThumbnail}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Images</FormLabel>
                        <MultiImageUpload 
                            name="images.images"
                            onChange={setImages}
                        />
                    </FormGroup>
                    </FormSection>


                </Form>
            </FormProvider>
        </section>
    )
}