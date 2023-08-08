import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import modalSlice from './slices/modalSlice';
import categorySlice from '../pages/Category/reducer';
import toastSlice from '../components/toasts/reducer';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    toast: toastSlice,
    category: categorySlice
  },
});

export default store;
