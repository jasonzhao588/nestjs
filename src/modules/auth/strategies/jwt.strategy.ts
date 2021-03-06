import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { JwtPayload } from "../auth.interface";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly userService: UserService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'tTbivfvN2DTvKuKk4PKZhRQ2qgCpnqnrnTX12GpTAY4='
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload:',payload);
    const { name } = payload;
    const entity = await this.userService.findByName(name);

    if (!entity) {
      throw new UnauthorizedException('没找到用户！');
    }
    // delete entity.password;
    return entity
  }
}