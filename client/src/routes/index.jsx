import { createBrowserRouter } from "react-router-dom";

import Main from "../pages/Main";
import Error from "../pages/Error";
import Playground from "../pages/Playground";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "playground/:playgroundId",
    element: <Playground />,
  },
]);

export { router };
