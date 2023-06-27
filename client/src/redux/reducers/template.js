import { createSlice } from "@reduxjs/toolkit";
import { requestGetTemplate } from "../../utils/api/template";

const initialState = {
  data: {},
  fetching: false,
  error: null,
};

const template = createSlice({
  name: "template",
  initialState,
  reducers: {
    fetchListStart: (state) => {
      state.fetching = true;
      state.error = null;
    },
    successTemplate: (state, { payload }) => {
      state.data = payload;
      state.fetching = false;
      state.error = null;
    },
    errorTemplate: (state, { payload }) => {
      state.fetching = false;
      state.error = payload;
    },
  },
});

export const { fetchListStart, successTemplate, errorTemplate } =
  template.actions;

export const getTemplate = (id) => async (dispatch) => {
  dispatch(fetchListStart());
  const response = await requestGetTemplate(id);

  const { success, data, message } = response.data;

  success ? dispatch(successTemplate(data)) : dispatch(errorTemplate(message));
};

export default template.reducer;
