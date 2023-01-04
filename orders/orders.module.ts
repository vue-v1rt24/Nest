import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Order} from './models/order';
import {OrderProduct} from './models/orderProduct';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';

import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Order, OrderProduct]),
        AuthModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {
}
