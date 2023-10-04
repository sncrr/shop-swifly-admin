import * as constant from './constants';

//SETTER
export const selectStore = (data: any) => ({
    type: constant.SELECT_STORE,
    data,
})

//FETCH STORE
export const fetchStores = () => ({
    type: constant.FETCH_STORES
});
export const fetchStoresSuccess = (data: any) => ({
    type: constant.FETCH_STORES_SUCCESS,
    data,
});
export const fetchStoresFailed = (error: any) => ({
    type: constant.FETCH_STORES_FAILED,
    error,
});

//CREATE OR UPDATE STORE
export const saveStore = (payload: {
    id?: string,
    data?: any,
    navigateToItem?: boolean, // Navigate to store after saving
}) => ({
    type: constant.SAVE_STORE,
    payload,
});
export const saveStoreSuccess = (data: any) => ({
    type: constant.SAVE_STORE_SUCCESS,
    data
});
export const saveStoreFailed = (error: any) => ({
    type: constant.SAVE_STORE_FAILED,
    error,
});

//DELETE STORE
export const deleteStore = (payload: any) => ({
    type: constant.DELETE_STORE,
    payload,
});
export const deleteStoreSuccess = (data: any) => ({
    type: constant.DELETE_STORE_SUCCESS,
    data,
});
export const deleteStoreFailed = (error: any) => ({
    type: constant.DELETE_STORE_FAILED,
    error,
});