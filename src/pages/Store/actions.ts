import * as constant from './constants';

//CREATE OR UPDATE STORE
export const saveStore = (payload: {
  id?: string,
  data?: any,
  navigateToItem?: boolean, // Navigate to category after saving
}) => ({
  type: constant.SAVE_STORE,
  payload,
});
export const saveStoreSuccess = (data: any) => ({
  type: constant.SAVE_STORE_SUCCESS,
  data,
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
export const deleteCategorySuccess = (data: any) => ({
  type: constant.DELETE_STORE_SUCCESS,
  data,
});
export const deleteCategoryFailed = (error: any) => ({
  type: constant.DELETE_STORE_FAILED,
  error,
});