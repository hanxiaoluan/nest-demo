import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './logical/auth/guards/local-auth.guard';
import { JwtAuthGuard } from './logical/auth/guards/jwt-auth.guard';
import { AuthService } from './logical/auth/auth.service';
@Controller('lesson-2')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(JwtAuthGuard)
    @Get('hello-world')
    getHello(): string {
        return this.appService.getHello();
    }

    //   @UseGuards(LocalAuthGuard)
    //   @Post('auth/login')
    //   async login(@Request() req) {
    //     return this.authService.login(req.user);
    //   }
}
