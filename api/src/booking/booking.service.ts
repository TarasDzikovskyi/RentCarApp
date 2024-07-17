import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Booking} from "./entities/booking.entity";
import {MoreThanOrEqual, Repository} from "typeorm";
import * as moment from "moment";

@Injectable()
export class BookingService {
  constructor(
      @InjectRepository(Booking) private bookingRepository: Repository<Booking>
  ) {}

  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  findAll() {
    const currentDate = moment().unix();

    return this.bookingRepository.find({
      where: {
        start_date: MoreThanOrEqual(currentDate),
      },

      order: {
        start_date: "DESC"
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
