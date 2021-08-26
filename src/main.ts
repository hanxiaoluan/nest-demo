import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import * as express from 'express'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { HttpExceptionFilter } from './filter/http-exception.filter'
import { AnyExceptionFilter } from './filter/any-exception.filter'
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false
    })

    // app.use(express.json()) // For parsing application/json
    // app.use(express.urlencoded({ extended: true })) // For parsing application/x-www-form-urlencoded
    app.useGlobalInterceptors(new TransformInterceptor())
    app.setGlobalPrefix('nest-zero-to-one')

    app.useGlobalFilters(new AnyExceptionFilter())
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(3000)
}

bootstrap()
