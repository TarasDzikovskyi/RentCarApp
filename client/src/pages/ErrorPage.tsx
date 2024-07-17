import {FC} from 'react';
import logo from '../assets/logo_blue.png';
import error from '../assets/error.png';
import {useNavigate} from "react-router-dom";



const ErrorPage: FC  = () => {
    const navigate = useNavigate();


    return (
        <div className='flex flex-col items-center'>

            <div className='w-full py-4'>
                <img src={logo} alt="logo" width={120} className='pl-2'/>
            </div>
            <div className='flex items-center justify-center px-10'>
                <div>
                    <p className='text-6xl font-medium'>page</p>
                    <p className='text-6xl font-medium'>NOT FOUND</p>
                    <p className='text-custom_icons pt-14 pb-20 text-lg w-[450px]'>
                        Oops, it looks like this page you are looking for does not exist, or
                        the link you clicked may be broken. <br/>
                        Go back to home, friend, go back.
                    </p>

                    <button
                        className='btn btn-orange px-7 py-3 text-lg'
                        onClick={() => navigate('/')}>
                        Go Home
                    </button>
                </div>

                <div>
                    <img src={error} alt="error"/>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;