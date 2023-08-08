import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loader: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    
    //Loader
    showLoader(state) {
      state.loader = true;
      return state;
    },          
    hideLoader(state) {
      state.loader = false;
      return state;
    }

  },
});

export const {
  showLoader,
  hideLoader
} = modalSlice.actions;

export default modalSlice.reducer;
