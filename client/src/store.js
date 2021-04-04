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

let devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production") {
  devTools = (a) => a;
}

export function configureStore() {
  let store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...middleware)
      // window.navigator.userAgent.includes("Chrome") &&
      //   typeof window === "object"
      //   ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //       window.__REDUX_DEVTOOLS_EXTENSION__()
      //   : compose
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
