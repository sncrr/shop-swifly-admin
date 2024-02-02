import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  user: any;
  loading: boolean;
  targetPath: string;
  navigateTo: boolean;
}

const initialState = {
  user: null,
  loading: true,
  targetPath: "/",
  navigateTo: false,
};

const globalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
      loading: false,
    }),
    clearUser: (state) => ({
      ...state,
      user: null,
      loading: false,
    }),

    navigateTo: (state, action) => ({
      ...state,
      navigateTo: true,
      targetPath: action.payload,
    }),
    navigateStop: (state) => ({
      ...state,
      navigate: "",
      navigateTo: false,
    }),
  },
});

export const {
  setUser,
  clearUser,

  navigateTo,
  navigateStop,
} = globalSlice.actions;

export default globalSlice;
