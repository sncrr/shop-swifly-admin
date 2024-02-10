import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models/Category";

export interface CategoryState {
  fetching: boolean;
  categories: Array<Category>;
  search: string;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  categories: new Array<Category>(),
  search: "",
  hasChanges: true,
  data: null,
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    //Fetch
    fetchCategories: (state, action) => ({
      ...state,
      search: action.payload.search,
      fetching: !!action,
    }),
    fetchCategoriesSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      categories: action.payload,
    }),
    fetchCategoriesFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Save
    saveCategory: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    saveCategorySuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    saveCategoryFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Delete
    deleteCategory: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteCategorySuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteCategoryFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,

  saveCategory,
  saveCategorySuccess,
  saveCategoryFailed,

  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailed,
} = categorySlice.actions;

export const actionTypes = {
  fetchCategories: "category/fetchCategories",
  saveCategory: "category/saveCategory",
  deleteCategory: "category/deleteCategory",
};

export const CategoryActions = categorySlice.actions;
export default categorySlice;
