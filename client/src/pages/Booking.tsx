import {FC, useEffect, useState} from 'react';
import {Form} from "react-router-dom";
import bitcoin from '../assets/bitcoin.png';
import visa from '../assets/visa.png';
import paypal from '../assets/paypal.png';
import safety from '../assets/safety.png';
import RentalSummary from "../components/RentalSummary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import styled from "styled-components";
import {instance} from "../api/axios.api";
import {ICar} from "../types/types";
import {getCarFromLocalStorage} from "../helpers/localstorage.helper";
import {MdClose} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";
import img from "../assets/nissan_gtr.png";
import PaymentOrder from "../components/PaymentOrder";


const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-input {
    background-color: #F6F7F9;
    border: none;
    padding: 26px 16px ;
    font-size: 14px;
    width: 100%;
    border-radius: 8px
  }
  
  ::placeholder {
  color: #90A3BF
  }
  
  & .rc-time-picker-clear {
    right: 10px;
    top: 13px;
  }
  
  & .rc-time-picker-clear-icon:after {
    color: #596780;
    font-size: 14px
 }
`;


export const rentAction = async ({request}: any) => {
    switch (request.method) {
        case 'POST': {

            const formData = await request.formData();
            const newRent = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),

                start_city: formData.get('start_city'),
                start_date: formData.get('start_date'),
                start_time: formData.get('start_time'),

                end_city: formData.get('end_city'),
                end_date: formData.get('end_date'),
                end_time: formData.get('end_time'),

                card_number: formData.get('card_number'),
                card_date: formData.get('card_date'),
                card_holder: formData.get('card_holder'),
                cvv: +formData.get('cvv'),
                paypal_number: formData.get('paypal_number'),
                bitcoin_address: formData.get('bitcoin_address'),
            };

            console.log(newRent);

            return null
        }

    }
};


const Booking: FC = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('credit_card');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [car, setCar] = useState<object>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [tax, setTax] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [show, setShow] = useState(false);


    const getCar = () => {
        try {
            // const id = location.pathname.split('/')[2];
            // const {data} = await instance.get<ICar>(`car/${id}`);
            const data = getCarFromLocalStorage();

            if (data) {
                setCar(data);
            } else return setLoading(true);

            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getCar()
    }, []);

    useEffect(() => {
        function calculatePrice(startDate, endDate, startTime, endTime, startPrice) {
            const cumulativePrices = [];
            let currentDate = new Date(startDate);
            let totalCount = 0;
            let totalTax = 0;
            let totalHours = 0;

            const isWeekend = (date) => date.getDay() % 6 === 0;

            while (currentDate <= new Date(endDate)) {
                const currentDateStr = currentDate.toISOString().split('T')[0];
                const isWeekendDay = isWeekend(currentDate);

                let price = startPrice;
                let durationInHours = 24;

                if (isWeekendDay) {
                    price = Math.round(startPrice * 1.1);
                }

                if (currentDate.toISOString().split('T')[0] === startDate) {
                    const startDateTime = new Date(`${startDate}T${startTime}`);
                    const midnightDateTime = new Date(`${startDate}T24:00:00`);

                    if (startDateTime < midnightDateTime) {
                        durationInHours = Math.max(1, (midnightDateTime - startDateTime) / (60 * 60 * 1000));
                    }
                } else if (currentDate.toISOString().split('T')[0] === endDate) {
                    const endDateTime = new Date(`${endDate}T${endTime}`);
                    const midnightDateTime = new Date(`${endDate}T00:00:00`);

                    if (endDateTime > midnightDateTime) {
                        durationInHours = Math.max(1, (endDateTime - midnightDateTime) / (60 * 60 * 1000));
                    }
                }

                cumulativePrices.push({date: currentDateStr, price, durationInHours});
                currentDate.setDate(currentDate.getDate() + 1);
            }

            cumulativePrices.forEach(item => {
                totalCount += item.price;
                totalHours += item.durationInHours;
                if (item.price !== startPrice) totalTax += (item.price - startPrice);
            });


            let fullDays = Number.isInteger(totalHours / 24) ? Math.floor(totalHours / 24) : Math.floor(totalHours / 24) + 1;
            fullDays === 0 ? totalCount = startPrice : totalCount = startPrice * fullDays + totalTax;

            setTax(totalTax);
            setTotalPrice(totalCount);
        }

        if (startDate !== null || endDate !== null || car !== null)
            calculatePrice(
                moment(startDate).format('YYYY-MM-DD'),
                moment(endDate).format('YYYY-MM-DD'),
                moment(startTime).format('HH:mm'),
                moment(endTime).format('HH:mm'),
                car.price
            );

    }, [startDate, endDate, startTime, endTime, car]);


    const handelSubmit = () => {

        setShow(true)
    };

    const formatCardNumber = (e) => {
        const inputVal = e.target.value.replace(/ /g, "");
        let inputNumbersOnly = inputVal.replace(/\D/g, "");

        if (inputNumbersOnly.length > 16) {
            inputNumbersOnly = inputNumbersOnly.substr(0, 16);
        }

        const splits = inputNumbersOnly.match(/.{1,4}/g);

        let spacedNumber = "";
        if (splits) {
            spacedNumber = splits.join("  ");
        }

        setCardNumber(spacedNumber);
    };

    return (
        <>
            {loading ? (
                <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                    <div
                        className="animate-spin inline-block w-20 h-20 border-[6px] border-current border-t-transparent text-custom_primary rounded-full"
                        role="status" aria-label="loading">
                    </div>
                    <h1 className='pt-2 text-xl font-semibold '>Select a car first!</h1>
                </div>
            ) : (
                <div className=''>
                    {show && (
                        <PaymentOrder car={car} setShow={setShow} totalPrice={totalPrice} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} startPrice={car.price}/>
                    )}


                    <div className='flex justify-between pt-8 '>
                        <Form
                            method='post'
                        >
                            {/*STEP 1*/}
                            <div className='bg-custom_white p-6 rounded-lg mb-8'>
                                <h2 className='text-lg font-black text-custom_title'>Billing Info</h2>

                                <div className='flex justify-between text-[13px] pb-5 text-custom_borders'>
                                    <p>Please enter your billing info</p>
                                    <p className='text-xs'>Step 1 of 4</p>
                                </div>

                                <div className="grid gap-6 mb-6 grid-cols-2">
                                    <div>
                                        <label htmlFor="name"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Name
                                        </label>
                                        <input type="text" id="name" name='name'
                                               className="bg-custom_bg text-custom_icons text-sm rounded-lg font-semibold placeholder:font-normal block w-full p-4"
                                               placeholder="Your name" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="phone"
                                               className="block mb-2 text-sm font-bold text-custom_title">
                                            Phone number
                                        </label>
                                        <input type="tel" id="phone" name='phone'
                                               className="bg-custom_bg text-custom_icons text-sm rounded-lg font-semibold placeholder:font-normal block w-full p-4"
                                               placeholder="Phone number" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="address"
                                               className="block mb-2 text-sm font-bold text-custom_title">
                                            Address
                                        </label>
                                        <input type="text" id="address" name='address'
                                               className="bg-custom_bg text-custom_icons text-sm rounded-lg font-semibold placeholder:font-normal block w-full p-4 "
                                               placeholder="Address" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="city"
                                               className="block mb-2 text-sm font-bold text-custom_title">
                                            Town/City
                                        </label>
                                        <input type="text" id="city" name='city'
                                               className="bg-custom_bg text-custom_icons text-sm rounded-lg font-semibold placeholder:font-normal block w-full p-4"
                                               placeholder="Town or city" required/>
                                    </div>

                                </div>
                            </div>


                            {/*STEP 2*/}
                            <div className='bg-custom_white p-6 rounded-lg mb-8'>
                                <h2 className='text-lg font-black text-custom_title'>Rental Info</h2>

                                <div className='flex justify-between text-[13px] pb-5 text-custom_borders'>
                                    <p>Please select your rental date</p>
                                    <p className='text-xs'>Step 2 of 4</p>
                                </div>

                                <div className='flex items-center pb-3'>
                                    <div className='pr-3'>
                                <span>
                                    <span className="relative flex h-3 w-3">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A4393] opacity-75"/>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1A4393]"/>
                                    </span>
                                </span>
                                    </div>

                                    <p className='text-custom_title font-semibold'>Pick-Up</p>
                                </div>

                                <div className="grid gap-6 mb-6 grid-cols-2">
                                    <div>
                                        <label htmlFor="location"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Location
                                        </label>
                                        <select id="location" name='start_city' required
                                                className="bg-custom_bg text-sm text-custom_text rounded-lg font-normal block w-full p-4 ">
                                            <option selected disabled value="">Select your city</option>
                                            <option value="lviv">Lviv</option>
                                            <option value="kyiv">Kyiv</option>
                                            <option value="kharkiv">Kharkiv</option>
                                            <option value="odessa">Odessa</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="date"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Date
                                        </label>
                                        <div className="w-full">
                                            <DatePicker
                                                wrapperClassName='block'
                                                className='bg-custom_bg text-custom_icons text-sm rounded-lg font-normal block w-full p-4 placeholder:text-custom_text'
                                                minDate={new Date()}
                                                selected={startDate}
                                                placeholderText="Select your date"
                                                name='start_date'
                                                required
                                                onChange={(date) => setStartDate(date)}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="time"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Time
                                        </label>
                                        <StyledTimePicker
                                            className='w-full'
                                            placeholder='Select your time'
                                            defaultValue={moment()}
                                            showSecond={false}
                                            minuteStep={10}
                                            value={startTime}
                                            name='start_time'
                                            defaultOpenValue={moment()}
                                            onChange={(time) => setStartTime(time)}
                                        />
                                    </div>
                                </div>


                                <div className='flex items-center pb-3'>
                                    <div className='pr-3'>
                                <span>
                                    <span className="relative flex h-3 w-3">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D81DB] opacity-75"/>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3D81DB]"/>
                                    </span>
                                </span>
                                    </div>

                                    <p className='text-custom_title font-semibold'>Drop-Off</p>
                                </div>

                                <div className="grid gap-6 mb-6 grid-cols-2">
                                    <div>
                                        <label htmlFor="location"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Location
                                        </label>
                                        <select id="location" name='end_city' required
                                                className="bg-custom_bg text-custom_text text-sm rounded-lg font-normal block w-full p-4 ">
                                            <option selected disabled value="">Select your city</option>
                                            <option value="lviv">Lviv</option>
                                            <option value="kyiv">Kyiv</option>
                                            <option value="kharkiv">Kharkiv</option>
                                            <option value="odessa">Odessa</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="date"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Date
                                        </label>
                                        <div className="w-full ">
                                            <DatePicker
                                                wrapperClassName='block'
                                                className='bg-custom_bg text-custom_icons text-sm rounded-lg font-normal block w-full p-4 placeholder:text-custom_text'
                                                minDate={new Date()}
                                                selected={endDate}
                                                placeholderText="Select your date"
                                                name='end_date'
                                                required
                                                onChange={(date) => setEndDate(date)}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="time"
                                               className="block mb-2 text-sm font-bold text-custom_title ">
                                            Time
                                        </label>
                                        <StyledTimePicker
                                            className='w-full'
                                            placeholder='Select your time'
                                            // defaultValue={moment()}
                                            showSecond={false}
                                            minuteStep={10}
                                            value={endTime}
                                            name='end_time'
                                            onChange={(time) => setEndTime(time)}
                                        />
                                    </div>
                                </div>
                            </div>


                            {/*STEP 3*/}
                            <div className='bg-custom_white p-6 rounded-lg mb-8'>
                                <h2 className='text-lg font-black text-custom_title'>Payment Method</h2>

                                <div className='flex justify-between text-[13px] pb-5 text-custom_borders'>
                                    <p>Please enter your payment method</p>
                                    <p className='text-xs'>Step 3 of 4</p>
                                </div>

                                <div>
                                    <div className='bg-custom_bg rounded-lg'>
                                        <div className='flex justify-between items-center p-4'>
                                            <div className='flex items-center'>
                                                <div
                                                    onClick={() => setSelectedPaymentMethod('credit_card')}
                                                    className='mr-3 cursor-pointer'>
                                                    {selectedPaymentMethod === 'credit_card' ? (
                                                        <span>
                                                <span className="relative flex h-3 w-3 ">
                                                    <span
                                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A4393] opacity-75"/>
                                                    <span
                                                        className="relative inline-flex rounded-full h-3 w-3 bg-[#1A4393]"/>
                                                </span>
                                            </span>
                                                    ) : (
                                                        <div
                                                            className='h-4 w-4 bg-custom_white rounded-full border border-custom_gray'/>
                                                    )}

                                                </div>

                                                <p className='text-custom_title font-semibold'>Credit Card</p>
                                            </div>

                                            <div>
                                                <img src={visa} alt="visa" width={90}/>
                                            </div>
                                        </div>

                                        {selectedPaymentMethod === 'credit_card' && (
                                            <div className="grid gap-6  grid-cols-2 px-4 pb-4">
                                                <div>
                                                    <label htmlFor="card_number"
                                                           className="block mb-2 text-sm font-bold text-custom_title ">
                                                        Card number
                                                    </label>
                                                    <input type="text" id="card_number" name='card_number'
                                                           className="bg-custom_white text-custom_icons text-sm rounded-lg text-lg font-semibold placeholder:font-normal block w-full p-4"
                                                           placeholder="Card number" value={cardNumber}
                                                           onChange={formatCardNumber}/>
                                                </div>


                                                <div className="relative ">
                                                    <label htmlFor="card_date"
                                                           className="block mb-2 text-sm font-bold text-custom_title ">
                                                        Expration Date
                                                    </label>
                                                    <div
                                                        className="absolute inset-y-0 start-0 top-[28px] flex items-center ps-3.5 pointer-events-none">

                                                        <svg className="w-4 h-4 text-gray-500 "
                                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                             fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                        </svg>
                                                    </div>
                                                    <label htmlFor="card-expiration-input" className="sr-only">Card
                                                        expiration date:</label>
                                                    <input datepicker datepicker-format="mm/yy"
                                                           id="card-expiration-input"
                                                           type="text" name='card_date'
                                                           className="bg-custom_white text-custom_icons text-sm rounded-lg block w-full ps-10 p-4"
                                                           placeholder="12/23"/>
                                                </div>

                                                <div>
                                                    <label htmlFor="cardholder"
                                                           className="block mb-2 text-sm font-bold text-custom_title ">
                                                        Card Holder
                                                    </label>
                                                    <input type="text" id="cardholder" name='card_holder'
                                                           className="bg-custom_white text-custom_icons text-sm rounded-lg text-lg font-semibold placeholder:font-normal block w-full p-4"
                                                           placeholder="Card Holder"/>
                                                </div>


                                                <div className="col-span-1">
                                                    <label htmlFor="cvv"
                                                           className="block mb-2 text-sm font-bold text-custom_title ">
                                                        CVV
                                                    </label>
                                                    <input type="number" id="cvv" name='cvv'
                                                           aria-describedby="helper-text-explanation"
                                                           className="bg-custom_white text-custom_icons text-gray-900 text-sm rounded-lg block w-full p-4 "
                                                           placeholder="CVV"/>
                                                </div>
                                            </div>
                                        )}

                                        <input type="text" value={selectedPaymentMethod} hidden name='payment_method'/>
                                    </div>

                                    <div className='bg-custom_bg rounded-lg'>
                                        <div className='flex justify-between items-center p-4 my-4'>
                                            <div className='flex items-center'>
                                                <div
                                                    onClick={() => setSelectedPaymentMethod('paypal')}
                                                    className='mr-3 cursor-pointer'>
                                                    {selectedPaymentMethod === 'paypal' ? (
                                                            <span>
                                                <span className="relative flex h-3 w-3 ">
                                                    <span
                                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A4393] opacity-75"/>
                                                    <span
                                                        className="relative inline-flex rounded-full h-3 w-3 bg-[#1A4393]"/>
                                                </span>
                                            </span>
                                                        ) :
                                                        <div
                                                            className='h-4 w-4 bg-custom_white rounded-full border border-custom_gray'/>
                                                    }
                                                </div>

                                                <p className='text-custom_title font-semibold'>PayPal</p>
                                            </div>

                                            <div>
                                                <img src={paypal} alt="paypal" width={90}/>
                                            </div>
                                        </div>

                                        {selectedPaymentMethod === 'paypal' && (
                                            <div className='px-4 pb-4 mb-4'>
                                                <label htmlFor="paypal_number"
                                                       className="block mb-2 text-sm font-bold text-custom_title ">
                                                    Paypal number
                                                </label>
                                                <input type="text" id="paypal_number" name='paypal_number'
                                                       className="bg-custom_white text-custom_icons text-sm rounded-lg text-lg font-semibold placeholder:font-normal block w-full p-4"
                                                       placeholder="Paypal number"/>
                                            </div>
                                        )}
                                    </div>

                                    <div className='bg-custom_bg rounded-lg'>
                                        <div className='flex justify-between items-center p-4'>
                                            <div className='flex items-center'>
                                                <div
                                                    onClick={() => setSelectedPaymentMethod('bitcoin')}
                                                    className='mr-3 cursor-pointer'>
                                                    {selectedPaymentMethod === 'bitcoin' ? (
                                                        <span>
                                                <span className="relative flex h-3 w-3 ">
                                                    <span
                                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A4393] opacity-75"/>
                                                    <span
                                                        className="relative inline-flex rounded-full h-3 w-3 bg-[#1A4393]"/>
                                                </span>
                                            </span>
                                                    ) : (
                                                        <div
                                                            className='h-4 w-4 bg-custom_white rounded-full border border-custom_gray'/>
                                                    )}
                                                </div>

                                                <p className='text-custom_title font-semibold'>Bitcoin</p>
                                            </div>

                                            <div>
                                                <img src={bitcoin} alt="bitcoin" width={90}/>
                                            </div>
                                        </div>

                                        {selectedPaymentMethod === 'bitcoin' && (
                                            <div className='px-4 pb-4'>
                                                <label htmlFor="bitcoin_address"
                                                       className="block mb-2 text-sm font-bold text-custom_title ">
                                                    Bitcoin Address
                                                </label>
                                                <input type="text" id="bitcoin_address" name='bitcoin_address'
                                                       className="bg-custom_white text-custom_icons text-sm rounded-lg text-lg font-semibold placeholder:font-normal block w-full p-4"
                                                       placeholder="Bitcoin Address"/>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>


                            {/*STEP 4*/}
                            <div className='bg-custom_white p-6 rounded-lg mb-8'>
                                <h2 className='text-lg font-black text-custom_title'>Confirmation</h2>

                                <div className='flex justify-between text-[13px] pb-5 text-custom_borders'>
                                    <p>We are getting to the end. Just few clicks and your rental is ready!</p>
                                    <p className='text-xs'>Step 4 of 4</p>
                                </div>

                                <div>
                                    <div className="flex items-center px-5 py-4 bg-custom_bg rounded-lg">
                                        <input id="link-checkbox" type="checkbox" value=""
                                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "/>
                                        <label htmlFor="link-checkbox"
                                               className="ms-2 text-sm font-bold text-[#1F2544]">I agree
                                            with sending an Marketing and newsletter emails. No spam, promissed!</label>
                                    </div>

                                    <div className="flex items-center px-5 py-4 bg-custom_bg rounded-lg mt-4">
                                        <input id="link-checkbox" type="checkbox" value=""
                                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "/>
                                        <label htmlFor="link-checkbox"
                                               className="ms-2 text-sm font-bold text-[#1F2544]">I agree
                                            with the <a href="#" className="text-blue-600 hover:underline">terms
                                                and conditions and privacy policy</a>.</label>
                                    </div>


                                    <button className='btn btn-orange py-3 px-5 font-semibold my-6'
                                            onClick={handelSubmit}>Rent Now
                                    </button>


                                    <div>
                                        <img src={safety} alt="safety" width={32} className='mb-3 pt-2'/>

                                        <p className='font-semibold text-[#1F2544] py-1'>All your data are safe</p>
                                        <p className='text-sm'>We are using the most advanced security to provide you
                                            the
                                            best experience ever.</p>
                                    </div>
                                </div>
                            </div>
                        </Form>

                        <div>
                            <RentalSummary car={car} totalPrice={totalPrice} tax={tax}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Booking;