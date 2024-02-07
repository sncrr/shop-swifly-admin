import { combineReducers } from "@reduxjs/toolkit";
import globalSlice, { GlobalState } from "../pages/Admin/slice";
import modalSlice from "../components/modals/slice";
import toastSlice from "../components/toasts/slice";
import categorySlice, { CategoryState } from "../pages/Category/slice";
import productSlice, { ProductState } from "../pages/Product/slice";
import storeSlice, { StoreState } from "../pages/Store/slice";
import settingSlice from "../pages/Settings/slice";
import paymentMethodSlice, { PaymentMethodState } from "../pages/PaymentMethods/slice";
import customerSlice, { CustomerState } from "../pages/Customer/slice";
import customerGroupSlice, { CustomerGroupState } from "../pages/CustomerGroup/slice";
import provinceSlice, { ProvinceState } from "../pages/Address/Province/slice";
import citySlice, { CityState } from "../pages/Address/City/slice";
import barangaySlice, { BarangayState } from "../pages/Address/Barangay/slice";

export interface RootState {
  global: GlobalState;
  settings: any;
  modal: any;
  toast: any;

  category: CategoryState;
  product: ProductState;

  customer: CustomerState;
  customerGroup: CustomerGroupState,

  province: ProvinceState,
  city: CityState,
  barangay: BarangayState,

  store: StoreState;
  paymentMethod: PaymentMethodState;
}

export const rootReducer = () =>
  combineReducers<RootState>({
    global: globalSlice.reducer,
    settings: settingSlice.reducer,

    modal: modalSlice.reducer,
    toast: toastSlice.reducer,
    // alert: alertSlice,

    //Pages,
    category: categorySlice.reducer,
    product: productSlice.reducer,

    //Customers
    customer: customerSlice.reducer,
    customerGroup: customerGroupSlice.reducer,
    //Address
    province: provinceSlice.reducer,
    city: citySlice.reducer,
    barangay: barangaySlice.reducer,

    store: storeSlice.reducer,
    paymentMethod: paymentMethodSlice.reducer,
  });
