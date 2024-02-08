import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./services/router.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </ChakraProvider>
  </React.StrictMode>
);
