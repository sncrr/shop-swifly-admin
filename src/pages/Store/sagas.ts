import * as constant from './constants';
import * as StoreController from './controllers';
import * as StoreAction from './actions';
import * as ToastAction from '../../components/toasts/actions';
import { put, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { Store } from '../../types/Store/Store';
import { 
  fetchStoresSuccess, 
  fetchStoresFailed,
  saveStoreSuccess,
  saveStoreFailed,
  deleteStoreSuccess,
  deleteStoreFailed, 
} from './actions';
import { replace } from 'connected-react-router';
import * as ToastConstant from '../../components/toasts/constants';

function* onFetchStores () {
  try {
    const data: Store[] = yield call(StoreController.getAllStores);

    yield put(fetchStoresSuccess(data));
  } 
  catch (error) {
    yield put(fetchStoresFailed(error));
  }
}

function* onSaveStore(action: any) {
  const { toastId } = yield put(ToastAction.createPromiseToast({
    message: "Saving Store",
  }));

  try {
    const { id, navigateToItem } = action.payload;
    const data: Store = id ? 
      yield call(StoreController.updateStore, action.payload) :
      yield call(StoreController.createStore, action.payload);

    if(data._id) {
      yield put(saveStoreSuccess(data));
      yield put(StoreAction.fetchStores());

      if(navigateToItem) {
        yield put(replace(`?${data._id}`));
        yield put(StoreAction.selectStore(data));
      }
    }
    yield put(ToastAction.updateToast(toastId, {
      message: "Store saved successfully",
      result: ToastConstant.STATUS_SUCCESS
    }));
  } 
  catch (error) {
    yield put(saveStoreFailed(error));

    yield put(ToastAction.updateToast(toastId, {
      message: "Store saving failed",
      result: ToastConstant.STATUS_FAILED
    }));
  }
}

function* onDeleteStore(action: any) {
  
  const { toastId } = yield put(ToastAction.createPromiseToast({
    message: "Deleting store...",
  }));

  try {
    const data: boolean = yield call(StoreController.deleteStore, action.payload);
    
    if(data) {
      yield put(deleteStoreSuccess(data));
      yield put(StoreAction.fetchStores());
      yield put(replace(``));

      yield put(ToastAction.updateToast(toastId, {
        message: "Store deleted successfully",
        result: ToastConstant.STATUS_SUCCESS
      }));
    }
  } 
  catch (error) {
    yield put(deleteStoreFailed(error));

    yield put(ToastAction.updateToast(toastId, {
      message: "Store deleting failed",
      result: ToastConstant.STATUS_FAILED
    }));
  }
}

//Root Saga
function* storeSaga() {
  yield takeLatest(constant.FETCH_STORES, onFetchStores);
  yield takeLatest(constant.SAVE_STORE, onSaveStore);
  yield takeLeading(constant.DELETE_STORE, onDeleteStore);
}

export default storeSaga;