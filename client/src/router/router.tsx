import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import CarList, {carsLoader, carAction} from "../pages/CarList";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import About from "../pages/About";
import Booking, {rentAction} from "../pages/Booking";
import Contacts from "../pages/Contacts";
import CarItem, {carLoader} from "../pages/CarItem";
import {ProtectedRoute} from "../components/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'cars',
                loader: carsLoader,
                element: <CarList/>
            },
            {
                path: 'auth',
                element:  <Auth/>
            },
            {
                path: 'forgot',
                element:  <ForgotPassword/>
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'booking/:id',
                action: rentAction,
                element: <Booking/>
            },
            {
                path: 'contacts',
                element: (
                    <ProtectedRoute>
                        <Contacts/>
                    </ProtectedRoute>
                )
            },
            {
                path: 'cars/:id',
                loader: carLoader,
                action: carAction,
                element: <CarItem/>
            },
        ]
    }
]);