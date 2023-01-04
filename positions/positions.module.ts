import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Position} from './models/position.model';
import {PositionsController} from './positions.controller';
import {PositionsService} from './positions.service';

import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Position]),
        AuthModule,
    ],
    exports: [PositionsService],
    controllers: [PositionsController],
    providers: [PositionsService],
})
export class PositionsModule {
}
