import { createSlice } from "@reduxjs/toolkit";
import { requestUploadFile } from "../../utils/api/upload";

const initialState = {
  uuid: null,
  fetching: false,
  error: null,
};

const upload = createSlice({
  name: "upload",
  initialState,
  reducers: {
    fetchListStart: (state) => {
      state.fetching = true;
      state.error = null;
    },
    successUpload: (state, { payload }) => {
      state.uuid = payload;
      state.fetching = false;
      state.error = null;
    },
    errorUpload: (state, { payload }) => {
      state.fetching = false;
      state.error = payload;
    },
  },
});

export const { fetchListStart, successUpload, errorUpload } = upload.actions;

export const parseZipFile = (zip) => async (dispatch) => {
  dispatch(fetchListStart());
  const response = await requestUploadFile(zip);

  const { success, data, message } = response.data;

  success ? dispatch(successUpload(data)) : dispatch(errorUpload(message));
};

export default upload.reducer;
