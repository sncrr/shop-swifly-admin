import { createSlice } from "@reduxjs/toolkit";
import { Promotion } from "../../models/Promotion";

export interface PromotionState {
  fetching: boolean;
  promotions: Array<Promotion>;
  search: string;
  hasChanges: boolean;
  error: string;
  data: any;
  saving: boolean;
}

const initialState = {
  fetching: true,
  promotions: new Array<Promotion>(),
  search: "",
  hasChanges: true,
  data: null,
  error: "",
  saving: false,
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    //Fetch
    fetchPromotions: (state, action) => ({
      ...state,
      search: action.payload.search,
      fetching: !!action,
    }),
    fetchPromotionsSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      promotions: action.payload,
    }),
    fetchPromotionsFailed: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      error: action.payload,
    }),

    //Save
    savePromotion: (state, action) => ({
      ...state,
      fetching: !!action.type,
      saving: true,
    }),
    savePromotionSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
      saving: false,
    }),
    savePromotionFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
      saving: false,
    }),

    //Delete
    deletePromotion: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deletePromotionSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deletePromotionFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchPromotions,
  fetchPromotionsSuccess,
  fetchPromotionsFailed,

  savePromotion,
  savePromotionSuccess,
  savePromotionFailed,

  deletePromotion,
  deletePromotionSuccess,
  deletePromotionFailed,
} = promotionSlice.actions;

export const actionTypes = {
  fetchPromotions: "promotion/fetchPromotions",
  savePromotion: "promotion/savePromotion",
  deletePromotion: "promotion/deletePromotion",
};

export const PromotionActions = promotionSlice.actions;
export default promotionSlice;
