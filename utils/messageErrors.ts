import {HttpException} from '@nestjs/common';

export const messageErrors = (statusCode: number, message: string, codeError: string): never => {
    throw new HttpException({
        statusCode,
        message,
        codeError,
    }, statusCode);
};