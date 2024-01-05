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
import { saveProduct, selectProduct } from "../actions";
import { Product } from "../../../types/Inventory/Product";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductSchema, productDefaultValues } from "./schema";
import { WEIGHT_UNITS } from "../constants";

interface Props {
    navigate: any,
    dispatch: any,
    storeState: any,
    categories: Category[],
    selected: Product | null,
}

export function ProductForm(props: Props) {

    const params = useParams();

    const { selected } = props;
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

    const getDefaultCategories = () => {

        let defaultCategories = [];
        if (selected) {
            for (let category of props.categories) {
                if (category._id && selected.categories?.includes(category._id)) {
                    defaultCategories.push(category);
                }
            }
        }

        return defaultCategories;
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


                    <FormSection  id="price_stocks" title="Price & Stocks" hasRequired isOpen nontabular>
                        <SourceInput
                            stores={props.storeState.stores}
                        />
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