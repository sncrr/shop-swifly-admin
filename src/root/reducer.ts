import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import alertSlice from '../components/alerts/reducer';
import categoryReducer from '../pages/Category/reducers';
import modalReducer from '../components/modals/reducers';
import toastReducer from '../components/toasts/reducers';
import productReducer from '../pages/Product/reducers';
import storeReducer from '../pages/Store/reducers';
import globalReducer from '../routes/reducers';
import settingsReducer from '../pages/Configuration/reducers';

export const rootReducer = (history:any) => combineReducers({
  global: globalReducer(history),
  settings: settingsReducer(history),

  user: userSlice,
  modal: modalReducer,
  toast: toastReducer,
  alert: alertSlice,

  //Pages,
  category: categoryReducer(history),
  product: productReducer(history),
  store: storeReducer(history),
})