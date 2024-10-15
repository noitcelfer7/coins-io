import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Profile from "./routes/profile";
import Play from "./routes/play";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/play",
    element: <Play />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
