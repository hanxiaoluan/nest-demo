import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { Logger } from '../utils/log4'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const code = res.statusCode
        next()

        // 组装日志信息
        // 组装日志信息
        const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip}
            Status code: ${code}
            Parmas: ${JSON.stringify(req.params)}
            Query: ${JSON.stringify(req.query)}
            Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            `

        // 根据状态码，对日志类型进行区分
        if (code >= 500) {
            Logger.error(logFormat)
        } else if (code >= 400) {
            Logger.warn(logFormat)
        } else {
            Logger.access(logFormat)
            Logger.log(logFormat)
        }
    }
}
