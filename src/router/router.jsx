import { Outlet } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AnalyseLexicale from "../pages/AnalyseLexicale";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: (
      <div className="h-screen w-screen flex flex-col justify-center items-center text-primary font-bold">
        <p className="text-5xl">404</p>
        <p className="text-4xl">Page non existante</p>
      </div>
    ),
  },
  {
    path:"/analyse-lexicale",
    element:<AnalyseLexicale/>
  }
]);
