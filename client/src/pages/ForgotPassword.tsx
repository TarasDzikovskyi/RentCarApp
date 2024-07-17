import {FC, useEffect, useState} from 'react';
import img from '../assets/forgot.jpg';
import {GoDotFill} from "react-icons/go";
import {AuthService} from "../services/auth.service";
import {toast} from "react-toastify";
import { useNavigate} from "react-router-dom";


const ForgotPassword: FC = ({}) => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();



    const handleClick = async () => {
        const data = await AuthService.refreshPassword({email});
        console.log(data)
        if (data) {
            toast.success('Letter has been sent. Check Email');
        }
    };


    return (
        <div className='w-full h-screen flex justify-start'>

            <div className='w-1/2 center-flex flex-col '>

                <div className='blur-bg py-10 px-6 center-flex flex-col'>
                    <p className='text-white font-bold text-[40px] '>Forgot your password?</p>
                    <p className='text-white font-medium text-[13px] pb-8'>Write email and we send you next step to recovery password</p>


                    <div className="relative z-0 h-[60px] ">
                        <input type="email" placeholder=" "
                               className="normal-case text-white top-0 left-0 block py-2 px-0 w-[350px] bg-transparent border-0 border-b border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                               value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="email"
                               className="absolute text-[24px] text-white duration-300 transform -translate-y-6 scale-50 top-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            Email
                        </label>
                    </div>

                    <div className='flex gap-[30px]'>
                        <button onClick={() => navigate('/auth')} className='btn btn-red'>Return</button>

                        <button onClick={handleClick} className='btn btn-orange'>Click</button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;