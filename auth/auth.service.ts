import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Auth} from './models/auth.model';
import {CreateUserDto} from './dto/create-user.dto';

import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth)
        private readonly authModel: typeof Auth,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(dto: CreateUserDto): Promise<{ token: string }> {
        try {
            const passwordHash = await bcrypt.hash(dto.password, 10);
            const user = await this.authModel.create({...dto, password: passwordHash});
            return this.generateToken(user);
        } catch (error) {
            if (error.original.errno === 1062) {
                throw new HttpException({
                    statusCode: 409,
                    message: 'Пользователь с такой почтой уже существует',
                    codeError: 'UserRegisterDuplicate',
                }, 409);
            } else {
                console.log(error);
                throw error;
            }
        }
    }

    async login(dto: CreateUserDto): Promise<{ token: string }> {
        try {
            const user = await this.authModel.findOne({where: {email: dto.email}});

            if (!user) {
                throw 'Логин/Пароль не верны';
            }

            const passwordCompare = await bcrypt.compare(dto.password, user.password);

            if (!passwordCompare) {
                throw 'Логин/Пароль не верны';
            }

            return this.generateToken(user);
        } catch (error) {
            throw new HttpException({
                statusCode: 401,
                message: error,
                codeError: 'UserLoginNotFound',
            }, 401);
        }
    }

    private generateToken(user: Auth): { token: string } {
        const payload = {id: user.id, email: user.email};
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
