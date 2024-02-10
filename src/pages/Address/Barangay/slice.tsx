import { createSlice } from "@reduxjs/toolkit";
import { Barangay } from "../../../models/Address";
import { get } from "lodash";

export interface BarangayState {
  fetching: boolean;
  barangays: Array<Barangay>;
  totalPages: number;
  totalItems: number,
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  barangays: new Array<Barangay>(),
  totalPages: 1,
  totalItems: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const barangaySlice = createSlice({
  name: "barangay",
  initialState,
  reducers: {
    //Fetch
    fetchBarangays: (state, action) => ({
      ...state,
      fetching: !!action,
      
      error: '',
    }),
    fetchBarangaysSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      barangays: action.payload.data ? action.payload.data : action.payload,
      error: '',
      totalPages: get(action, 'payload.totalPages', 1),
      totalItems: get(action, 'payload.totalRows', 1),
    }),
    fetchBarangaysFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Save
    saveBarangay: (state, action) => ({
      ...state,
      fetching: !!action.type,
      error: '',
    }),
    saveBarangaySuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
      error: '',
    }),
    saveBarangayFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Delete
    deleteBarangay: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteBarangaySuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteBarangayFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchBarangays,
  fetchBarangaysSuccess,
  fetchBarangaysFailed,

  saveBarangay,
  saveBarangaySuccess,
  saveBarangayFailed,

  deleteBarangay,
  deleteBarangaySuccess,
  deleteBarangayFailed,
} = barangaySlice.actions;

export const actionTypes = {
  fetchBarangays: "barangay/fetchBarangays",
  saveBarangay: "barangay/saveBarangay",
  deleteBarangay: "barangay/deleteBarangay",
};

export const BarangayActions = barangaySlice.actions;
export default barangaySlice;
