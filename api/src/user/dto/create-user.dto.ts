import {IsEmail, MinLength} from "class-validator";

export class CreateUserDto {
    name: string;

    @IsEmail()
    email: string;


    image?: string;

    @MinLength(6, {message: 'Password must be more than 6 symbols'})
    password: string;


}
