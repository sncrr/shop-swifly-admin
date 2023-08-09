import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {

    showAlert(state) {
      state = true;
      return state;
    },

    closeAlert(state) {
      state = false;
      return state;
    },

  },
});

export const {
  showAlert,
  closeAlert
} = alertSlice.actions;

export default alertSlice.reducer;
