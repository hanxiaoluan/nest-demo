import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
@Module({
    //   controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
