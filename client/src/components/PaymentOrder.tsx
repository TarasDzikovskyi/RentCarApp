import {FC} from 'react';
import {MdClose} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";
import img from "../assets/nissan_gtr.png";
import moment from 'moment';


const PaymentOrder: FC = ({car, setShow, totalPrice, startDate, endDate, startTime, endTime, startPrice}) => {

    const startDateTime = `${moment(startDate).format('DD-MM-YYYY')} ${moment(startTime).format('HH:mm')}`;
    const endDateTime = `${moment(endDate).format('DD-MM-YYYY')} ${moment(endTime).format('HH:mm')}`;

    return (
        <div
            className='absolute  left-0 w-full h-full z-50 backdrop-blur-xl backdrop-opacity-100 flex justify-center pt-10'>

            <div className='bg-white w-[610px] h-fit shadow-md px-8 py-10 rounded-md relative'>

                <div className='text-2xl cursor-pointer w-6 absolute right-4 top-4'
                     onClick={() => setShow(false)}>
                    <MdClose/>
                </div>


                <div className='text-[#10b981] text-4xl flex justify-center'>
                    <FaCheckCircle/>
                </div>


                <div className='flex flex-col items-center '>
                    <h2 className='text-2xl font-bold text-custom_title pt-6 pb-2'>We received your
                        order!</h2>
                    <p className='text-[15px] text-custom_icons'>Your order #2939993 is completed and
                        car ready to go</p>
                </div>


                <div className=' border-b-[1px] pt-8'/>


                <div className='flex justify-center pt-8'>
                    <div className='w-1/2'>
                        <p className='uppercase text-[13px] font-bold'>shipping address</p>

                        <p className='text-custom_title text-[15px] font-medium pt-3  pb-2'>
                            Wilson Baker
                        </p>
                        <p className='text-custom_title text-[15px] font-medium py-1'>
                            4517 Washington Ave. Manchester,
                        </p>
                        <p className='text-custom_title text-[15px] font-medium '>
                            Kentucky 39495, USA
                        </p>
                    </div>


                    <div className='w-1/2 pl-5'>
                        <p className='uppercase text-[13px] font-bold'>payment info</p>

                        <p className='text-custom_title text-[15px] font-medium pt-3 pb-2'>
                            Credit Card
                        </p>
                        <p className='text-custom_title text-[15px] font-medium py-1'>
                            VISA
                        </p>
                        <p className='text-custom_title text-[15px] font-medium '>
                            **** 4660
                        </p>
                    </div>
                </div>

                <div className=' border-b-[1px] pt-8'/>

                <div className='flex flex-col pt-8'>
                    <p className='uppercase text-[13px] font-bold pb-3'>order item</p>

                    <div className='flex '>
                        <div
                            className='flex items-center h-[96px] w-[120px] bg-custom_bg rounded-lg px-1'>
                            <img src={car.image} alt="img" className='w-full'/>
                        </div>

                        <div className='flex justify-between w-[75%]'>
                            <div className='flex flex-col justify-between py-3 pl-3'>
                                <p className='capitalize text-custom_title font-bold'>{car.make} {car.model}</p>
                                <p className='capitalize text-custom_icons font-medium'>{car.class}</p>
                            </div>

                            <div className='flex flex-col justify-between py-3 pl-3 text-end'>
                                <p className='capitalize text-custom_title font-bold'>{startDateTime}</p>
                                <p className='text-custom_icons font-small'>${startPrice} per day</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' border-b-[1px] pt-8'/>

                <div className='flex justify-between text-custom_title pt-8'>
                    <p>Total</p>

                    <p className='font-bold'>${totalPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentOrder;