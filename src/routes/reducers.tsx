import * as constant from './constants';
import ReducerProps from '../types/Utils/ReducerProps';

export interface GlobalState {

}

const initialState = {
  targetPath: '/',
  navigateTo: false
};

const globalReducer = (history: any) => (state = initialState, action: ReducerProps) => {

  switch (action.type) {
    case constant.NAVIGATE_TO:
      return {
        ...state,
        targetPath: action.data,
        navigateTo: true,
      };
    case constant.NAVIGATE_STOP:
      return {
        ...state,
        navigateTo: false,
      };
    default:
      return state;
  }
};

export default globalReducer;