import { createSlice } from '@reduxjs/toolkit';
import { Store } from '../../models/Store';

export interface StoreState {
    fetching: boolean,
    stores: Array<Store>,
    totalPages: number,
    hasChanges: boolean,
    error: string,
    data: any
}


const initialState = {
    fetching: true,
    stores: new Array<Store>(),
    totalPages: 1,
    hasChanges: true,
    data: null,
    error: ''
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        //Fetch
        fetchStores: (state, action) => ({
            ...state,
            fetching: !!action
        }),
        fetchStoresSuccess: (state, action) => ({
            ...state,
            fetching: false,
            hasChanges: false,
            stores: action.payload.data ? action.payload.data : action.payload,
            totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
        }),
        fetchStoresFailed: (state, action) => ({
            ...state,
            fetching: false,
            error: action.payload
        }),

        //Save
        saveStore: (state, action) => ({
            ...state,
            fetching: !!action.type
        }),
        saveStoreSuccess: (state, action) => ({
            ...state,
            fetching: false,
            hasChanges: true,
            data: action.payload
        }),
        saveStoreFailed: (state, action) => ({
            ...state,
            fetching: false,
            error: action.payload
        }),

        //Delete
        deleteStore: (state, action) => ({
            ...state,
            fetching: !!action.type
        }),
        deleteStoreSuccess: (state, action) => ({
            ...state,
            fetching: false,
            hasChanges: true,
            data: action.payload
        }),
        deleteStoreFailed: (state, action) => ({
            ...state,
            fetching: false,
            error: action.payload
        })
    }
})

export const {
    fetchStores,
    fetchStoresSuccess,
    fetchStoresFailed,

    saveStore,
    saveStoreSuccess,
    saveStoreFailed,

    deleteStore,
    deleteStoreSuccess,
    deleteStoreFailed
} = storeSlice.actions;

export const actionTypes = {
    fetchStores: 'store/fetchStores',
    saveStore: 'store/saveStore',
    deleteStore: 'store/deleteStore'
}

export const StoreActions = storeSlice.actions;
export default storeSlice;