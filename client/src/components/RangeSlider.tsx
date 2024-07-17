import {FC} from "react";

const RangeSlider: FC = ({ min, max, value, step, onChange, className }) => {

    return (
        <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className={`transparent h-2 w-full cursor-pointer appearance-none rounded-lg border-transparent 
            accent-green-700 hover:accent-green-700 active:accent-green-800 bg-gray-100 ${className}`}
        />
    );
};

export default RangeSlider;