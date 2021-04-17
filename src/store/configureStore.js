import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import log from "./middlewares/log";

const middleware = [...getDefaultMiddleware, log];

const store = function () {
  return configureStore({ reducer, middleware });
};

export default store;
