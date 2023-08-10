import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import alertSlice from '../components/alerts/reducer';
import categoryReducer from '../pages/Category/reducers';
import modalReducer from '../components/modals/reducers';
import toastReducer from '../components/toasts/reducers';


export const rootReducer = (history:any) => combineReducers({
  user: userSlice,
  modal: modalReducer,
  toast: toastReducer,
  alert: alertSlice,

  //Pages,
  category: categoryReducer(history)
})