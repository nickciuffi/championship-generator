import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Home } from "./pages/home/home";
import { GameShower } from "./pages/GameShower/GameShower";
import { App } from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[{
      path: "/",
      element: <Home />
    },
    {
      path: "/game",
      element: <GameShower />
    }
  ]
    
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
    <RouterProvider router={router} />
);