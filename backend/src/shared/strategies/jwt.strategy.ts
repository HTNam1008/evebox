// src/shared/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Lấy JWT từ header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Không bỏ qua thời hạn JWT
      secretOrKey: configService.get<string>('JWT_SECRET'), // Lấy secret từ ConfigService
    });
  }

  async validate(payload: any) {
    // Trả về đối tượng user sẽ được gán vào request.user
    return { userId: payload.sub, role: payload.role };
  }
}
