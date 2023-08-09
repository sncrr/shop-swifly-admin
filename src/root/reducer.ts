import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import toastSlice from '../components/toasts/reducer';
import alertSlice from '../components/alerts/reducer';
import categoryReducer from '../pages/Category/reducers';
import modalReducer from '../components/modals/reducers';


export const rootReducer = (history:any) => combineReducers({
  user: userSlice,
  modal: modalReducer,
  toast: toastSlice,
  alert: alertSlice,

  //Pages,
  category: categoryReducer(history)
})