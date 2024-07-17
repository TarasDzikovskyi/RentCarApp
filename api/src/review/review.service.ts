import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateReviewDto} from './dto/create-review.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Reviews} from "./entities/review.entity";
import {Repository} from "typeorm";

@Injectable()
export class ReviewService {
  constructor(
      @InjectRepository(Reviews)
      private readonly reviewRepository: Repository<Reviews>
  ) {}

  async create(createReviewDto: CreateReviewDto, id: number) {
    return await this.reviewRepository.save({
      review: createReviewDto.review,
      rating: createReviewDto.rating,
      user: {id},
      car: {id: +createReviewDto.car},
    });
  }


  async findAll(car_id: number): Promise<Reviews[]>{
    const reviews = await this.reviewRepository.find({
      where: {
        car: {id: car_id}
      },
      relations: {
        user: true
      },
      order: {createdAt: 'desc'}
    });

    reviews.forEach(review => {
      if (review.user) {
        delete review.user.password;
        delete review.user.updatedAt;
        delete review.user.email;
      }
    });

    return reviews;
  }


  async remove(id: number) {
    const review = await this.reviewRepository.findOne({
      where: {id}
    });

    if (!review) throw new NotFoundException('Review not found!');

    return await this.reviewRepository.delete(id);
  }
}
