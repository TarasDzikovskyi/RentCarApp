import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '321071471682-4j6oq01rgl54tq9iamf8heuafa6sg5ad.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3001/api/auth/google/callback',
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) : Promise<any> {
        const {name, emails, photos} = profile;
        console.log(profile)
        const user = {
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
            access_token: accessToken,
            type: 'google'
        };

        done(null, user)
    }
}

