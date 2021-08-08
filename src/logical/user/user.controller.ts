import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username);
  }

  /**
   * @description JWT验证： Step1： 用户请求登录
   * @param body
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('JWT验证 - Step1:用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParams.username,
      loginParams.password,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账号或密码不正确',
        };
      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() body: any) {
    return await this.usersService.register(body);
  }
}
