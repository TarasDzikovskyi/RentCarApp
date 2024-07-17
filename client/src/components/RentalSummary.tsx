import {FC, useEffect, useState} from 'react';
import img from '../assets/nissan_gtr.png';
import StarRating from "./StarRating";

const RentalSummary: FC = ({car, totalPrice, tax}) => {


    const currencyFormat = (num) => {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };


    return (
        <div className='bg-custom_white rounded-lg px-7 py-6'>
            <div className='border-b border-b-custom_borders pb-8'>
                <h2 className='text-lg font-black text-custom_title'>Rental Summary</h2>

                <p className='text-[13px] pb-5 w-[444px]'>
                    Prices may change depending on the length of the rental and the price oy your rental car.
                </p>

                <div className='flex items-center'>
                    <div className='flex items-center h-[108px] w-[132px] bg-custom_primary rounded-lg px-[2px]'>
                        <img src={car.image} alt="img" className='w-full'/>
                    </div>

                    <div className='ml-4'>
                        <h2 className='text-3xl font-bold text-custom_title max-w-[290px] capitalize'>{car.make} {car.model}</h2>
                        <div className='flex items-center'>
                            <StarRating max={5} current={car.reviews_count} className='text-xl'/>

                            <div className='pl-2 pt-[5px] text-[12px] font-medium'>
                                {car.rating} Reviewer
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex justify-between my-5'>
                <span className='text-lg font-medium'>Subtotal</span>
                <span className='text-lg text-custom_title font-bold'>{currencyFormat(car.price)}</span>
            </div>

            <div className='flex justify-between my-5'>
                <span className='text-lg font-medium'>Tax</span>
                <span className='text-lg text-custom_title font-bold'>${tax}</span>
            </div>


            <div className='flex '>
                <input type="text" placeholder='Apply promo code' className='w-3/4 input border-none bg-custom_bg rounded-l-lg py-4 pl-5'/>
                <button className='w-1/4  text-custom_title font-bold bg-custom_bg pr-5 rounded-r-lg'>Apply now</button>
            </div>


            <div className='flex items-center justify-between pt-7'>
                <div>
                    <h3 className='text-custom_title font-black text-lg'>Total Rental Price</h3>
                    <p className='text-sm'>Overall price and includes rental discount</p>
                </div>

                <p className='text-custom_title font-black text-3xl'>{currencyFormat(totalPrice)}</p>
            </div>


        </div>
    );
};

export default RentalSummary;