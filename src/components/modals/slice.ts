import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaderModal: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {

    showLoader: (state, action) => ({
      ...state,
      loaderModal: action.payload
    }),
    hideLoader: (state) => ({
      ...state,
      loaderModal: null
    })

  },
});

export const {
  showLoader,
  hideLoader
} = modalSlice.actions;

export default modalSlice;

