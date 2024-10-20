import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import PrivateRoutes from './components/users/PrivateRoutes.jsx';
import Home from './components/users/Home.jsx';
import Register, { registerAction } from './components/users/Register.jsx';
import Login, { loginAction } from './components/users/Login.jsx';
import HeaderComponent from './components/general/HeaderComponent.jsx';
import FooterComponent from './components/general/FooterComponent.jsx';
import AddTicket, { addTicketAction } from './components/tickets/AddTicket.jsx';
import ListTickets from './components/tickets/ListTickets.jsx';

const router = createBrowserRouter([
  {
    path: "/users/",
    element: (
      <>
        <PrivateRoutes />
      </>
    ),
    children: [
      {
        path: "",
        element: <><HeaderComponent /><Home /></>,
        children: [
          {
            path: "add-ticket/",
            element: <AddTicket />,
            action: addTicketAction
          },
          {
            path: "show-tickets/",
            element: <ListTickets />
          },
          {
            path: "my-tickets/",
            element: <></>
          }
        ]
      },
    ]
  },
  {
    path: '/login/',
    element: <><HeaderComponent /><Login /></>,
    action: loginAction
  },
  {
    path: "/register/",
    element: <><HeaderComponent /><Register /></>,
    action: registerAction
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
