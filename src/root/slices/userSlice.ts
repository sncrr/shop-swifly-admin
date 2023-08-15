import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser(state, action) {
      console.log("SET")
      state.info = action.payload;
      return state;
    },

  },
});

export const {
  setUser
} = userSlice.actions;

export default userSlice.reducer;
