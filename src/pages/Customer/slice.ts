import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../models/Customer";
import { get } from "lodash";

export interface CustomerState {
  fetching: boolean;
  customers: Array<Customer>;
  totalPages: number;
  totalItems: number;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  customers: new Array<Customer>(),
  totalPages: 1,
  totalItems: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    //Fetch
    fetchCustomers: (state, action) => ({
      ...state,
      fetching: !!action,
    }),
    fetchCustomersSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      customers: action.payload.data ? action.payload.data : action.payload,
      totalPages: get(action, 'payload.totalPages', 1),
      totalItems: get(action, 'payload.totalRows', 1),
    }),
    fetchCustomersFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Save
    saveCustomer: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    saveCustomerSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    saveCustomerFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Delete
    deleteCustomer: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteCustomerSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteCustomerFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchCustomers,
  fetchCustomersSuccess,
  fetchCustomersFailed,

  saveCustomer,
  saveCustomerSuccess,
  saveCustomerFailed,

  deleteCustomer,
  deleteCustomerSuccess,
  deleteCustomerFailed,
} = customerSlice.actions;

export const actionTypes = {
  fetchCustomers: "customer/fetchCustomers",
  saveCustomer: "customer/saveCustomer",
  deleteCustomer: "customer/deleteCustomer",
};

export const CustomerActions = customerSlice.actions;
export default customerSlice;
