import { combineReducers } from '@reduxjs/toolkit';
import globalSlice, { GlobalState } from './pages/Admin/slice';
import modalSlice from './components/modals/slice';
import toastSlice from './components/toasts/slice';
import categorySlice, { CategoryState } from './pages/Category/slice';
import productSlice, { ProductState } from './pages/Product/slice';
import storeSlice, { StoreState } from './pages/Store/slice';
import settingSlice from './pages/Settings/slice';

export interface RootState {
  global: GlobalState
  settings: any
  modal: any
  toast: any
  category: CategoryState,
  product: ProductState,
  store: StoreState,
}

export const rootReducer = () => combineReducers<RootState>({
  global: globalSlice.reducer,
  settings: settingSlice.reducer,

  modal: modalSlice.reducer,
  toast: toastSlice.reducer,
  // alert: alertSlice,

  //Pages,
  category: categorySlice.reducer,
  product: productSlice.reducer,
  store: storeSlice.reducer
})