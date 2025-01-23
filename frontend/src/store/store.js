import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger"
import { persistReducer, persistStore } from "redux-persist";
import storage from"redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga"
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import socketMiddleware from "./socket/socket.middleware";

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, socketMiddleware, sagaMiddleware];

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