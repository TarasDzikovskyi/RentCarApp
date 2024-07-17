import {FC, useState} from 'react';
import {HiOutlineLocationMarker} from "react-icons/hi";
import {LuCalendarDays} from "react-icons/lu";
import {IoCarSportOutline} from "react-icons/io5";
import {IoMdTime} from "react-icons/io";
import {Form} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import styled from "styled-components";


const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-input {
    border: 1px solid #C4C4C4;
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

const RentalForm: FC = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);


    return (
        <Form>

            <div className='grid grid-cols-12 gap-10 bg-custom_tint py-20 px-10 relative'>

                <select name="location" className='input col-span-4 text-custom_icons text-sm rounded-lg font-normal block w-full p-4'>
                    <option value="" disabled selected><HiOutlineLocationMarker/>Pickup Location</option>
                    <option value="lviv" ><HiOutlineLocationMarker/>Lviv</option>
                    <option value="kyiv" ><HiOutlineLocationMarker/>Kyiv</option>
                    <option value="kharkiv" ><HiOutlineLocationMarker/>Kharkiv</option>
                    <option value="odessa" ><HiOutlineLocationMarker/>Odessa</option>
                </select>

                <div className="col-span-4 ">
                    <DatePicker
                        wrapperClassName='block'
                        className='input text-custom_icons text-sm rounded-lg font-normal block w-full p-4 placeholder:text-custom_text'
                        minDate={new Date()}
                        selected={startDate}
                        placeholderText="Pickup Date"
                        onChange={(date) => setStartDate(date)}
                    />
                </div>

                <div className="col-span-4 ">
                    <DatePicker
                        wrapperClassName='block'
                        className='input text-custom_icons text-sm rounded-lg font-normal block w-full p-4 placeholder:text-custom_text'
                        minDate={new Date()}
                        selected={endDate}
                        placeholderText="Return Date"
                        onChange={(date) => setEndDate(date)}
                    />
                </div>

                <select name="car_type" className='input col-span-3 text-custom_icons text-sm rounded-lg font-normal block w-full p-4'>
                    <option value="" disabled selected><IoCarSportOutline/>Car Type</option>
                    <option value="Sport"><IoCarSportOutline/>Sport</option>
                    <option value="SUV"><IoCarSportOutline/>SUV</option>
                    <option value="MPV"><IoCarSportOutline/>MPV</option>
                    <option value="Sedan"><IoCarSportOutline/>Sedan</option>
                    <option value="Coupe"><IoCarSportOutline/>Coupe</option>
                    <option value="Hatchback"><IoCarSportOutline/>Hatchback</option>
                </select>


                <StyledTimePicker
                    className='col-span-3'
                    placeholder='Pickup Time'
                    defaultValue={moment()}
                    showSecond={false}
                    minuteStep={10}
                    value={startTime}
                    onChange={(time) => setStartTime(time)}
                />


                <StyledTimePicker
                    className='col-span-3'
                    placeholder={`Return Time`}
                    defaultValue={moment()}
                    showSecond={false}
                    minuteStep={10}
                    value={endTime}
                    onChange={(time) => setEndTime(time)}

                />


                <button className='block btn btn-orange col-span-3'>
                    Rent Now
                </button>

            </div>
        </Form>

    );
};

export default RentalForm;