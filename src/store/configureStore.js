import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = function () {
  return configureStore({ reducer });
};

export default store;
