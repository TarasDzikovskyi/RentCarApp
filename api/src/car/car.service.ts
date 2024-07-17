import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCarDto} from './dto/create-car.dto';
import {UpdateCarDto} from './dto/update-car.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "./entities/car.entity";
import {Repository} from "typeorm";
import {Express} from 'express';
import {User} from "../user/entities/user.entity";
import {S3Service} from "../aws-s3/s3.service";
import {v4 as uuid} from 'uuid';
import * as moment from 'moment';


@Injectable()
export class CarService {

    constructor(
        @InjectRepository(Car) private carRepository: Repository<Car>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private s3Service: S3Service
    ) {}

    async create(createCarDto: CreateCarDto) {
        const existCar = await this.carRepository.findOne({
            where: {
                make: createCarDto.make,
                model: createCarDto.model
            }
        });

        if (existCar) throw new BadRequestException('This cars already exist!');

        const car = await this.carRepository.save({
            make: createCarDto.make,
            model: createCarDto.model,
            class: createCarDto.class,
            drive: createCarDto.drive,
            fuel_type: createCarDto.fuel_type,
            transmission: createCarDto.transmission,
            year: createCarDto.year,
            image: ''
        });

        return car;
    }


    async findAllByPagination(page: number, limit: number) {
        return await this.carRepository.find({
            relations: {
                review: true,
                booking: true
            },
            order: {
                createdAt: "DESC"
            },
            take: limit,
            skip: (page - 1) * limit
        });
    }

    async findAll() {
        const cars = await this.carRepository.find({
            relations: {
                review: true,
                booking: true
            },
            order: {
                price: "DESC"
            }
        });


        const total = cars.reduce(
            (acc, car) => {

                const type = car.class;
                if (type) {
                    const typeIndex = acc.types.findIndex(entry => entry.type === type);

                    if (typeIndex === -1) {
                        acc.types.push({type, count: 1});
                    } else {
                        acc.types[typeIndex].count++;
                    }
                }

                const drive = car.drive;
                if (drive) {
                    const driveIndex = acc.drives.findIndex(entry => entry.drive === drive);

                    if (driveIndex === -1) {
                        acc.drives.push({drive, count: 1});
                    } else {
                        acc.drives[driveIndex].count++;
                    }
                }

                const transmission = car.transmission;
                if (drive) {
                    const transmissionIndex = acc.transmissions.findIndex(entry => entry.transmission === transmission);

                    if (transmissionIndex === -1) {
                        acc.transmissions.push({transmission, count: 1});
                    } else {
                        acc.transmissions[transmissionIndex].count++;
                    }
                }

                const fuel = car.fuel_type;
                if (fuel) {
                    const fuelIndex = acc.fuels.findIndex(entry => entry.fuel === fuel);

                    if (fuelIndex === -1) {
                        acc.fuels.push({fuel, count: 1});
                    } else {
                        acc.fuels[fuelIndex].count++;
                    }
                }

                return acc;
            },
            {types: [], drives: [], transmissions: [], fuels: []}
        );

        return {cars, ...total}
    }


    async getCarsByAds() {
        return await this.carRepository.query(
            'SELECT * FROM car ORDER BY RANDOM() LIMIT 2'
        );
    }

    async findFavorite() {
        // return await this.carRepository.find
    }

    async findOne(id: number) {
        return await this.carRepository.findOne({
            where: {
                id
            },
            relations: {
                // review: true,
                booking: true
            }
        });
    }

    update(id: number, updateCarDto: UpdateCarDto) {
        return `This action updates a #${id} car`;
    }


    async remove(id: number) {
        const car = await this.carRepository.findOne({
            where: {id}
        });

        if (!car) throw new NotFoundException('Car not found!');

        return await this.carRepository.delete(id);
    }

    async addFileToCar(file: Express.Multer.File, id: number) {
        const car = await this.carRepository.findOne({
            where: {id}
        });

        if (!car) throw new BadRequestException('This cars is not included in DB!');

        // if (cars.user.email !== email) {
        //   throw new HttpException(
        //       "You cannot update recipe. It's  not yours!",
        //       400,
        //   );
        // };

        const bucketKey = `${uuid()}-${moment().unix()}`;
        const fileUrl = await this.s3Service.uploadFile(file, bucketKey);
        console.log(fileUrl)

        await this.carRepository.update({id}, {image: fileUrl});

        return {...car, image: fileUrl}
    }
}
