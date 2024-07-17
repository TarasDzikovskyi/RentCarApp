import {FC, useEffect} from 'react';
import {BiSolidGasPump} from "react-icons/bi";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {MdPeopleAlt} from "react-icons/md";
import {GiCarWheel} from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import {ICar} from "../types/types";
import {instance} from "../api/axios.api";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {login} from '../store/user/userSlice';
import {useAuth} from "../hooks/useAuth";
import {toast} from "react-toastify";
import {getTokenFromLocalStorage, setCarToLocalStorage} from "../helpers/localstorage.helper";
import rwd from "../assets/rwd.png";
import awd from '../assets/awd.png';
import fwd from '../assets/fwd.png';
import jwt from 'jsonwebtoken';


interface ICarObject {
    car: ICar
}

const CarBlock: FC<ICarObject> = ({car}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAuth();
    const {user} = useAppSelector(state => state.user);

    const toggleFavoriteHandler = async () => {
        if(isAuth) {
            const {data} = await instance.patch(`user/${car.id}/favorite`, {}, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            });
            if (data) dispatch(login(data));
        } else toast.error('Login first!')
    };


    const handleClick = () => {

        navigate(`/cars/${car.id}`)
    };

    return (
        <>
            {car && (
                <div
                    className='flex flex-col p-5 rounded-lg inline bg-custom_white2 text-custom_title'>
                    <div className='flex items-top justify-between'>
                        <div>
                            <p className='text-xl h-10 font-extrabold capitalize leading-none'>{car.make} {car.model}</p>
                            <span className='text-[12px] text-custom_text capitalize font-black'>{car.class}</span>
                        </div>
                        <div className='text-2xl text-custom_text cursor-pointer transform active:scale-75 transition-transform'
                             onClick={() => toggleFavoriteHandler()}>

                            {isAuth ? user.favorites.length >= 0 && (
                                user.favorites.find((favorite_car) => favorite_car.id === car.id) ? (
                                    <AiFillHeart className='text-custom_red'/>
                                ) : (
                                    <AiOutlineHeart/>
                                )
                            ) : (
                                <div>
                                    <AiOutlineHeart/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='mt-3 mb-7 h-[95px] flex items-end'>
                        <div>
                            <img src={car.image} alt="img" width={320}/>
                        </div>
                    </div>

                    <div>
                        <div className='flex text-custom_text justify-between mb-5'>
                            {/*<p className='flex justify-center text-base items-center'><MdPeopleAlt/><span*/}
                            {/*    className='pl-1 font-semibold'>{car.capacity}</span></p>*/}
                            <p className='flex justify-center text-base items-center'><BiSolidGasPump/><span
                                lassName='pl-1 font-semibold capitalize'>{car.fuel_type}</span></p>
                            {car.drive === 'awd' && (
                                <p className='flex justify-center text-base items-center'>
                                    <img src={awd} alt="awd" width={18}/>
                                    <span className='pl-1 font-medium '>{car.drive}</span>
                                </p>
                            )}

                            {car.drive === 'rwd' && (
                                <p className='flex justify-center text-base items-center'>
                                    <img src={rwd} alt="rwd" width={18}/>
                                    <span className='pl-1 font-medium '>{car.drive}</span>
                                </p>
                            )}

                            {car.drive === 'fwd' && (
                                <p className='flex justify-center text-base items-center'>
                                    <img src={fwd} alt="fwd" width={18}/>
                                    <span className='pl-1 font-medium '>{car.drive}</span>
                                </p>
                            )}
                            <p className='flex justify-center text-base items-center'><GiCarWheel/><span
                                className='pl-1 font-semibold capitalize'>{car.transmission}</span></p>


                        </div>

                        <div className='flex justify-between items-center'>
                            <div>
                                <span className='font-black text-xl'>${car.price}/</span>
                                <span className='text-custom_text font-semibold'>day</span>
                            </div>

                            <button
                                onClick={() => handleClick()}
                                className='btn btn-orange py-3 z-10'>Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarBlock;