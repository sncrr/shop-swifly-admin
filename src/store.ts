import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { all } from "redux-saga/effects";
import categorySaga from "./pages/Category/saga";
import toastSaga from "./components/toasts/saga";
import productSaga from "./pages/Product/sagas";
import storeSaga from "./pages/Store/sagas";
import settingSaga from "./pages/Settings/sagas";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const rootStore = configureStore({
  reducer: rootReducer(), // Pass history to rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)), // Include routerMiddleware
});

//Sagas
function* rootSaga() {
  yield all([
    toastSaga(),

    categorySaga(),
    productSaga(),
    storeSaga(),

    settingSaga(),
  ]);
}

sagaMiddleware.run(rootSaga);

export default rootStore;
