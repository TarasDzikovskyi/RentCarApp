import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import * as argon2 from "argon2";
import {Car} from "../car/entities/car.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        });

        if (existUser) throw new BadRequestException('This email already exist!');

        const newUser = await this.userRepository.save({
            email: createUserDto.email,
            name: createUserDto.name,
            image: createUserDto.image,
            password: await argon2.hash(createUserDto.password)
        });

        const {password, ...user} = newUser;

        const access_token = this.jwtService.sign({email: createUserDto.email});

        return {user, access_token}
    }

    async findOne(email: string) {
        return await this.userRepository.findOne({
            where: {email},
            relations: {
                favorites: true
            }
        })
    }


    async getFavoritesCars(id: number) {
        return await this.userRepository.findOne({
            where: {id},
            relations: {
                favorites: true
            }
        })

    }

    async toggleFavorite(car_id: number, user_id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            },

            relations: {
                favorites: true
            }
        });


        if (!user) {
            throw new BadRequestException('User not found');
        }

        delete user.password;
        delete user.updatedAt;


        const carIndex = user.favorites.findIndex((car) => car.id === car_id);

        if (carIndex === -1) {
            const carToAdd = new Car();
            carToAdd.id = car_id;

            user.favorites.push(carToAdd);
        } else {
            user.favorites.splice(carIndex, 1);
        }

        return this.userRepository.save(user);
    }
}
