import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const rootStore = configureStore({
  reducer: rootReducer(), // Pass history to rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)), // Include routerMiddleware
});

sagaMiddleware.run(rootSaga);

export default rootStore;
