

/**
 * REDUCERS
 */

import { DEFAULT_ITEMS_COUNT } from "../../root/global-constant"

//FETCH LOCAL
export const PRODUCT_LOCAL_KEY = 'product_data'

//FETCH PRODUCT
export const FETCH_PRODUCTS = 'PRODUCT/FETCH_PRODUCTS'
export const FETCH_PRODUCTS_SUCCESS = 'PRODUCT/FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILED = 'PRODUCT/FETCH_PRODUCTS_FAILED'

//CREATE OR UPDATE PRODUCT
export const SAVE_PRODUCT = 'PRODUCT/SAVE_PRODUCT'
export const SAVE_PRODUCT_SUCCESS = 'PRODUCT/SAVE_PRODUCT_SUCCESS'
export const SAVE_PRODUCT_FAILED = 'PRODUCT/SAVE_PRODUCT_FAILED'

//DELETE PRODUCT
export const DELETE_PRODUCT = 'PRODUCT/DELETE_PRODUCT'
export const DELETE_PRODUCT_SUCCESS = 'PRODUCT/DELETE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_FAILED = 'PRODUCT/DELETE_PRODUCT_FAILED'

//SELECT PRODUCT
export const SELECT_PRODUCT = 'PRODUCT/SELECT_PRODUCT'

export const WEIGHT_UNITS = [
    { value: "", label: "None"},
    // Metric Units
    { value: "kg", label: "Kilogram" },
    { value: "g", label: "Gram" },
    { value: "mg", label: "Milligram" },
    { value: "t", label: "Tonne" },
  
    // Imperial Units
    { value: "lb", label: "Pound" },
    { value: "oz", label: "Ounce" },
    { value: "st", label: "Stone" },
    { value: "cwt", label: "Hundredweight" },
  
    // Other Common Units
    { value: "ct", label: "Carat" },
    { value: "gr", label: "Grain" },
    { value: "dag", label: "Decagram" },
    { value: "dg", label: "Decigram" },
];

export const DEFAULT_LOCAL_DATA = {
    currentPage: 1,
    itemsCount: DEFAULT_ITEMS_COUNT,
    search: '',
}