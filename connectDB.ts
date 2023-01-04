import {SequelizeModule} from '@nestjs/sequelize';

import {Auth} from './auth/models/auth.model';
import {Order} from './orders/models/order';
import {OrderProduct} from './orders/models/orderProduct';
import {Category} from './categories/models/category.model';
import {Position} from './positions/models/position.model';

export const ConnectDB = SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'restapi',
    autoLoadModels: true,
    models: [
        Auth,
        Order,
        OrderProduct,
        Category,
        Position,
    ],
});