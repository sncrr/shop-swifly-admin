import { LocalData } from '../../types/Utils/Paginate';
import * as constant from './constants';


export const getProductLocalData = () : LocalData => {
    let data = localStorage.getItem(constant.PRODUCT_LOCAL_KEY);
    
    if(data) {
        return JSON.parse(data);
    }
    else {
        return constant.DEFAULT_LOCAL_DATA
    }
}

export const setProductLocalData = (data: any) => {

    let current = getProductLocalData();
    let value = { ...current, ...data };

    localStorage.setItem(
        constant.PRODUCT_LOCAL_KEY, 
        JSON.stringify(value)
    );
}


//SELECTOR
export const selectProduct = (data: any) => ({
    type: constant.SELECT_PRODUCT,
    data,
})

//FETCH PRODUCT
export const fetchProducts = (data: {
    page: number,
    itemsCount: number
}) => ({
    type: constant.FETCH_PRODUCTS,
    data
});
export const fetchProductsSuccess = (data: any) => ({
    type: constant.FETCH_PRODUCTS_SUCCESS,
    data,
});
export const fetchProductsFailed = (error: any) => ({
    type: constant.FETCH_PRODUCTS_FAILED,
    error,
});

//CREATE OR UPDATE PRODUCT
export const saveProduct = (payload: {
    id?: string,
    data?: any,
    navigateToItem?: boolean, // Navigate to product after saving
}) => ({
    type: constant.SAVE_PRODUCT,
    payload,
});
export const saveProductSuccess = (data: any) => ({
    type: constant.SAVE_PRODUCT_SUCCESS,
    data
});
export const saveProductFailed = (error: any) => ({
    type: constant.SAVE_PRODUCT_FAILED,
    error,
});

//DELETE PRODUCT
export const deleteProduct = (payload: any) => ({
    type: constant.DELETE_PRODUCT,
    payload,
});
export const deleteProductSuccess = (data: any) => ({
    type: constant.DELETE_PRODUCT_SUCCESS,
    data,
});
export const deleteProductFailed = (error: any) => ({
    type: constant.DELETE_PRODUCT_FAILED,
    error,
});