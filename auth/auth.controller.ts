import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {Auth} from './models/auth.model';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    register(@Body() dto: CreateUserDto): Promise<{ token: string }> {
        return this.authService.register(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    login(@Body() dto: CreateUserDto): Promise<{ token: string }> {
        return this.authService.login(dto);
    }
}
