import * as constant from './constants';
import * as ProductController from './controllers';
import * as ProductAction from './actions';
import * as ToastAction from '../../components/toasts/actions';
import { put, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { Product } from '../../types/Inventory/Product';
import { 
  fetchProductsSuccess, 
  fetchProductsFailed,
  saveProductSuccess,
  saveProductFailed,
  deleteProductSuccess,
  deleteProductFailed, 
} from './actions';
import { hideLoader } from '../../components/modals/actions';
import { replace } from 'connected-react-router';
import * as ToastConstant from '../../components/toasts/constants';

function* onFetchProducts () {
  try {
    const data: Product[] = yield call(ProductController.getAllProducts);

    yield put(fetchProductsSuccess(data));
    yield put(hideLoader());
  } 
  catch (error) {
    yield put(fetchProductsFailed(error));
    yield put(hideLoader());
  }
}

function* onSaveProduct(action: any) {
  const { toastId } = yield put(ToastAction.createPromiseToast({
    message: "Saving Product",
  }));

  try {
    const { id, navigateToItem } = action.payload;
    const data: Product = id ? 
      yield call(ProductController.updateProduct, action.payload) :
      yield call(ProductController.createProduct, action.payload);

    if(data._id) {
      yield put(saveProductSuccess(data));
      yield put(ProductAction.fetchProducts());

      if(navigateToItem) {
        yield put(replace(`?${data._id}`));
        yield put(ProductAction.selectProduct(data));
      }
    }
    yield put(ToastAction.updateToast(toastId, {
      message: "Product saved successfully",
      result: ToastConstant.STATUS_SUCCESS
    }));
  } 
  catch (error) {
    yield put(saveProductFailed(error));

    yield put(ToastAction.updateToast(toastId, {
      message: "Product saving failed",
      result: ToastConstant.STATUS_FAILED
    }));
  }
}

function* onDeleteProduct(action: any) {
  
  const { toastId } = yield put(ToastAction.createPromiseToast({
    message: "Deleting product...",
  }));

  try {
    const data: boolean = yield call(ProductController.deleteProduct, action.payload);
    
    if(data) {
      yield put(deleteProductSuccess(data));
      yield put(ProductAction.fetchProducts());
      yield put(replace(``));

      yield put(ToastAction.updateToast(toastId, {
        message: "Product deleted successfully",
        result: ToastConstant.STATUS_SUCCESS
      }));
    }
  } 
  catch (error) {
    yield put(deleteProductFailed(error));

    yield put(ToastAction.updateToast(toastId, {
      message: "Product deleting failed",
      result: ToastConstant.STATUS_FAILED
    }));
  }
}

//Root Saga
function* productSaga() {
  yield takeLatest(constant.FETCH_PRODUCTS, onFetchProducts);
  yield takeLatest(constant.SAVE_PRODUCT, onSaveProduct);
  yield takeLeading(constant.DELETE_PRODUCT, onDeleteProduct);
}

export default productSaga;