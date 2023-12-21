import * as constant from './constants';

export const navigateTo = (data: any) => ({
    type: constant.NAVIGATE_TO,
    data,
})

export const navigateStop = () => ({
  type: constant.NAVIGATE_STOP
})