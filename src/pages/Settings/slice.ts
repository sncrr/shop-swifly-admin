import { createSlice } from '@reduxjs/toolkit';

export interface SettingState {
    loading: boolean,
    data: any[]
}

const initialState = {
    loading: true,
    data: [],
    error: ''
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {

        //Fetch
        fetchSettings: (state, action) => ({
            ...state,
            loading: !!action,
        }),
        fetchSettingsSuccess: (state, action) => ({
            ...state,
            loading: false,
            data: action.payload
        }),
        fetchSettingsFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload
        }),

        //Save
        saveSettings: (state, action) => ({
            ...state,
            loading: !!action,
        }),
        saveSettingsSuccess: (state, action) => ({
            ...state,
            loading: false,
            data: action.payload
        }),
        saveSettingsFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
    }
})


export const {
    fetchSettings,
    fetchSettingsSuccess,
    fetchSettingsFailed,

    saveSettings,
    saveSettingsSuccess,
    saveSettingsFailed
} = settingSlice.actions

export const actionTypes = {
    fetchSettings: 'setting/fetchSettings',
    saveSettings: 'setting/saveSettings',
}

export default settingSlice;