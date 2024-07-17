import {FC, useEffect, useState} from 'react';
import {Form, useLoaderData} from "react-router-dom";
import CarBlock from "../components/CarBlock";
import {HiArrowsUpDown} from "react-icons/hi2";
import Search from "../components/Search";
import Ads from "../components/Ads";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import styled from "styled-components";
import TimePicker from "rc-time-picker";
import ScrollButton from "../components/ScrollButton";
import {instance} from "../api/axios.api";
import {IBooking, ICar} from "../types/types";
import {toast} from "react-toastify";
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper";


const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-input {
    border: none;
    font-size: 12px;
    color: #90A3BF;
    width: 126px
  }

  ::placeholder {
    color: #90A3BF
  }
`;


export const carsLoader = async () => {
    const cars = await instance.get<ICar[]>('car');
    const cars_for_ads = await instance.get<ICar[]>('car/ads');
    const booking = await instance.get<IBooking[]>('booking');

    return {
        cars: cars.data,
        cars_for_ads: cars_for_ads.data,
        booking: booking.data
    }
};

export const carAction = async ({request}: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData();
            const newReview = {
                review: formData.get('review'),
                rating: +formData.get('rating'),
                car: +formData.get('car_id'),
            };

            await instance.post('/reviews', newReview, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            });
            toast.success('Review added.');
            return null
        }

        case 'DELETE': {
            const formData = await request.formData();
            const review_id = formData.get('review_id');

            await instance.delete(`/reviews/${review_id}`);
            toast.success('Review deleted.');
            return null
        }
    }
};


const CarList: FC = () => {
    const data = useLoaderData();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [rangeSliderValue, setRangeSliderValue] = useState<number>(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startCity, setStartCity] = useState<string>('');
    const [endCity, setEndCity] = useState<string>('');

    const [cars, setCars] = useState<object>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<boolean>(false);

    const itemsPerPage = 15;
    const [visibleItems, setVisibleItems] = useState<number>(itemsPerPage);

    const [type, setType] = useState<object>({
        sedan: false,
        sport: false,
        coupe: false,
        SUV: false,
        hatchback: false,
        MPV: false
    });
    const [drive, setDrive] = useState<object>({rwd: false, awd: false, fwd: false});
    const [fuel, setFuel] = useState<object>({petrol: false, diesel: false, electricity: false});
    const [transmission, setTransmission] = useState<object>({automatic: false, manual: false});


    useEffect(() => {
        if (data.cars) {
            setCars(data.cars);
            setLoading(false)
        }
    }, [data.cars]);


    useEffect(() => {
        const filterHandler = (filters) => {
            try {
                const applyFilter = (filterType, key) => {
                    if (filterType === 'type') filterType = 'class';
                    if (filterType === 'fuel') filterType = 'fuel_type';
                    return data.cars.cars.filter((car) => car[filterType] === key)
                };

                let filteredCars = [];
                let cars_copy = {...data.cars};

                for (const [filterType, filterValues] of Object.entries(filters)) {
                    for (const [key, value] of Object.entries(filterValues)) {
                        if (value === true) {
                            const filtered = applyFilter(filterType, key);
                            filteredCars = [...new Set([...filtered, ...filteredCars])];
                        }
                    }
                }


                if (filteredCars.length > 0) {
                    cars_copy.cars = filteredCars;
                }

                setCars(filteredCars.length === 0 ? data.cars : cars_copy);
                return filteredCars
            } catch (e) {
                console.log(e);
            }
        };

        const rangeHandler = (cars, range) => {
            let filteredCars = [];
            let cars_copy = {...data.cars};

            if (range > 0) {
                const sourceCars = cars.length > 0 ? cars : cars_copy.cars;

                filteredCars = sourceCars.filter((car) => car.price <= range);
                cars_copy.cars = filteredCars;
                setCars(cars_copy);
            }
        };


        const res = filterHandler({type, fuel, transmission, drive});
        rangeHandler(res, rangeSliderValue);

    }, [type, fuel, transmission, drive, rangeSliderValue]);


    const sortHandler = (cars) => {
        try {
            let copyCars = {...cars};
            let copyCarsArray = [...copyCars.cars];

            if (sort) {
                copyCars.cars = copyCarsArray.sort((a, b) => b.price - a.price);
                setCars(copyCars)
            } else {
                copyCars.cars = copyCarsArray.sort((a, b) => a.price - b.price);
                setCars(copyCars)
            }
        } catch (e) {
            console.log(e)
        }
    };

    // console.log(cars);
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

                <div className='relative'>

                    <div className={isVisible ? "w-[99vw] flex pr-[100px] ml-[calc(-1*(100vw-1180px)/2)]" : ""}>
                        {isVisible && (
                            <div className='h-content w-[290px] bg-custom_white top-[71px] left-0 px-6 py-8 mr-8 '>
                                <div>
                                    <Form>
                                        <div>
                                            <p className='text-custom_gray text-[10px] font-semibold pb-5'>TYPE</p>
                                            {cars.types.map((item, idx) => (
                                                <div key={idx} className="flex items-center mb-4">
                                                    <input id="default-checkbox" type="checkbox" value=""
                                                           onChange={({target: {checked}}) => setType({
                                                               ...type, [item.type]: checked
                                                           })}
                                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                                    <label htmlFor="default-checkbox"
                                                           className="ms-2 text-sm font-medium text-custom_icons capitalize">
                                                        {item.type}
                                                        <span
                                                            className='text-sm text-custom_gray pl-1'>({item.count})</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <p className='text-custom_gray text-[10px] font-semibold pb-5 pt-10'>DRIVE</p>
                                            {cars.drives.map((item, idx) => (
                                                <div key={idx} className="flex items-center mb-4">
                                                    <input id="default-checkbox" type="checkbox" value=""
                                                           onChange={({target: {checked}}) => setDrive({
                                                               ...type,
                                                               [item.drive]: checked
                                                           })}
                                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                                                    <label htmlFor="default-checkbox"
                                                           className="ms-2 text-sm font-medium text-custom_icons uppercase">
                                                        {item.drive}
                                                        <span
                                                            className='text-sm text-custom_gray pl-1'>({item.count})</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <p className='text-custom_gray text-[10px] font-semibold pb-5 pt-10'>TRANSMISSION</p>
                                            {cars.transmissions.map((item, idx) => (
                                                <div key={idx} className="flex items-center mb-4">
                                                    <input id="default-checkbox" type="checkbox" value=""
                                                           onChange={({target: {checked}}) => setTransmission({
                                                               ...type, [item.transmission]: checked
                                                           })}
                                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                                                    <label htmlFor="default-checkbox"
                                                           className="ms-2 text-sm font-medium text-custom_icons capitalize">
                                                        {item.transmission}
                                                        <span
                                                            className='text-sm text-custom_gray pl-1'>({item.count})</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <p className='text-custom_gray text-[10px] font-semibold pb-5 pt-10'>FUEL</p>
                                            {cars.fuels.map((item, idx) => (
                                                <div key={idx} className="flex items-center mb-4">
                                                    <input id="default-checkbox" type="checkbox" value=""
                                                           onChange={({target: {checked}}) => setFuel({
                                                               ...type, [item.fuel]: checked
                                                           })}
                                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                                                    <label htmlFor="default-checkbox"
                                                           className="ms-2 text-sm font-medium text-custom_icons capitalize">
                                                        {item.fuel}
                                                        <span
                                                            className='text-sm text-custom_gray pl-1'>({item.count})</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='w-[250px]'>
                                            <p className='text-custom_gray text-[10px] font-semibold pt-10 pb-5'>PRICE</p>

                                            <input type="range" min="0" max="250" step="10"
                                                   className='w-full'
                                                   value={rangeSliderValue}
                                                   onChange={(e) => setRangeSliderValue(e.target.value)}
                                            />

                                            <div className="flex">
                                                <p className="pl-4 text-center text-md font-semibold text-custom_icons">
                                                    Max ${rangeSliderValue}.00
                                                </p>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )}

                        <div className='w-full'>
                            <div>
                                <Search isVisible={isVisible} setIsVisible={setIsVisible} cars={cars.cars}/>

                                {!isVisible && (
                                    <div className='pt-8'>
                                        <Ads cars={data.cars_for_ads}/>
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col w-full pb-20'>
                                {/*Filter*/}
                                <div className='my-8 flex relative justify-between'>
                                    <div className='rounded-lg bg-custom_white mr-7 px-3'>
                                        <div className='flex items-center pt-2 pl-2'>
                                            <div className='pr-2'>
                                                <span>
                                                    <span className="relative flex h-3 w-3">
                                                        <span
                                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A4393] opacity-75"/>
                                                        <span
                                                            className="relative inline-flex rounded-full h-3 w-3 bg-[#1A4393]"/>
                                                        </span>
                                                </span>
                                            </div>

                                            <p className='text-custom_title font-semibold'>
                                                Pick-Up
                                            </p>
                                        </div>

                                        <Form className='flex items-center my-3 '>
                                            <div>
                                                <label htmlFor="location"
                                                       className="block text-md font-bold text-custom_title px-3">
                                                    Locations
                                                </label>
                                                <select name="location" id=""
                                                        onChange={(e) => setStartCity(e.target.value)}
                                                        className='input py-1 border-none text-xs'>
                                                    <option selected disabled defaultValue="">Select your city</option>
                                                    <option value="lviv">Lviv</option>
                                                    <option value="kyiv">Kyiv</option>
                                                    <option value="kharkiv">Kharkiv</option>
                                                    <option value="odessa">Odessa</option>
                                                </select>
                                            </div>

                                            <div className='border-x border-x-custom_gray/30 px-2 mx-3 py-2'>
                                                <label htmlFor="date"
                                                       className="block text-md font-bold text-custom_title px-3">
                                                    Date
                                                </label>
                                                <DatePicker
                                                    className='input py-1 w-[126px] border-none text-xs placeholder:text-xs '
                                                    minDate={new Date()}
                                                    placeholderText='Select your date'
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}/>
                                            </div>

                                            <div>
                                                <label htmlFor="time"
                                                       className="block text-md font-bold text-custom_title px-3">
                                                    Time
                                                </label>
                                                <StyledTimePicker
                                                    className='w-full'
                                                    placeholder='Select your time'
                                                    defaultValue={moment()}
                                                    showSecond={false}
                                                    minuteStep={10}
                                                    value={startTime}
                                                    onChange={(time) => setStartTime(time)}
                                                />
                                            </div>
                                        </Form>
                                    </div>

                                    <div
                                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                        <button
                                            onClick={() => {
                                                sortHandler(cars);
                                                setSort(!sort);
                                            }}
                                            className='btn btn-orange py-4 shadow-custom_shadow'>
                                            <span className='text-xl'>
                                                <HiArrowsUpDown/>
                                            </span>
                                        </button>
                                    </div>

                                    <div className='rounded-lg bg-custom_white ml-7 px-3'>
                                        <div className='flex items-center pt-2 pl-2'>
                                            <div className='pr-2'>
                                                <span>
                                                <span className="relative flex h-3 w-3">
                                                    <span
                                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D81DB] opacity-75"/>
                                                        <span
                                                            className="relative inline-flex rounded-full h-3 w-3 bg-[#3D81DB]"/>
                                                    </span>
                                                </span>
                                            </div>

                                            <p className='text-custom_title font-semibold'>
                                                Drop-Off
                                            </p>
                                        </div>


                                        <Form className='flex items-center my-3'>
                                            <div>
                                                <label htmlFor="location"
                                                       className="block text-md font-bold text-custom_title px-3">
                                                    Locations
                                                </label>
                                                <select name="location" id=""
                                                        className='input py-1 border-none text-xs'>
                                                    <option selected disabled defaultValue="">Select your city</option>
                                                    <option value="lviv">Lviv</option>
                                                    <option value="kyiv">Kyiv</option>
                                                    <option value="kharkiv">Kharkiv</option>
                                                    <option value="odessa">Odessa</option>
                                                </select>
                                            </div>

                                            <div className='border-x border-x-custom_gray/30 px-2 mx-3 py-2'>
                                                <label htmlFor="date"
                                                       className="block text-md font-bold text-custom_title px-3">
                                                    Date
                                                </label>
                                                <DatePicker
                                                    className='input py-1 w-[126px] border-none text-xs placeholder:text-xs '
                                                    minDate={new Date()}
                                                    placeholderText='Select your date'
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}/>
                                            </div>

                                            <div>
                                                <label htmlFor="time"
                                                       className="block text-md font-bold text-custom_title px-3">
                                                    Time
                                                </label>
                                                <StyledTimePicker
                                                    className='w-full'
                                                    placeholder='Select your time'
                                                    defaultValue={moment()}
                                                    showSecond={false}
                                                    minuteStep={10}
                                                    value={endTime}
                                                    onChange={(time) => setEndTime(time)}
                                                />
                                            </div>
                                        </Form>
                                    </div>
                                </div>

                                {/*List*/}
                                <div className='flex justify-center grid grid-cols-auto_cars gap-8'>
                                    {cars.cars && cars.cars.length > 0 ? (cars.cars.slice(0, visibleItems).map((car, idx) => (
                                        <div key={idx}>
                                            <CarBlock car={car}/>
                                        </div>
                                    ))) : (
                                        <div>No cars</div>
                                    )}
                                </div>

                                <div className='flex items-center justify-center relative mt-20'>
                                    {cars.cars && visibleItems < cars.cars.length && (
                                        <button
                                            onClick={() => setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage)}
                                            className='btn btn-orange w-[140px]  py-3'>
                                            Show more cars
                                        </button>
                                    )}

                                    <span
                                        className='absolute text-custom_gray text-xs right-0'>{data.cars.cars.length} cars</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ScrollButton/>
                </div>
            )}
        </>

    );
};

export default CarList;