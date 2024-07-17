import {FC} from 'react';
import Navbar from "../components/Navbar";
import {Outlet, useLocation} from 'react-router-dom';
import Footer from "../components/Footer";


const Layout: FC = () => {
    const location = useLocation();

    const paths = ['/forgot', '/auth'];



    return (
        <div className={`${location.pathname === '/forgot' ? 'forgotBg' : 'bg-custom_bg'} text-custom_text relative`}>
            {!paths.includes(location.pathname) && <Navbar/>}

            <div className='container'>
                <Outlet/>
            </div>

            {!paths.includes(location.pathname)  && <Footer/>}
        </div>
    );
};

export default Layout;