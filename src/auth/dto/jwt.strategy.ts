import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly DatabaseService: DatabaseService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "Secret"
        })
    }

    async validate(payload: {userEmail:string}){
        const user = await this.DatabaseService.user.findUnique({
            where:{
                email: payload.userEmail,
            },
        });
        return user;
    }
}