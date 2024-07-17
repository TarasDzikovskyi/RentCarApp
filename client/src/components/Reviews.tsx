import {FC, useEffect, useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import StarRatings from 'react-star-ratings';
import Review from "./Review";
import {useAuth} from "../hooks/useAuth";
import {Form, useLoaderData} from "react-router-dom";
import {instance} from "../api/axios.api";
import {IReview} from "../types/types";


const Reviews: FC = ({car_id, setTotalCount, setReviewsCount}) => {
    const isAuth = useAuth();
    const data = useLoaderData();

    const [showMore, setShowMore] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(1);
    const [reviews, setReviews] = useState<object[]>([]);


    const handleShowMore = () => {
        setShowMore(true)
    };

    const handleShowLess = () => {
        setShowMore(false)
    };

    const changeRating = (newRating) => {
        setRating(newRating)
    };

    const ratingCount = (reviews) => {
        let total = 0;
        let count = 0;

        reviews.forEach(review => {
            total += review.rating;
        });

        if (total > 0) count = total / reviews.length;

        return count
    };

    const reviewsHandler = async () => {
        try {
            const {data} = await instance.get<IReview[]>(`reviews/${car_id}`);
            setReviews(data);

            const rating = ratingCount(data);
            setTotalCount(rating);
            setReviewsCount(data.length)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        reviewsHandler()
    }, []);

    useEffect(() => {
        if (data !== null) {
            setReviews(data.reviews);
            const rating = ratingCount(data.reviews);
            setTotalCount(rating);
            setReviewsCount(data.reviews.length)
        }
    }, [data]);


    return (
        <div className='flex flex-col justify-center mx-14 bg-custom_white rounded-md p-6 mb-10'>
            <div className='flex items-center'>
                <p className='text-custom_title font-bold text-lg pr-4'>Reviews</p>
                <div className='btn btn-orange hover:bg-custom_primary py-1 px-3'>{reviews.length}</div>
            </div>

            {showMore ? (
                <div>
                    {reviews.map((review, idx) => (
                        <div key={idx}>
                            <Review review={review}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {reviews.slice(0, 2).map((review, idx) => (
                        <div key={idx}>
                            <Review review={review}/>
                        </div>
                    ))}
                </div>
            )}


            {!showMore && reviews.length > 2 ? (
                <div className='flex justify-center pt-5'>
                    <button
                        onClick={handleShowMore}
                        className='flex items-center font-semibold text-sm'>
                        Show All
                        <IoIosArrowDown className='ml-1 pt-[2px] text-xl'/>
                    </button>
                </div>
            ) : (
                <div>
                    {reviews.length > 2 && (
                        <div className='flex justify-center pt-5'>
                            <button
                                onClick={handleShowLess}
                                className='flex items-center font-semibold text-sm'>
                                Show Less
                                <IoIosArrowUp className='ml-1 pt-[2px] text-xl'/>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {isAuth && (
                <Form
                    method='post'
                    className='bg-custom_white rounded-md mt-10'>

                    <div className="relative mb-3" data-te-input-wrapper-init>
                        <textarea
                            className="peer border-[1px] block min-h-[auto] w-full rounded-md border-0 bg-transparent px-3 py-[0.32rem]
                             leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100
                              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none
                               [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name='review'
                            placeholder="Your message"/>
                        {/*<label*/}
                        {/*    htmlFor="exampleFormControlTextarea1"*/}
                        {/*    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate*/}
                        {/*     pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out*/}
                        {/*     peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary*/}
                        {/*     peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8]*/}
                        {/*     motion-reduce:transition-none "*/}
                        {/*>Leave a review...</label*/}
                        {/*>*/}
                    </div>

                    <div className='flex items-center'>
                        <p className='pt-1 pr-1'>Add a rating: </p>

                        <StarRatings
                            rating={rating}
                            starRatedColor="#FBAD39"
                            changeRating={changeRating}
                            starDimension="20px"
                            starSpacing="0"
                            starHoverColor='#FBAD39'
                        />
                    </div>

                    <input type="number" name='rating' value={rating} hidden/>
                    <input type="number" name='car_id' value={car_id} hidden/>

                    <button

                        className='btn btn-orange mt-3'>
                        Send
                    </button>
                </Form>
            )}
        </div>
    );
};

export default Reviews;