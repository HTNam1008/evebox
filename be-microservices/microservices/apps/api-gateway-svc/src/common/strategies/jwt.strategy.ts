// src/shared/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Kiß╗âm tra expiration
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true, // Cho ph├⌐p truy cß║¡p request trong validate
    });
  }

  async validate(req: Request, payload: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    
    // return {user: {email: payload.email, role: payload.role }};
    console.log('JWT payload:', payload); // Debug log
    return {email: payload.email, role: payload.role };
  }
}
