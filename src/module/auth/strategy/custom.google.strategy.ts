import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { VerifyCallback } from "jsonwebtoken";
import { Strategy } from 'passport-google-oauth20';


@Injectable()
export class CustomGoogleStartegy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: "1050409220156-s8vuclmm8vds9kk8fhvm14bmfc30adtf.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
            scope: ["email", "profile"],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        try {
            const user = {
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image_url: profile.photos[0].value,
                accessToken,
                provider_id: profile.id,
                provider_type: "google"
            };
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}