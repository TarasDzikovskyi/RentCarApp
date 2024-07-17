import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import {ConfigService} from "@nestjs/config";
import {IUser} from "../../types/types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(user: IUser) {
        if(user.name === 'UnauthorizedException') throw new UnauthorizedException();
        return {id: user.id, name: user.name, email: user.email, image: user.image, createdAt: user.createdAt, favorites: user.favorites}
    }
}