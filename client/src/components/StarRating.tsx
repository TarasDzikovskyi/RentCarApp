import {FC} from 'react';


const StarRating: FC = ({max, current, className}) => {

    const getRating = () => {
        return (current / max) * 100;
    };

    return (
        <div>
            <div className=" inline-block text-base relative" >
                {[...Array(max)].map((_, i) => (
                    <span key={i} className={className}>&#9734;</span>
                ))}
                <div className="absolute top-0 overflow-hidden whitespace-nowrap text-[#FBAD39]" style={{width: getRating() + '%'}}>
                    {[...Array(max)].map((_, i) => (
                        <span key={i} className={className}>&#9733;</span>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default StarRating;