import {User} from "../../user/entities/user.entity";
import {IsNumber} from "class-validator";
import {Car} from "../../car/entities/car.entity";

export class CreateReviewDto {
    id: number;

    review: string;

    @IsNumber()
    rating: number;

    user: User;

    car: Car
}
