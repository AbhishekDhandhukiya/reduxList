import { createStore } from "redux";
import { persistReducer } from "redux-persist";

import reducers from "./Reducers/RootReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persist = persistReducer(persistConfig, reducers);

const store = createStore(persist);
export default store;
