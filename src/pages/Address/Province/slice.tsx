import { createSlice } from "@reduxjs/toolkit";
import { Province } from "../../../models/Address";
import { get } from "lodash";

export interface ProvinceState {
  fetching: boolean;
  provinces: Array<Province>;
  totalPages: number;
  totalItems: number;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  provinces: new Array<Province>(),
  totalPages: 1,
  totalItems: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    //Fetch
    fetchProvinces: (state, action) => ({
      ...state,
      fetching: !!action,
      
      error: '',
    }),
    fetchProvincesSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      provinces: action.payload.data ? action.payload.data : action.payload,
      error: '',
      totalPages: get(action, 'payload.totalPages', 1),
      totalItems: get(action, 'payload.totalRows', 1),
    }),
    fetchProvincesFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Save
    saveProvince: (state, action) => ({
      ...state,
      fetching: !!action.type,
      error: '',
    }),
    saveProvinceSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
      error: '',
    }),
    saveProvinceFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Delete
    deleteProvince: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteProvinceSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteProvinceFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchProvinces,
  fetchProvincesSuccess,
  fetchProvincesFailed,

  saveProvince,
  saveProvinceSuccess,
  saveProvinceFailed,

  deleteProvince,
  deleteProvinceSuccess,
  deleteProvinceFailed,
} = provinceSlice.actions;

export const actionTypes = {
  fetchProvinces: "province/fetchProvinces",
  saveProvince: "province/saveProvince",
  deleteProvince: "province/deleteProvince",
};

export const ProvinceActions = provinceSlice.actions;
export default provinceSlice;
