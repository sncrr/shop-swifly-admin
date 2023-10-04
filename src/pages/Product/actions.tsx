import * as constant from './constants';

//SETTER
export const selectProduct = (data: any) => ({
    type: constant.SELECT_PRODUCT,
    data,
})

//FETCH PRODUCT
export const fetchProducts = () => ({
    type: constant.FETCH_PRODUCTS
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