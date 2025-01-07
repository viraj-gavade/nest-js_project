import { Catch , ArgumentsHost,HttpStatus,HttpException } from "@nestjs/common";
import { MyLoggerService } from "src/my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";



type MyResponseObj = {
    statusCode : number,
    timestamp : string,
    path : string,
    response : string | object,
}


@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    private  readonly logger = new MyLoggerService(AllExceptionFilter.name
    )

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request  = ctx.getResponse<Request>();

        const MyResponseObj:MyResponseObj ={
            statusCode:200,
            timestamp:new Date().toISOString(),
            path:request.url,
            response:''
        }
        if (exception instanceof HttpException){
            MyResponseObj.statusCode = exception.getStatus()
            MyResponseObj.response = exception.getResponse()
    } else if (exception instanceof PrismaClientValidationError){ 
            MyResponseObj.statusCode = 422
            MyResponseObj.response = exception.message.replaceAll(/\n/g, ' ')
    } else {
        MyResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
        MyResponseObj.response = 'Internal Server Error'
    }
    response.status(MyResponseObj.statusCode).json(MyResponseObj)
    this.logger.error(MyResponseObj.response,AllExceptionFilter.name)

    super.catch(exception,host)
    }
}