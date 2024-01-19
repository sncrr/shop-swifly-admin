import * as constant from './constants';

//FETCH SETTING
export const fetchSettings = (payload: any) => ({
    type: constant.FETCH_SETTINGS,
    payload,
});
export const fetchSettingsSuccess = (data: any) => ({
    type: constant.FETCH_SETTINGS_SUCCESS,
    data,
});
export const fetchSettingsFailed = (error: any) => ({
    type: constant.FETCH_SETTINGS_FAILED,
    error,
});

//CREATE OR UPDATE SETTING
export const saveSetting = (payload: {
    data?: any,
    hasLoader?: boolean,
    navigateToItem?: boolean, // Navigate to setting after saving
    navigateBack?: boolean
}) => ({
    type: constant.SAVE_SETTING,
    payload,
});
export const saveSettingSuccess = (data: any) => ({
    type: constant.SAVE_SETTING_SUCCESS,
    data
});
export const saveSettingFailed = (error: any) => ({
    type: constant.SAVE_SETTING_FAILED,
    error,
});