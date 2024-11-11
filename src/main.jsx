import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import HeroRegister from './Components/HeroRegister/HeroRegister';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/Register',
        element: <Register></Register>
      },
      {
        path: '/Login',
        element: <Login></Login>
      },
      {
        path: '/RegisterHero',
        element: <HeroRegister></HeroRegister>
      }
    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
