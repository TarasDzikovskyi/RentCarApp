import {FC, useState} from 'react';
import main from '../assets/main.png'
import {FaFacebookF, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa";
import {Form, Link} from "react-router-dom";
import about_img from '../assets/about.png';
import RentalForm from "../components/RentalForm";
import CarBlock from "../components/CarBlock";
import CarouselModel from "../components/CarouselModel";
import ScrollButton from "../components/ScrollButton";
import {MdEventRepeat, MdOutlineGpsFixed} from "react-icons/md";
import {GiAchievement} from "react-icons/gi";
import CountUp from 'react-countup';
import contact from '../assets/contact.png';
import ClientReviewBlock from "../components/ClientReviewBlock";
import ScrollTrigger from "react-scroll-trigger";


const Home: FC = () => {
    const [counterOn, setCounterOn] = useState<boolean>(false);

    return (
        <>
            {/*Title block*/}
            <div className='h-[47vw]'>
                {/*Black box*/}
                <div className='bg-custom_title w-5/12 absolute h-[52vw] max-[768px]:h-[70vw] top-0 left-0'/>

                {/*Main img*/}
                <div><img src={main} alt="img" className='absolute right-0 w-8/12 max-[768px]:top-[100px]'/></div>

                {/*Blur*/}
                <div
                    className='top-[10vw] absolute w-[570px] left-[200px] h-fit bg-cover bg-center rounded-md backdrop-blur-sm text-custom_white2
                     max-[768px]:w-[350px] max-[768px]:left-[55px] max-[768px]:top-[30vw]'>
                    <div className='w-[520px] left-[150px] '>
                        <h1 className='text-[55px] font-black p-0 m-0 max-[768px]:text-[25px] max-[768px]:w-[280px]'>
                            Enjoy your life with our comfortable cars.
                        </h1>
                        <p className='text-[25px] py-3 max-[768px]:text-[17px] max-[768px]:w-[250px]'>
                            Carent, is ready to serve the best experience in car rental.
                        </p>
                        <button className='mt-10 btn btn-orange text-[20px] px-12 py-4 mb-5 max-[768px]:px-6 max-[768px]:py-2 max-[768px]:text-[15px] max-[768px]:mt-6'>
                            Explore Now
                        </button>
                    </div>
                </div>

                {/*Social*/}
                <div className='absolute left-[70px] top-[17vw] max-[768px]:left-[25px] max-[768px]:top-[20vw]'>

                    <div className="relative flex-col items-center justify-center w-5">
                        <div
                            className="after:block after:bg-custom_primary after:w-[1px] after:h-10 after:mx-auto after:my-2 w-5 max-[768px]:after:h-5"/>

                        <div className='flex flex-col items-center'>
                            <div className="text-gray-400 text-xl py-1 max-[768px]:text-sm"><Link to='#'><FaFacebookF
                                className='text-custom_primary hover:text-[#FFFFFF]'/></Link></div>
                            <div className="text-gray-400 text-xl py-1 max-[768px]:text-sm"><Link to='#'><FaInstagram
                                className='text-custom_primary hover:text-[#FFFFFF]'/></Link></div>
                            <div className="text-gray-400 text-xl py-1 max-[768px]:text-sm"><Link to='#'><FaTwitter
                                className='text-custom_primary hover:text-[#FFFFFF]'/></Link></div>
                            <div className="text-gray-400 text-xl py-1 max-[768px]:text-sm"><Link to='#'><FaWhatsapp
                                className='text-custom_primary hover:text-[#FFFFFF]'/></Link></div>
                            <div className="text-gray-400 text-xl py-1 max-[768px]:text-sm"><Link to='#'><FaTelegramPlane
                                className='text-custom_primary hover:text-[#FFFFFF]'/></Link></div>
                        </div>

                        <div
                            className="after:block after:bg-custom_primary after:w-[1px] after:h-10 after:mx-auto after:my-2 w-5 max-[768px]:after:h-5"/>
                    </div>
                </div>
            </div>


            {/*About block*/}
            <div className='flex flex-col items-center mt-10 max-[768px]:mt-[200px] '>
                <h2 className='border-b-2 border-b-custom_primary text-3xl text-custom_title pb-1 font-semibold'>About
                    Us</h2>

                <div className='w-[1120px] min-[769px]:flex items-center justify-around pt-10 '>
                    <div>
                        <img src={about_img} alt="img" width={500}/>
                    </div>
                    <div className='w-[500px] text-lg leading-9'>
                        We are a specialized team committed to providing reliable car rental services.
                        One of the advantages of renting a car from us is offering competitive and transparent prices.
                        By providing services such as comprehensive insurance ...
                        <div className='text-custom_primary cursor-pointer text-sm pt-4'>Read More</div>
                    </div>
                </div>
            </div>

            {/*Book block*/}
            <div className='flex flex-col items-center mt-20'>
                <h2 className='border-b-2 border-b-custom_primary text-3xl text-custom_title pb-1 font-semibold'>Rent
                    Now</h2>

                <div className='w-full pt-10'>
                    <div className='absolute bg-custom_tint w-full h-[308px] left-0'/>
                    <RentalForm/>
                </div>
            </div>

            {/*Popular Cars*/}
            <div className='flex flex-col items-center mt-20'>
                <h2 className='border-b-2 border-b-custom_primary text-3xl text-custom_title pb-1 font-semibold'>Our
                    Popular
                    Cars</h2>

                <div className='pt-10 w-full'>
                    <CarouselModel/>
                </div>
            </div>


            {/*Services*/}
            <div className='flex flex-col items-center mt-20 '>
                <div className='absolute bg-custom_title w-full h-[350px]'/>
                <h2 className='border-b-2 border-b-custom_primary text-3xl text-custom_white pb-1 font-lg z-10 py-14'>Our
                    Premium Services</h2>

                <p className='z-10 py-7 text-custom_white max-w-[390px] text-center'>
                    Carent is a reputable car rental company that offers a wide range of useful services for every taste
                </p>

                <div className='z-10 grid grid-cols-3 gap-14'>
                    <div
                        className='flex flex-col items-center justify-center bg-custom_white py-14 px-7 rounded-sm shadow-md'>
                        <div className='text-5xl text-custom_primary'>
                            <MdEventRepeat/>
                        </div>
                        <p className='py-4 text-xl font-medium text-custom_title'>24 Hours Support</p>
                        <p className='max-w-[130px] text-center text-[13px]'>We support you all hours of the day</p>
                    </div>

                    <div
                        className='flex flex-col items-center justify-center bg-custom_white py-14 px-7 rounded-sm shadow-md'>
                        <div className='text-5xl text-custom_primary'>
                            <GiAchievement/>
                        </div>
                        <p className='py-4 text-xl font-medium text-custom_title'>Qualified Assurance</p>
                        <p className='max-w-[100px] text-center text-[13px]'>All cars have a valid insurance</p>
                    </div>

                    <div
                        className='flex flex-col items-center justify-center bg-custom_white py-14 px-7 rounded-sm shadow-md'>
                        <div className='text-5xl text-custom_primary'>
                            <MdOutlineGpsFixed/>
                        </div>
                        <p className='py-4 text-xl font-medium text-custom_title'>GPS on Cars</p>
                        <p className='max-w-[160px] text-center text-[13px]'>All cars are equipped with GPS navigation
                            system</p>
                    </div>
                </div>
            </div>


            {/*Clients Reviews*/}
            <div className='flex flex-col items-center my-20 '>
                <h2 className='border-b-2 border-b-custom_primary text-3xl text-custom_title pb-1 font-semibold z-10 py-14'>
                    What Our Clients Say?
                </h2>

                <div className='grid grid-cols-2 gap-10'>
                    <ClientReviewBlock/>
                    <ClientReviewBlock/>
                </div>
            </div>


            {/*Numbers*/}
            <div className='flex items-center justify-center'>
                <div className='absolute bg-custom_tint w-full h-[200px] left-0'/>
                <ScrollTrigger
                    className='grid grid-cols-3 w-3/4 z-10'
                    onEnter={() => setCounterOn(true)}
                    onExit={() => setCounterOn(false)}
                >
                    <div>
                        <p className='text-3xl font-semibold text-custom_title text-center pb-3'>
                            {counterOn && <CountUp end={450} suffix='+'/>}
                        </p>
                        <p className='text-custom_icons text-lg font-medium text-center'>Cars For Rent</p>
                    </div>

                    <div>
                        <p className='text-3xl font-semibold text-custom_title text-center pb-3'>
                            {counterOn && <CountUp end={800} suffix='+'/>}
                        </p>
                        <p className='text-custom_icons text-lg font-medium text-center'>Happy Clients</p>
                    </div>

                    <div>
                        <p className='text-3xl font-semibold text-custom_title text-center pb-3'>
                            {counterOn && <CountUp end={750} suffix='+'/>}
                        </p>
                        <p className='text-custom_icons text-lg font-medium text-center'>Rental Locations</p>
                    </div>
                </ScrollTrigger>
            </div>

            {/*Contact Us*/}
            <div className='flex flex-col items-center mt-20 mb-[200px]'>
                <h2 className='border-b-2 border-b-custom_primary text-3xl text-custom_title pb-1 font-semibold z-10 py-14'>
                    Contact Us
                </h2>

                <div className='z-10 px-14 bg-custom_white2 flex items-center justify-evenly py-8 mt-14 '>
                    <div className='pr-16'>
                        <Form className='flex flex-col items-center justify-center w-[320px]'>
                            <input
                                className='input w-full'
                                type="text" name='name' placeholder='Your Name*' required/>

                            <input
                                className='input w-full my-4'
                                type="email" name='name' placeholder='Your Email*' required/>

                            <textarea className="resize rounded-md input w-full h-[120px]" placeholder='Your Message*'/>
                        </Form>
                        <button className='btn btn-orange py-3 px-5 mt-5'>Send A Message</button>
                    </div>

                    <div>
                        <img src={contact} width={450} alt="img"/>
                    </div>
                </div>
                <div className='absolute bg-custom_title w-full h-[350px] left-0 bottom-[300px]'/>
            </div>


            <ScrollButton/>

        </>
    )
};

export default Home;