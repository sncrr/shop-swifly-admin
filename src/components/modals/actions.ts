import * as constant from './constants';

//LOADER
export const showLoader = () => ({
  type: constant.SHOW_LOADER
});
export const hideLoader = () => ({
  type: constant.HIDE_LOADER
});