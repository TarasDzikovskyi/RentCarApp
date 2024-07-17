import {FC, default as React, useEffect, useState} from 'react';
import login_img from '../assets/etron.png';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {IoPersonSharp} from "react-icons/io5";
import PasswordStrengthBar from 'react-password-strength-bar';
import {MdDriveFileRenameOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../services/auth.service";
import {toast} from "react-toastify";
import { setTokenToLocalStorage} from "../helpers/localstorage.helper";
import {useAppDispatch} from "../store/hooks";
import {login} from '../store/user/userSlice';
import {instance} from "../api/axios.api";
import {useAuth} from "../hooks/useAuth";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {jwtDecode, JwtPayload} from "jwt-decode";

const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [type, setType] = useState<string>('password');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPass, setRepeatPass] = useState<string>('');
    const isAuth = useAuth();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!isLogin && (password !== repeatPass)) {
                toast.error('Passwords don`t match!')

            } else if (!isLogin && (password === repeatPass)) {

                const data = await AuthService.registration({email, name, password});
                if (data) {
                    toast.success('Account has been created.');
                    setIsLogin(!isLogin)
                }
            }
        } catch (e: any) {
            const error = e.response?.data.message;
            toast.error(error.toString())
        }
    };


    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({email, password});

            if (data) {
                setTokenToLocalStorage('access_token', data.access_token);
                dispatch(login(data));
                navigate('/')
            }
        } catch (e: any) {
            const error = e.response?.data.message;
            toast.error(error.toString())
        }
    };


    const clientId = '321071471682-4j6oq01rgl54tq9iamf8heuafa6sg5ad.apps.googleusercontent.com';

    const onSuccess = async (res) => {
        const decoded = jwtDecode<JwtPayload>(res.credential);

        if (decoded && decoded.email) {
            let profile = {};
            profile['name'] = decoded.name;
            profile['email'] = decoded.email;
            profile['image'] = decoded.picture;
            profile['id'] = +decoded.sub;
            profile['password'] = decoded.sub;

            const {data} = await instance.post('auth/login/google', profile);

            if(data) {
                setTokenToLocalStorage('access_token', data.access_token);
                dispatch(login(data));
                navigate('/')
            }
        }
    };

    const onFailure = (res) => {
        console.log(res);
        toast.error('Login Failed')
    };


    return (
        <>
            {isAuth ? (
                navigate('/')
            ) : (
                <div className='relative flex h-screen mx-[calc(-1*(100vw-1180px)/2)]'>
                    <div className='bg-custom_primary w-1/3'/>
                    <div className='bg-custom_white  w-2/3'/>

                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-custom_shadow_auth">

                        <div className='flex items-center px-5'>
                            <div className='w-[580px]'>
                                <img src={login_img} alt="img"/>
                            </div>

                            <div className='py-24 px-20 w-[580px]'>

                                <h1 className='text-3xl font-bold text-custom_title text-center'>
                                    {isLogin ? (
                                        'Login your Account'
                                    ) : (
                                        'Create your Account'
                                    )}
                                </h1>

                                <p className='text-center text-sm pt-2 pb-7'>
                                    Since this is your first trip, you`ll need to provide us with some information
                                    before you
                                    can check out.
                                </p>

                                {isLogin && (
                                    <div>
                                        {/*<div className='flex items-center bg-custom_title w-full justify-center py-2 border-[1px] border-custom_icons rounded-3xl cursor-pointer mb-4'>*/}
                                        {/*    <span className='text-[20px] pr-3 text-custom_white'><IoLogoApple /></span>*/}
                                        {/*    <span className='uppercase text-custom_white text-[13px] font-bold'>*/}
                                        {/*        Continue with apple*/}
                                        {/*    </span>*/}
                                        {/*</div>*/}


                                        <div
                                            className='flex items-center w-full justify-center  cursor-pointer'>
                                            <GoogleOAuthProvider
                                                clientId="321071471682-4j6oq01rgl54tq9iamf8heuafa6sg5ad.apps.googleusercontent.com">
                                                <GoogleLogin
                                                    theme='outline'
                                                    shape='pill'
                                                    width='100%'
                                                    clientId={clientId}
                                                    text='continue_with'
                                                    logo_alignment="center"
                                                    onSuccess={onSuccess}
                                                    onFailure={onFailure}
                                                    isSignedIn={true}
                                                    locale='en-EN'
                                                />
                                            </GoogleOAuthProvider>
                                        </div>


                                        <div className=''>
                                            <div className="flex items-center justify-center  relative">
                                                <hr className="w-[300px] h-px my-8 bg-gray-200 border-0"/>
                                                <span
                                                    className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">or</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form
                                    onSubmit={isLogin ? loginHandler : registrationHandler}
                                    className='flex flex-col justify-center'
                                >

                                    {!isLogin && (
                                        <div className='relative'>
                                            <input type="text" placeholder='Full Name *'
                                                   onChange={(e) => setName(e.target.value)}
                                                   className='input text-custom_icons w-full font-semibold rounded-lg mb-5  placeholder:font-normal'/>
                                            <span
                                                onClick={() => setType('text')}
                                                className='absolute right-4 top-3.5 text-xl text-custom_icons'>
                                <MdDriveFileRenameOutline/>
                            </span>
                                        </div>
                                    )}

                                    <div className='relative'>
                                        <input type="email" placeholder='Email *'
                                               onChange={(e) => setEmail(e.target.value)}
                                               className='input  text-custom_icons w-full font-semibold rounded-lg mb-5  placeholder:font-normal'/>
                                        <span
                                            onClick={() => setType('text')}
                                            className='absolute right-4 top-3.5 text-xl text-custom_icons'>
                                <IoPersonSharp/>
                            </span>
                                    </div>


                                    <div className='relative'>
                                        <input type={type} placeholder='Password *'
                                               onChange={(e) => setPassword(e.target.value)}
                                               className='input text-custom_icons font-semibold rounded-lg mb-5 w-full placeholder:font-normal'/>

                                        {type === 'password' ? (
                                            <span
                                                onClick={() => setType('text')}
                                                className='absolute right-4 top-3.5 text-xl cursor-pointer text-custom_icons'>
                                    <FaRegEye/>
                                </span>
                                        ) : (
                                            <span
                                                onClick={() => setType('password')}
                                                className='absolute right-4 top-3.5 text-xl cursor-pointer text-custom_icons'>
                                    <FaRegEyeSlash/>
                                </span>
                                        )}
                                    </div>

                                    {!isLogin && (
                                        <div className='relative'>
                                            <input type={type} placeholder='Repeat Password *'
                                                   onChange={(e) => setRepeatPass(e.target.value)}
                                                   className='input text-custom_icons font-semibold rounded-lg mb-5 w-full placeholder:font-normal'/>

                                            {type === 'password' ? (
                                                <span
                                                    onClick={() => setType('text')}
                                                    className='absolute right-4 top-3.5 text-xl cursor-pointer text-custom_icons'>
                                    <FaRegEye/>
                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => setType('password')}
                                                    className='absolute right-4 top-3.5 text-xl cursor-pointer text-custom_icons'>
                                    <FaRegEyeSlash/>
                                </span>
                                            )}
                                        </div>
                                    )}

                                    {!isLogin && password.length > 0 && (
                                        <PasswordStrengthBar password={password}/>
                                    )}

                                    <button
                                        className='btn btn-orange mt-4 rounded-lg py-3 text-[16px] text-center block '>
                                        {isLogin ? 'Login' : 'Register'}
                                    </button>

                                </form>

                                {/*{!isLogin && isIncorrect && (*/}
                                {/*    <p className='text-custom_red font-semibold text-sm mt-4'>Passwords don`t match!</p>*/}
                                {/*)}*/}

                                {isLogin && (
                                    <div className='flex items-center justify-between pt-2'>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox"
                                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                    Remember me
                                                </label>
                                            </div>

                                        </div>


                                        <p onClick={() => navigate('/forgot')} className='text-end py-3 text-sm cursor-pointer hover:underline'>
                                            Forgot password?
                                        </p>
                                    </div>
                                )}


                                {isLogin ? (
                                    <p className='text-center text-custom_title text-sm font-medium'>
                                        Don't have an account?
                                        <span
                                            onClick={() => setIsLogin(false)}
                                            className="pl-1 text-custom_primary hover:underline cursor-pointer">
                                    Register Now
                                </span>
                                    </p>
                                ) : (
                                    <p className='text-center text-custom_title text-sm font-medium pt-5'>
                                        Already have account?
                                        <span
                                            onClick={() => setIsLogin(true)}
                                            className="pl-1 text-custom_primary hover:underline cursor-pointer">
                                    Please Login
                                </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth;