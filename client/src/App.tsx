import * as React from "react";
import {RouterProvider} from 'react-router-dom';
import {router} from "./router/router";
import {useAppDispatch} from "./store/hooks";
import {getGoogleAccountFromLocalStorage, getTokenFromLocalStorage} from "./helpers/localstorage.helper";
import {toast} from "react-toastify";
import {AuthService} from "./services/auth.service";
import {useEffect} from "react";
import {login, logout} from './store/user/userSlice';


function App() {
    const dispatch = useAppDispatch();

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage();

        try {
            if (token) {
                const data = await AuthService.getProfile();
                // console.log(data)

                if (data) dispatch(login(data));
                else dispatch(logout)
            }
        } catch (e: any) {
            const error = e.response?.data.message;
            toast.error(error.toString())
        }
    };


    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
