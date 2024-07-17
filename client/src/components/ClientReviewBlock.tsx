import {FC} from 'react';
import avatar from "../assets/avatar.png";


const ClientReviewBlock: FC = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-custom_white px-10 py-8 w-[450px] rounded-md mt-14 mb-20'>
            
            <div className='w-24 h-24'>
                <img src={avatar} alt="img" className='rounded-full'/>
            </div>

            <p className='text-xl font-semibold pt-5 pb-3 text-custom_title'>Name Surname</p>

            <p className='text-center'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At debitis dolorem, doloremque ea harum
                impedit necessitatibus officia omnis porro quas, quasi quibusdam rem! Delectus
                eveniet excepturi perspiciatis sit, vel voluptas!
            </p>

        </div>
    );
};

export default ClientReviewBlock;