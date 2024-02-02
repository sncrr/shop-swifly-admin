import { createSlice } from "@reduxjs/toolkit";
import { PaymentMethod } from "../../models/PaymentMethod";

export interface PaymentMethodState {
  fetching: boolean;
  paymentMethods: Array<PaymentMethod>;
  totalPages: number;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  paymentMethods: new Array<PaymentMethod>(),
  totalPages: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    //Fetch
    fetchPaymentMethods: (state, action) => ({
      ...state,
      fetching: !!action,
      error: '',
    }),
    fetchPaymentMethodsSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      paymentMethods: action.payload,
      error: '',
    }),
    fetchPaymentMethodsFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Save
    savePaymentMethod: (state, action) => ({
      ...state,
      fetching: !!action.type,
      error: '',
    }),
    savePaymentMethodSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
      error: '',
    }),
    savePaymentMethodFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Delete
    deletePaymentMethod: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deletePaymentMethodSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deletePaymentMethodFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchPaymentMethods,
  fetchPaymentMethodsSuccess,
  fetchPaymentMethodsFailed,

  savePaymentMethod,
  savePaymentMethodSuccess,
  savePaymentMethodFailed,

  deletePaymentMethod,
  deletePaymentMethodSuccess,
  deletePaymentMethodFailed,
} = paymentMethodSlice.actions;

export const actionTypes = {
  fetchPaymentMethods: "paymentMethod/fetchPaymentMethods",
  savePaymentMethod: "paymentMethod/savePaymentMethod",
  deletePaymentMethod: "paymentMethod/deletePaymentMethod",
};

export const PaymentMethodActions = paymentMethodSlice.actions;
export default paymentMethodSlice;
