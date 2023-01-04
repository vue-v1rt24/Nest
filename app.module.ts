import {Module} from '@nestjs/common';
import {ConnectDB} from './connectDB';
import {AuthModule} from './auth/auth.module';
import {CategoriesModule} from './categories/categories.module';
import {OrdersModule} from './orders/orders.module';
import {PositionsModule} from './positions/positions.module';
import {AnalyticsModule} from './analytics/analytics.module';

import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
    imports: [
        ConnectDB,
        ServeStaticModule.forRoot({rootPath: join(__dirname, 'static')}),
        AuthModule,
        CategoriesModule,
        OrdersModule,
        PositionsModule,
        AnalyticsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
