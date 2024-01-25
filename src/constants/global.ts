import { DEFAULT_ITEMS_COUNT } from "../root/constants"

export const PRODUCT_LOCAL_KEY = 'product_data'

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

export const GLOBAL_OVERRIDER_DEFAULT = {
    value: '',
    useGlobal: true,
}