import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Category} from './models/category.model';
import {CategoriesController} from './categories.controller';
import {CategoriesService} from './categories.service';

import {PositionsModule} from '../positions/positions.module';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Category]),
        PositionsModule,
        AuthModule,
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {
}
