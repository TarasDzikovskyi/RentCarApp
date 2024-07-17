import {FC} from 'react';
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import CarBlock from "./CarBlock";

interface IBreakPoints {
    width: number;
    itemsToShow: number;
    itemsToScroll?: number;
}

const breakPoints: IBreakPoints[] = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2, itemsToScroll: 2},
    {width: 768, itemsToShow: 3, itemsToScroll: 3},
];




const StyledCarousel = styled(Carousel)`
    .rec.rec-dot {
        background: #90A3BF;
        box-shadow: none !important;
    }
            
    .rec.rec-dot_active, .rec.rec-dot:hover{
        background: #3563E9;
    }
`;

const CarouselModel: FC = () => {
    return (
        <div className='rec-custom_primary'>
            <StyledCarousel
                breakPoints={breakPoints}
                showArrows={false}
                enableAutoPlay={true}
                autoPlaySpeed={6000}
                itemsToScroll={3}
            >
                <CarBlock/>
                <CarBlock/>
                <CarBlock/>
                <CarBlock/>
                <CarBlock/>
            </StyledCarousel>
        </div>
    );
};

export default CarouselModel;