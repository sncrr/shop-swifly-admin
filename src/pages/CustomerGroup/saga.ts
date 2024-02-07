import * as CustomerGroupController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { CustomerGroup } from "../../models/CustomerGroup";
import {
  actionTypes,
  deleteCustomerGroupFailed,
  deleteCustomerGroupSuccess,
  fetchCustomerGroupsFailed,
  fetchCustomerGroupsSuccess,
  saveCustomerGroupFailed,
  saveCustomerGroupSuccess,
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
import { Response } from "../../utils/response";

function* onFetchCustomerGroups(action: SagaProps) {

  try {
    const res: Response = yield call(
      CustomerGroupController.getAllCustomerGroups, 
      action.payload
    );

    yield put(fetchCustomerGroupsSuccess(res.data));
  } catch (error) {
    yield put(fetchCustomerGroupsFailed(error));
  }
}

function* onSaveCustomerGroup(action: SagaProps) {

  const { id, navigateToItem, navigateBack } = action.payload;

  yield put(showLoader({ text: "Saving Payment Method" }));

  try {
    const data: CustomerGroup = id
      ? yield call(CustomerGroupController.updateCustomerGroup, action.payload)
      : yield call(CustomerGroupController.createCustomerGroup, action.payload);

    if (data._id) {
      yield put(saveCustomerGroupSuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.STORE}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }
    yield put(showToast(successToast("Payment Method saved successfully")));
  } catch (error: any) {
    console.error(error);
    yield put(saveCustomerGroupFailed(error.response.data.message));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeleteCustomerGroup(action: any) {

  yield put(showLoader({ text: "Deleting Payment Method" }));

  try {
    const data: boolean = yield call(
      CustomerGroupController.deleteCustomerGroup,
      action.payload
    );

    if (data) {
      yield put(deleteCustomerGroupSuccess(data));
      yield put(showToast(successToast("Payment Method deleted successfully")));
    }
  } catch (error) {
    yield put(deleteCustomerGroupFailed(error));
    yield put(showToast(failedToast("Payment Method deleting failed")));
  }
}

//Root Saga
function* customerGroupSaga() {
  yield takeLatest(actionTypes.fetchCustomerGroups, onFetchCustomerGroups);
  yield takeLatest(actionTypes.saveCustomerGroup, onSaveCustomerGroup);
  yield takeLeading(actionTypes.deleteCustomerGroup, onDeleteCustomerGroup);
}

export default customerGroupSaga;
