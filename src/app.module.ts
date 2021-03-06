import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { UserService } from './logical/user/user.service';
// import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { AuthModule } from './logical/auth/auth.module'
import { UserController } from './logical/user/user.controller'

@Module({
    imports: [UserModule, AuthModule],
    controllers: [AppController, UserController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer:MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
