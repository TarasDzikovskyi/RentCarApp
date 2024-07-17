import {FC} from 'react';
import ads1 from '../assets/jaguar.png';
import ads2 from '../assets/nissan_gtr.png';
import {useNavigate} from "react-router-dom";

const Ads: FC = ({cars}) => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between'>

            <div className='bg-[#54A6FF] px-8 py-4 rounded-xl'>
                <div className='text-custom_white w-[320px]'>
                    <h2 className='font-semibold text-[32px]'>
                        The Best Platform for Car Rental
                    </h2>

                    <p className='text-md py-4'>
                        Ease of doing a car rental safety and reliably. Of course at a low price.
                    </p>
                    <button
                        onClick={() => navigate(`${cars[0].car_id}`)}
                        className='btn bg-[#3563E9] py-3 px-6 text-[17px] font-lg'>
                        Rental Car
                    </button>
                </div>

                <div className='pr-10 pl-28 h-[140px] flex items-end'>
                    <img src={cars[0].image} alt="ads" width={350}/>
                </div>
            </div>


            <div className='bg-[#3563E9] px-8 py-4 rounded-xl'>
                <div className='text-custom_white w-[320px]'>
                    <h2 className='font-semibold text-[32px]'>
                        Easy way to rent a car at a low price
                    </h2>

                    <p className='text-md py-4'>
                        Providing cheap car rental services and safe and comfortable facilities.
                    </p>
                    <button
                        onClick={() => navigate(`${cars[1].car_id}`)}
                        className='btn bg-[#54A6FF] py-3 px-6 text-[17px] font-lg'>
                        Rental Car
                    </button>
                </div>

                <div className='pr-10 pl-28 h-[140px]  flex items-end'>
                    <img src={cars[1].image} alt="ads" width={350}/>
                </div>
            </div>
        </div>
    );
};

export default Ads;

// #54A6FF

// #3563E9