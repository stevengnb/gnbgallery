import Home from "../pages/home/home";
import Login from "../pages/authentication-page/login";
import Register from "../pages/authentication-page/register";
import Gallery from "../pages/gallery-page/gallery";
import AddPhoto from "../pages/gallery-page/add-photo";

export interface IMenu {
  name: string;
  path: string;
  element: JSX.Element;
}

export const MENU_LIST: IMenu[] = [
  {
    element: <Home />,
    name: "Home",
    path: "/",
  },
  {
    element: <Login />,
    name: "Login",
    path: "/login",
  },
  {
    element: <Register />,
    name: "Register",
    path: "/register",
  },
  {
    element: <Gallery />,
    name: "Gallery",
    path: "/stevengnb",
  },
  {
    element: <AddPhoto/>,
    name: "Add",
    path: "/stevengnb/add",
  },
];
