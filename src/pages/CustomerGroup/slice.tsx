import { createSlice } from "@reduxjs/toolkit";
import { CustomerGroup } from "../../models/CustomerGroup";

export interface CustomerGroupState {
  fetching: boolean;
  customerGroups: Array<CustomerGroup>;
  totalPages: number;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  customerGroups: new Array<CustomerGroup>(),
  totalPages: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const customerGroupSlice = createSlice({
  name: "customerGroup",
  initialState,
  reducers: {
    //Fetch
    fetchCustomerGroups: (state, action) => ({
      ...state,
      fetching: !!action,
      error: '',
    }),
    fetchCustomerGroupsSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      customerGroups: action.payload,
      error: '',
    }),
    fetchCustomerGroupsFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Save
    saveCustomerGroup: (state, action) => ({
      ...state,
      fetching: !!action.type,
      error: '',
    }),
    saveCustomerGroupSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
      error: '',
    }),
    saveCustomerGroupFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Delete
    deleteCustomerGroup: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteCustomerGroupSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteCustomerGroupFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchCustomerGroups,
  fetchCustomerGroupsSuccess,
  fetchCustomerGroupsFailed,

  saveCustomerGroup,
  saveCustomerGroupSuccess,
  saveCustomerGroupFailed,

  deleteCustomerGroup,
  deleteCustomerGroupSuccess,
  deleteCustomerGroupFailed,
} = customerGroupSlice.actions;

export const actionTypes = {
  fetchCustomerGroups: "customerGroup/fetchCustomerGroups",
  saveCustomerGroup: "customerGroup/saveCustomerGroup",
  deleteCustomerGroup: "customerGroup/deleteCustomerGroup",
};

export const CustomerGroupActions = customerGroupSlice.actions;
export default customerGroupSlice;
