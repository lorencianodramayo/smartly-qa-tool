import { combineReducers } from "@reduxjs/toolkit";

import uploadReducer from "./upload";
import templateReducer from "./template";

const rootReducer = combineReducers({
  upload: uploadReducer,
  template: templateReducer,
});

export default rootReducer;
