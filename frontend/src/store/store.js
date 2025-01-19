import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger"
import { persistReducer, persistStore } from "redux-persist";
import storage from"redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga"
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, sagaMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);