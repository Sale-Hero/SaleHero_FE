import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Contact } from "./components/contactus/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router; 