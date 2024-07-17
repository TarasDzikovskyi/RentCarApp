import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Car} from "./entities/car.entity";
import {User} from "../user/entities/user.entity";
import {AwsS3Module} from "../aws-s3/s3.module";

@Module({
  imports: [TypeOrmModule.forFeature([Car, User]), AwsS3Module],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService]
})
export class CarModule {}
