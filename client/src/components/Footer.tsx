import {FC} from 'react';
import {GrMail} from "react-icons/gr";
import {BsTelephoneFill} from "react-icons/bs";
import {ImLocation, ImLocation2} from "react-icons/im";
import logo from '../assets/logo_white.png';
import {FaCcAmazonPay, FaCcApplePay, FaCcMastercard, FaCcPaypal, FaCcVisa, FaGooglePay} from "react-icons/fa";
import {useLocation } from "react-router-dom";


const Footer: FC = () => {
    let location = useLocation();


    return (
        <>
            {location.pathname === '/auth' ? (<div/>) : (

                <div className='bg-custom_title px-28 pt-10'>
                    <div>
                        <div className='grid grid-cols-4 max-[768px]:grid-cols-1'>
                            <div>
                                <p className='text-custom_white pt-5 pb-7'>
                                    <img src={logo} alt="logo" width={200}/>
                                </p>
                                <p className='flex items-center py-1'>
                                    <ImLocation className='text-custom_primary text-base mr-2'/>
                                    <span className='text-sm'>1313 E Main St, Portage MI 49024-2001.</span>
                                </p>

                                <p className='flex items-center py-1'>
                                    <BsTelephoneFill className='text-custom_primary text-base mr-2'/>
                                    <span className='text-sm'>+212-456-7890</span>
                                </p>

                                <p className='flex items-center py-1'>
                                    <GrMail className='text-custom_primary text-base mr-2'/>
                                    <span className='text-sm'>carent@gmail.com</span>
                                </p>
                            </div>

                            <div>
                                <p className='text-custom_white py-5 max-[768px]:pt-10 max-[768px]:pb-2'>Information</p>
                                <ul className='flex flex-col justify-start text-sm'>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>About Us</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Contact Us</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>FAQ</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Store Location</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Working Hours</span></li>
                                </ul>
                            </div>

                            <div>
                                <p className='text-custom_white py-5 max-[768px]:pt-10 max-[768px]:pb-2'><span className='hover:text-custom_white'>Support</span></p>
                                <ul className='flex flex-col justify-start text-sm'>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Privacy Policy</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Order Return</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Rent Details</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Online Payments</span></li>
                                    <li className='py-1 cursor-pointer'><span className='hover:text-custom_white'>Terms & Conditions</span></li>
                                </ul>
                            </div>

                            <div>
                                <p className='text-base text-custom_white pt-5 max-[768px]:pt-10 '>Subscribe newsletter</p>
                                <p className='pt-2 pb-5 text-xs'>Signup our newsletter to get update information,
                                    news &
                                    insights</p>
                                <div className='flex'>
                                    <input type="email" className='input py-2 rounded-r-none rounded-lg'/>
                                    <button className='btn btn-orange rounded-l-none text-[14px]'>SIGN UP</button>
                                </div>
                            </div>
                        </div>

                        <div className='pt-16 pb-6 flex justify-between max-[768px]:flex-col'>
                            <p className='text-[12px] text-custom_white'>Copyright© 2023 United Parcel Service of America. All Rights
                                Reserved.</p>
                            <div className='flex max-[768px]:pt-3'>
                                <span className='text-xl px-1 text-custom_white'><FaCcVisa/></span>
                                <span className='text-xl px-1 text-custom_white'><FaCcMastercard/></span>
                                <span className='text-xl px-1 text-custom_white'><FaGooglePay/></span>
                                <span className='text-xl px-1 text-custom_white'><FaCcApplePay/></span>
                                <span className='text-xl px-1 text-custom_white'><FaCcPaypal/></span>
                                <span className='text-xl px-1 text-custom_white'><FaCcAmazonPay/></span>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;