import * as StoreController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { Store } from "../../models/Store";
import {
  actionTypes,
  deleteStoreFailed,
  deleteStoreSuccess,
  fetchStoresFailed,
  fetchStoresSuccess,
  saveStoreFailed,
  saveStoreSuccess,
} from "./slice";
import SagaProps from "../../types/Utils/SagaProps";
import { hideLoader, showLoader } from "../../components/modals/slice";
import { navigateTo } from "../Admin/slice";
import { Paths } from "../../constants";
import {
  failedToast,
  showToast,
  successToast,
} from "../../components/toasts/slice";

function* onFetchStores(action: SagaProps) {

  try {
    const { page, itemsCount, sort, order, search } = action.payload;
    const data: Store[] = yield call(StoreController.getPaginateProducts,
      page,
      itemsCount,
      sort,
      order,
      search
    );

    yield put(fetchStoresSuccess(data));
  } catch (error) {
    yield put(fetchStoresFailed(error));
  }
}

function* onSaveStore(action: SagaProps) {

  const { id, navigateToItem, navigateBack } = action.payload;

  yield put(showLoader({ text: "Saving Store" }));

  try {
    const data: Store = id
      ? yield call(StoreController.updateStore, action.payload)
      : yield call(StoreController.createStore, action.payload);

    if (data._id) {
      yield put(saveStoreSuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.STORE}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }
    yield put(showToast(successToast("Store saved successfully")));
  } catch (error) {
    yield put(saveStoreFailed(JSON.stringify(error)));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeleteStore(action: any) {

  yield put(showLoader({ text: "Deleting Store" }));

  try {
    const data: boolean = yield call(
      StoreController.deleteStore,
      action.payload
    );

    if (data) {
      yield put(deleteStoreSuccess(data));
      yield put(showToast(successToast("Store deleted successfully")));
    }
  } catch (error) {
    yield put(deleteStoreFailed(error));
    yield put(showToast(failedToast("Store deleting failed")));
  }
}

//Root Saga
function* storeSaga() {
  yield takeLatest(actionTypes.fetchStores, onFetchStores);
  yield takeLatest(actionTypes.saveStore, onSaveStore);
  yield takeLeading(actionTypes.deleteStore, onDeleteStore);
}

export default storeSaga;
