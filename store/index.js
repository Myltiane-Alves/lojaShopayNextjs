import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import cart from './cartSlice';
import expandSidebar from './ExpandSlice';
// import persistStore from "redux-persist/es/persistStore";
const reducers = combineReducers({cart, expandSidebar})


const config = {
  key: 'root',
  storage,
}


const reducer = persistReducer(config, reducers);

// const storage = 
//   typeof window !== "undefined" 
//   ? createWebStorage("local") 
//   : createNoopStorage();

// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

// export const persistor = persistStore(store)

export default store;