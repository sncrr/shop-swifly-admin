import { createSlice } from "@reduxjs/toolkit";
import { City } from "../../../models/Address";
import { get } from "lodash";

export interface CityState {
  fetching: boolean;
  cities: Array<City>;
  totalPages: number;
  totalItems: number;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  cities: new Array<City>(),
  totalPages: 1,
  totalItems: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    //Fetch
    fetchCities: (state, action) => ({
      ...state,
      fetching: !!action,
      
      error: '',
    }),
    fetchCitiesSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      cities: action.payload.data ? action.payload.data : action.payload,
      error: '',
      totalPages: get(action, 'payload.totalPages', 1),
      totalItems: get(action, 'payload.totalRows', 1),
    }),
    fetchCitiesFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Save
    saveCity: (state, action) => ({
      ...state,
      fetching: !!action.type,
      error: '',
    }),
    saveCitySuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
      error: '',
    }),
    saveCityFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Delete
    deleteCity: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteCitySuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteCityFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchCities,
  fetchCitiesSuccess,
  fetchCitiesFailed,

  saveCity,
  saveCitySuccess,
  saveCityFailed,

  deleteCity,
  deleteCitySuccess,
  deleteCityFailed,
} = citySlice.actions;

export const actionTypes = {
  fetchCities: "city/fetchCities",
  saveCity: "city/saveCity",
  deleteCity: "city/deleteCity",
};

export const CityActions = citySlice.actions;
export default citySlice;
