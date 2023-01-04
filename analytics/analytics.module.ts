import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Order} from '../orders/models/order';
import {OrderProduct} from '../orders/models/orderProduct';
import {AnalyticsController} from './analytics.controller';
import {AnalyticsService} from './analytics.service';

import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Order, OrderProduct]),
        AuthModule,
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule {
}
