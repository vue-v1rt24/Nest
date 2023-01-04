import {IsEmail, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, {message: 'Некорректная почта'})
    readonly email: string;

    @MinLength(6, {message: 'Минимум 6 символов'})
    readonly password: string;
}