import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Contact } from "./components/contactus/Contact";
import Chat from "./componentsV2/chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

export default router; 