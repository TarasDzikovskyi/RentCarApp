import {Injectable, UnauthorizedException} from '@nestjs/common';
import {IGoogleUser, IUser} from "../types/types";
import {JwtService} from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {UserService} from "../user/user.service";
import emailActionEnum from '../config/emailActionEnum';
import {v4 as uuidv4} from 'uuid';
import {EmailService} from '../email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {
    }


    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException('Please create an account!');
        const passwordIsMatch = await argon2.verify(user.password, password);

        if (user && passwordIsMatch) {
            return user
        }
        throw new UnauthorizedException('Email or password is incorrect!')
    }

    async login(user: IUser) {
        const {id, name, email, image, createdAt, favorites} = user;

        return {
            id, name, email, image, createdAt, favorites,
            access_token: this.jwtService.sign({id, name, email, image, createdAt, favorites})
        };
    }

    async googleLogin(googleUser: IGoogleUser) {
        const user = await this.userService.findOne(googleUser.email);
        let returnedUser: any = {};

        if (!user) {
            let response = await this.userService.create(googleUser);
            returnedUser = response.user;
            returnedUser['favorites'] = [];
        } else returnedUser = user;

        let {id, name, email, image, createdAt, favorites} = returnedUser;

        return {
            id, name, email, image, createdAt, favorites,
            access_token: this.jwtService.sign({id, name, email, image, createdAt, favorites})
        }
    }

    async getProfile(user: IUser, id: number) {

        const favoritesCars = await this.userService.getFavoritesCars(id);

        user.favorites = favoritesCars.favorites;
        return user
    }

    async refreshPass(email: string) {
        console.log(email);
        if (email !== '') {
            const user = await this.userService.findOne(email);

            if (!user) {
                throw new UnauthorizedException('Email is incorrect!')
            } else {

                const action_token = this.jwtService.sign({
                    id: user.id,
                    name: user.name,
                    email,
                    createdAt: user.createdAt,
                    jid: uuidv4()
                });
                console.log(action_token);

                const res = await this.emailService.sendEMail(
                    email,
                    emailActionEnum.FORGOT,
                    {email, userName: user.name, actionToken: action_token}
                );

                console.log(res)
            }
        } else throw new UnauthorizedException('Email is incorrect!')

    }
}
