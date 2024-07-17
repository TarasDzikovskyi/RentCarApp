import {FC, useEffect, useState} from 'react';
import Reviews from "../components/Reviews";
import {useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import car1 from '../assets/nissan_gtr.png';
import car2 from '../assets/nissan1.jpg';
import car3 from '../assets/nissan2.jpg';
import StarRatings from 'react-star-ratings';
import {instance} from "../api/axios.api";
import {ICar} from "../types/types";
import {
    getCarFromLocalStorage,
    getTokenFromLocalStorage,
    setCarToLocalStorage,
    setTokenToLocalStorage
} from "../helpers/localstorage.helper";
import {useAuth} from "../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {login} from "../store/user/userSlice";
import {toast} from "react-toastify";


interface ICars {
    id: number
    photo?: object
}

const cars: ICars[] = [
    {id: 1, photo: car1},
    {id: 2, photo: car2},
    {id: 3, photo: car3},
];


export const carLoader = async () => {
    const id = window.location.pathname.split('/')[2];
    if (id !== undefined) {
        const reviews = await instance.get<ICar>(`reviews/${id}`);
        return {
            reviews: reviews.data
        }
    } else return null
};


const CarItem: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [image, setImage] = useState<object>({});
    const [car, setCar] = useState<object>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [reviewsCount, setReviewsCount] = useState<number>(0);

    const isAuth = useAuth();
    const {user} = useAppSelector(state => state.user);

    const getCar = async () => {
        try {
            const id = location.pathname.split('/')[2];
            const {data} = await instance.get<ICar>(`car/${id}`);

            if (data) {
                setImage({id: 1, photo: data.image});
                setCar(data);
                cars[0].photo = data.image;
            } else return setLoading(true);

            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    };

    const getFavourite = () => {
        if (user !== null) {
            const id = location.pathname.split('/')[2];

            user.favorites.forEach(item => {
                if (item.id === +id)
                    setIsFavourite(true)
            })
        }
    };

    useEffect(() => {
        getCar();

        getFavourite()
    }, []);


    const handleClick = () => {
        car['reviews_count'] = reviewsCount;
        car['rating'] = totalCount;

        const {createdAt, updatedAt, ...filteredCar} = car;

        setCarToLocalStorage('car', filteredCar);
        navigate(`/booking/${car.id}`);
    };


    const toggleFavourite = async () => {
        const {data} = await instance.patch(`user/${car.id}/favorite`, {}, {
            headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage()}`
            }
        });
        if (data) dispatch(login(data));

        getFavourite()
    };

    return (
        <>
            {loading ? (
                <div className='h-[80vh] w-full flex items-center justify-center'>
                    <div
                        className="animate-spin inline-block w-20 h-20 border-[6px] border-current border-t-transparent text-custom_primary rounded-full"
                        role="status" aria-label="loading">
                    </div>
                </div>
            ) : (
                <div className='flex flex-col'>
                    <div className='flex justify-between py-10 px-14'>
                        <div className='w-[506px] rounded-md flex flex-col justify-between'>
                            <div className='h-[310px] overflow-hidden rounded-md bg-custom_primary flex items-center'>
                                <img src={image.photo} alt="img" width={506} className='rounded-md'/>
                            </div>

                            <div className='flex items-center justify-between'>
                                {cars.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setImage(item)}
                                        className='rounded-md w-[146px] bg-custom_primary h-[97px] flex items-center cursor-pointer'>
                                        <img src={item.photo} alt="img" width={146} className='rounded-md'/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col p-8 bg-custom_white rounded-md'>
                            <div className='flex justify-between'>
                                <div>
                                    <h2 className='text-[32px] font-bold text-custom_title capitalize'>{car.make} {car.model}</h2>
                                    <div className='flex items-center'>
                                        <StarRatings
                                            rating={totalCount}
                                            starRatedColor="#FBAD39"
                                            starDimension="17px"
                                            starSpacing="0"
                                        />

                                        <div
                                            className='pl-2 pt-[6px] text-[10px] font-semibold'>{reviewsCount} Reviewers
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {isAuth ? user.favorites.length >= 0 && (
                                        user.favorites.find((favorite_car) => favorite_car.id === car.id) ? (
                                            <div className='text-2xl text-custom_text cursor-pointer z-10 transform active:scale-75 transition-transform'
                                                 onClick={() => toggleFavourite()}>
                                                <AiFillHeart className='text-custom_red'/>
                                            </div>

                                        ) : (
                                            <div className='text-2xl text-custom_text cursor-pointer z-10 transform active:scale-75 transition-transform'
                                                 onClick={() => toggleFavourite()}>
                                                <AiOutlineHeart/>
                                            </div>
                                        )
                                    ) : <div/>}


                                    {/*{isAuth ? (*/}
                                    {/*    <div className='text-2xl text-custom_text cursor-pointer z-10'*/}
                                    {/*         onClick={() => toggleFavourite()}>*/}
                                    {/*        {isFavourite ? (<AiFillHeart className='text-custom_red'/>) :*/}
                                    {/*            <AiOutlineHeart/>}*/}
                                    {/*    </div>*/}
                                    {/*) : (<div/>)}*/}

                                </div>
                            </div>


                            <p className='text-custom_icons w-[440px] pt-8 leading-8 text-justify font-medium'>
                                NISMO has become the embodiment of Nissan's outstanding performance, inspired by
                                the most unforgiving proving ground, the "race track".
                            </p>

                            <div className='flex justify-between py-10'>
                                <div className=' w-[45%]'>
                                    <div className='flex justify-between items-center'>
                                        <span>Type Car</span>
                                        <span className='text-custom_icons font-bold capitalize'>{car.class}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span>Steering</span>
                                        <span
                                            className='text-custom_icons font-bold capitalize'>{car.transmission}</span>
                                    </div>
                                </div>

                                <div className=' w-[45%]'>
                                    <div className='flex justify-between items-center'>
                                        <span>Capacity</span>
                                        <span className='text-custom_icons font-bold'>{car.capacity} Person</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span>Gasoline</span>
                                        <span className='text-custom_icons font-bold'>70L</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div>
                                    <span className='font-black text-xl text-custom_title'>${car.price}/</span>
                                    <span className='text-custom_text font-semibold'>day</span>
                                </div>

                                <button
                                    onClick={() => handleClick()}
                                    className='btn btn-orange py-3 z-10'>Rent Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <Reviews car_id={car.id} setTotalCount={setTotalCount} setReviewsCount={setReviewsCount}/>
                </div>
            )}
        </>

    );
};

export default CarItem;