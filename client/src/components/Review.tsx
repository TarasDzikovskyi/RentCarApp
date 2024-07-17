import {FC} from 'react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import {FaTrash} from "react-icons/fa";
import {useAppSelector} from "../store/hooks";
import {Form} from "react-router-dom";


const Review: FC = ({review}) => {
    const {user} = useAppSelector(state => state.user);



    return (
        <div className='pb-4'>
            <div className='flex justify-between items-center py-4'>
                <div>
                    <div className='flex items-center'>
                        <div className='rounded-full w-[56px] h-[56px] mr-4 bg-custom_gray flex items-center justify-center'>
                            <p className='text-custom_white text-xl'>
                                {review.user.name
                                    .split(' ')
                                    .map(part => part[0])
                                    .join('')}
                            </p>
                        </div>

                        <div>
                            <h3 className='text-xl font-bold text-custom_title pb-1'>{review.user.name}</h3>
                            <p className='text-xs  font-normal pt-1'>
                                {moment().diff(review.user.createdAt, 'days')} days on site
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='text-xs font-normal text-right'>{moment(review.createdAt).format('DD MMMM YYYY')}</h3>
                    <p>
                        <StarRatings
                            rating={review.rating}
                            starRatedColor="#FBAD39"
                            starDimension="20px"
                            starSpacing="0"
                        />
                    </p>
                </div>
            </div>

            <div className='flex justify-between'>
                <p className='text-custom_icons text-sm pl-[72px] '>
                    {review.review}
                </p>

                {user && user.id === review.user.id && (
                    <Form
                        method='delete'>
                        <input type="text" value={review.id} hidden name='review_id'/>
                        <button className='cursor-pointer hover:text-custom_red'>
                            <FaTrash/>
                        </button>
                    </Form>
                )}
            </div>

        </div>
    );
};

export default Review;
