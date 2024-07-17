import {FC, useEffect, useState} from 'react';
import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import {FaSignOutAlt} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import avatar from '../assets/avatar.png';
import {IoNotifications} from "react-icons/io5";
import {BsFillPersonFill} from "react-icons/bs";
import logo from '../assets/logo_blue.png';
import {useAuth} from "../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {logout} from '../store/user/userSlice'
import {removeFromLocalStorage} from "../helpers/localstorage.helper";
import {toast} from "react-toastify";


const Navbar: FC = () => {
    const isAuth = useAuth();
    const {user} = useAppSelector(state => state.user);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    // console.log(user);

    const logoutHandler = () => {
        dispatch(logout());
        removeFromLocalStorage('access_token');
        toast.success('You logged out successfully.');
        navigate('/');
        setIsHidden(false)
    };


    return (
        <>
            {location.pathname === '/auth' ? (<div/>) : (

                <header className='bg-custom_white'>
                    <div
                        className='flex items-center text-custom_title m-auto justify-between py-4 max-[768px]:py-2 relative z-10 max-w-[1400px]'>

                        <Link to='/' className='flex items-center pl-2'>
                            <img src={logo} alt="logo" width={120}/>
                        </Link>


                        <div className={` ${open ? 'max-[768px]:fixed' : 'max-[768px]:absolute'} max-[768px]:right-0 max-[768px]:z-40 min-[769px]:hidden`}>
                            <div className="min-h-screen flex flex-col justify-center">
                                <div className="relative py-3 sm:max-w-xl mx-auto">
                                    <nav>
                                        <button
                                            className="w-14 h-14 relative focus:outline-none"
                                            onClick={() => setOpen(!open)}
                                        >
                                            <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span className={`block absolute h-0.5 w-7 text-custom_primary bg-current transform transition duration-500 ease-in-out 
                                    ${open ? 'rotate-45 text-white' : '-translate-y-2'}`}/>

                                                <span
                                                    className={`block absolute left-2 h-0.5 w-5 text-custom_primary bg-current transform transition duration-500 ease-in-out 
                                    ${open ? 'opacity-0' : ''}`}/>

                                                <span className={`block absolute h-0.5 w-7 text-custom_primary bg-current transform transition duration-500 ease-in-out 
                                    ${open ? '-rotate-45 text-white' : 'translate-y-2'}`}/>
                                            </div>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>


                        <div className={`flex items-center  ${open ? 
                            'max-[768px]:duration-500 max-[768px]:translate-x-0 max-[768px]:fixed max-[768px]:top-0 max-[768px]:left-0' 
                            : 
                            'max-[768px]:duration-500 max-[768px]:-translate-x-full max-[768px]:fixed max-[768px]:top-0 max-[768px]:left-0'}`}>
                            {/*{open && (*/}
                                <nav className={` 
                                text-md min-[769px]:mr-[90px] max-[768px]:bg-custom_primary max-[768px]:w-screen max-[768px]:h-screen
                                max-[768px]:z-20 max-[768px]:flex max-[768px]:justify-center max-[768px]:pt-32`}>

                                    <ul className='flex items-center gap-10 text-[16px] font-semibold max-[768px]:block max-[768px]:text-[24px] max-[768px]:overflow-fixed'>
                                        <li onClick={() => setOpen(!open)}>
                                            <NavLink to='/'
                                                     className={({isActive}) => isActive ? 'text-custom_icons max-[768px]:text-custom_text font-bold' : 'max-[768px]:text-white text-custom_text'}>Home</NavLink>
                                        </li>
                                        <li onClick={() => setOpen(!open)}>
                                            <NavLink to='/error'
                                                     className={({isActive}) => isActive ? 'text-custom_icons max-[768px]:text-custom_text font-bold' : 'max-[768px]:text-white text-custom_text'}>About</NavLink>
                                        </li>
                                        <li onClick={() => setOpen(!open)}>
                                            <NavLink to='/cars'
                                                     className={({isActive}) => isActive ? 'text-custom_icons max-[768px]:text-custom_text font-bold' : 'max-[768px]:text-white text-custom_text'}>Cars</NavLink>
                                        </li>
                                        <li onClick={() => setOpen(!open)}>
                                            <NavLink to='/contacts'
                                                     className={({isActive}) => isActive ? 'text-custom_icons max-[768px]:text-custom_text font-bold' : 'max-[768px]:text-white text-custom_text'}>Contacts</NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            {/*// )}*/}

                            <div className='max-[768px]:hidden'>

                            {
                                isAuth ? (
                                    <div className='flex items-center justify-center'>
                                        <div
                                            className='flex items-center justify-center border border-[#C3D4E9]/40 rounded-full w-11 h-11 text-2xl text-custom_icons mx-2.5 cursor-pointer relative'>
                                            <AiFillHeart/>

                                            {isAuth && user.favorites.length > 0 && (
                                                <span className='absolute right-0 top-[-1px]'>
                                                    <span className="relative flex h-[14px] w-[14px]">
                                                        <span
                                                            className="relative inline-flex rounded-full h-[14px] w-[14px] bg-custom_red flex items-center justify-center">
                                                        <span
                                                            className='text-custom_white text-[8px] font-bold'>{user.favorites.length}</span>
                                                        </span>
                                                    </span>
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className='flex items-center justify-center border border-[#C3D4E9]/40 rounded-full w-11 h-11 text-2xl text-custom_icons mx-2.5 cursor-pointer relative'>
                                            <IoNotifications/>


                                            <span className='absolute right-0 top-0'>
                                                <span className="relative flex h-3 w-3">
                                                <span
                                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-custom_red opacity-75"/>
                                                <span
                                                    className="relative inline-flex rounded-full h-3 w-3 bg-custom_red"/>
                                                </span>
                                            </span>
                                        </div>

                                        <div
                                            className='flex items-center justify-center border border-[#C3D4E9]/40 rounded-full w-11 h-11 text-2xl text-custom_icons mx-2.5 relative'>
                                            {user && user.image ? (
                                                <img src={user.image} alt="img" className='rounded-full cursor-pointer'
                                                     onClick={() => setIsHidden(!isHidden)}/>
                                            ) : (
                                                <div
                                                    onClick={() => setIsHidden(!isHidden)}
                                                    className='rounded-full cursor-pointer text-xl font-bold'>
                                                    {user.name
                                                        .split(' ')
                                                        .map(part => part[0])
                                                        .join('')}
                                                </div>
                                            )}


                                            {isHidden && (
                                                <div
                                                    className='absolute right-0 top-[50px] bg-custom_white border border-[#C3D4E9]/40 rounded-md flex flex-col justify-center items-center'>
                                                    <p className='text-sm flex items-center justify-center px-4 py-1.5 border-b border-b-[#C3D4E9]/40 cursor-pointer text-custom_text hover:text-custom_icons'>
                                                        <div className='font-bold mr-1'>Profile</div>
                                                        <BsFillPersonFill/>
                                                    </p>
                                                    <p className='text-sm flex items-center justify-center px-4 py-1.5 cursor-pointer text-custom_text hover:text-[#596780]'>
                                                        <div
                                                            className='font-bold mr-1.5'
                                                            onClick={() => logoutHandler()}>
                                                            Logout
                                                        </div>
                                                        <FaSignOutAlt/>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <button className='flex items-center ml-[90px] btn btn-orange'
                                            onClick={() => {
                                                navigate('/auth');
                                                setIsHidden(false)
                                            }}>
                                        <span>Login | Sign up</span>
                                    </button>
                                )
                            }
                            </div>

                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default Navbar;