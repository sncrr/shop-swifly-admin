import * as ProductController from "./controllers";
import { put, call, takeLatest, takeLeading, select } from "redux-saga/effects";
import { replace } from "connected-react-router";
import { showLoader } from "../../components/modals/slice";
import { Product } from "../../models/Product";
import {
  actionTypes,
  deleteProductFailed,
  deleteProductSuccess,
  fetchProductsFailed,
  fetchProductsSuccess,
} from "./slice";
import SagaProps from "../../types/Utils/SagaProps";
import { failedToast, showToast } from "../../components/toasts/slice";

function* onFetchProducts(action: SagaProps) {
  const { page, itemsCount, sort, order, search } = action.payload;

  try {
    const data: Product[] = yield call(ProductController.getPaginateProducts,
      page,
      itemsCount,
      sort,
      order,
      search
    );

    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailed(error));
  }
}

function* onSaveProduct(action: any): any {
  console.log("SAGA Save product", action);
}

function* onDeleteProduct(action: any): any {
  yield put(showLoader({ text: "Deleting Product" }));
  try {
    const data: boolean = yield call(
      ProductController.deleteProduct,
      action.payload
    );

    if (data) {
      yield select((state) => state.product);

      yield put(deleteProductSuccess(data));
      yield put(replace(``));
    }
  } catch (error) {
    yield put(deleteProductFailed(error));
    yield put(showToast(failedToast("Product deleting failed")));
  }
}

//Root Saga
function* productSaga() {
  yield takeLatest(actionTypes.fetchProducts, onFetchProducts);
  yield takeLatest(actionTypes.saveProduct, onSaveProduct);
  yield takeLeading(actionTypes.deleteProduct, onDeleteProduct);
}

export default productSaga;
