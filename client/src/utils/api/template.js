import axios from "axios";

export const requestGetTemplate = (id) =>
  axios
    .get("/api/template", {
      params: {
        id,
      },
    })
    .then((response) => response);
