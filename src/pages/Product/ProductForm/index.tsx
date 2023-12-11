import { useEffect, useState } from "react";
import {
    ButtonGroup,
    Form,
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

    const loadSelectedCategory = async () => {
        let result = await getProduct(selectedId);
        if (result) {
            props.dispatch(selectProduct(result));
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        let data = new FormData(e.target);
        
        let categoryIds = [];
        for(let category of selectedCategories) {
            categoryIds.push(category._id);
            if(category._id) {
                data.append("categories[]", category._id);
            }
        }

        data.append("thumbnail", thumbnail[0]);
        if (images.length > 0) {
            for (let i = 0, file; file = images[i]; i++) {
                data.append(`view_${i+1}`, file);
            }
        }

        props.dispatch(saveProduct({
            id: props.selected?._id,
            data,
            navigateToItem: true
        }));
    }

    const getDefaultCategories = () => {

        let defaultCategories = [];
        if(selected) {
            for(let category of props.categories) {
                if(category._id && selected.categories?.includes(category._id)) {
                    defaultCategories.push(category);
                }
            }
        }

        console.log("DEFAULT", defaultCategories);

        return defaultCategories;
    }

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <ButtonGroup>
                    {/* <Reset value="Reset"/> */}
                    <BackBtn navigate={props.navigate} />
                    <Submit value="Save" />
                </ButtonGroup>
                <FormSection hasRequired>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <FormInput
                                type="text"
                                name="name"
                                required
                                defaultValue={selected?.name}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                            <FormInput
                                type="text"
                                name="sku"
                                required
                                defaultValue={selected?.sku}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Is Active</FormLabel>
                        <FormControl unbordered>
                            <FormToggle
                                name="isActive"
                                defaultValue={selected ? Number(selected.isActive) : 1}
                            />
                        </FormControl>
                    </FormGroup>
                    {/* <FormGroup>
                        <FormLabel>Has Weight</FormLabel>
                        <FormControl unbordered>
                            <FormToggle
                                name="hasWeight"
                            />
                        </FormControl>
                    </FormGroup> */}
                    <FormGroup>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                            <FormSelect
                                title="Categories"
                                labelKey="name"
                                valueKey="_id"
                                multiple
                                options={[
                                    ...props.categories
                                ]}
                                required
                                onChanged={setSelectedCategories}
                                defaultValue={selected ? getDefaultCategories() : null}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <FormTextArea
                                name="description"
                                required
                                defaultValue={selected?.description}
                            />
                        </FormControl>
                    </FormGroup>
                </FormSection>


                <FormSection id="price_stocks" title="Price & Stocks" isOpen nontabular>
                    <SourceInput
                        stores={props.storeState.stores}
                    />
                </FormSection>

                <FormSection id="media_gallery" title="Media Gallery" hasRequired>
                    <FormGroup>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl unbordered>
                            <ImageUpload 
                                id="thumbnail"
                                onChange={setThumbnail}
                                required
                            />
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Images</FormLabel>
                        <FormControl flexible unbordered>
                            <MultiImageUpload 
                                id="images"
                                onChange={setImages}
                                required 
                            />
                        </FormControl>
                    </FormGroup>
                </FormSection>


            </Form>
        </section>
    )
}