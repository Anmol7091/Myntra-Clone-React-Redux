import { StrictMode } from "react";
import { Outlet } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.jsx";
import App from "./routes/App.jsx";
import Bag from "./routes/Bag.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import myntraStore from "../store/index.js";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Bag", element: <Bag /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={Router}></RouterProvider>
    </Provider>
  </StrictMode>
);
