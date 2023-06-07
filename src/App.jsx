import React from 'react';
import { RouterProvider } from 'react-router';
import {router} from "./router/router";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App