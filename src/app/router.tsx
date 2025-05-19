import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter } from "react-router-dom";
import App  from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.EVENTS,
        lazy: () => import("@/features/Events/Events.page"),
      },
      {
        path: ROUTES.EVENT,
        lazy: () => import("@/features/Event/Event.page"),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/Auth/Login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/Auth/Register.page"),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("@/features/HomePage/Home.page"),
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import("@/features/Profile/Profile.page"),
      },
      {
        path: ROUTES.CREATE_EVENT,
        lazy: () => import("@/features/CreateEvent/CreateEvent.page"),
      }
    ],
  },
]);