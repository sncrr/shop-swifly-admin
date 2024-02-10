import * as CustomerController from "./controllers";
import { put, call, takeLatest, takeLeading, select } from "redux-saga/effects";
import { replace } from "connected-react-router";
import { showLoader } from "../../components/modals/slice";
import { Customer } from "../../models/Customer";
import {
  actionTypes,
  deleteCustomerFailed,
  deleteCustomerSuccess,
  fetchCustomersFailed,
  fetchCustomersSuccess,
} from "./slice";
import SagaProps from "../../types/Utils/SagaProps";
import { failedToast, showToast } from "../../components/toasts/slice";

function* onFetchCustomers(action: SagaProps) {
  const { page, itemsCount, sort, search } = action.payload;

  try {
    const data: Customer[] = yield call(CustomerController.getPaginateCustomers,
      page,
      itemsCount,
      sort,
      search
    );

    yield put(fetchCustomersSuccess(data));
  } catch (error) {
    yield put(fetchCustomersFailed(error));
  }
}

function* onSaveCustomer(action: any): any {
  console.warn("SAGA Save customer", action);
}

function* onDeleteCustomer(action: any): any {
  yield put(showLoader({ text: "Deleting Customer" }));
  try {
    const data: boolean = yield call(
      CustomerController.deleteCustomer,
      action.payload
    );

    if (data) {
      yield select((state) => state.customer);

      yield put(deleteCustomerSuccess(data));
      yield put(replace(``));
    }
  } catch (error) {
    yield put(deleteCustomerFailed(error));
    yield put(showToast(failedToast("Customer deleting failed")));
  }
}

//Root Saga
function* customerSaga() {
  yield takeLatest(actionTypes.fetchCustomers, onFetchCustomers);
  yield takeLatest(actionTypes.saveCustomer, onSaveCustomer);
  yield takeLeading(actionTypes.deleteCustomer, onDeleteCustomer);
}

export default customerSaga;
