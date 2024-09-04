import { createBrowserRouter } from "react-router-dom";
import { Home, Login } from "@/pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    }
])