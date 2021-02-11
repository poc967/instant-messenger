import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware =
  process.env.NODE_ENV === "development" ? [thunk, logger] : [thunk];

export function configureStore() {
  let store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...middleware),
      window.navigator.userAgent.includes("Chrome")
        ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        : compose
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
