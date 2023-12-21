import { NavigateFunction } from 'react-router-dom';
import * as constant from './constants';

//SETTER
export const selectCategory = (data: any) => ({
    type: constant.SELECT_CATEGORY,
    data,
})

//FETCH CATEGORY
export const fetchCategories = () => ({
    type: constant.FETCH_CATEGORIES
});
export const fetchCategoriesSuccess = (data: any) => ({
    type: constant.FETCH_CATEGORIES_SUCCESS,
    data,
});
export const fetchCategoriesFailed = (error: any) => ({
    type: constant.FETCH_CATEGORIES_FAILED,
    error,
});

//CREATE OR UPDATE CATEGORY
export const saveCategory = (payload: {
    id?: string,
    data?: any,
    hasLoader?: boolean,
    navigateToItem?: boolean, // Navigate to category after saving
    navigateBack?: boolean
}) => ({
    type: constant.SAVE_CATEGORY,
    payload,
});
export const saveCategorySuccess = (data: any) => ({
    type: constant.SAVE_CATEGORY_SUCCESS,
    data
});
export const saveCategoryFailed = (error: any) => ({
    type: constant.SAVE_CATEGORY_FAILED,
    error,
});

//DELETE CATEGORY
export const deleteCategory = (payload: any) => ({
    type: constant.DELETE_CATEGORY,
    payload,
});
export const deleteCategorySuccess = (data: any) => ({
    type: constant.DELETE_CATEGORY_SUCCESS,
    data,
});
export const deleteCategoryFailed = (error: any) => ({
    type: constant.DELETE_CATEGORY_FAILED,
    error,
});