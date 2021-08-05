import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // return {
    //   code: '200',
    // };
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
      //   return {
      //     code: '500',
      //     data: {
      //       value: 'xx',
      //     },
      //   };
    }
    return user;
  }
}
