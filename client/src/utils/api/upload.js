import axios from "axios";

export const requestUploadFile = (file) =>
  axios.post("/api/upload", file).then((response) => response);