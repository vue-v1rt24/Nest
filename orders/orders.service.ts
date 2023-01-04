import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Order} from './models/order';
import {OrderProduct} from './models/orderProduct';
import {CreateOrderDto} from './dto/create-order.dto';
import {FilterOrderDto} from './dto/filter.order-dto';

import {messageErrors} from '../utils/messageErrors';

import {Op} from 'sequelize';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
        @InjectModel(OrderProduct)
        private readonly orderProductModel: typeof OrderProduct,
    ) {
    }

    async getAllOrders(userId, offset: string, limit: string, order?: number, start?: string, end?: string): Promise<Order[]> {
        try {
            const queryFilter: Partial<FilterOrderDto> = {};

            const d = (date: string) => {
                return new Date(date.split('.').reverse().join('-'));
            };

            if (start) {
                queryFilter.createdAt = {
                    [Op.gte]: d(start),
                };
            }

            if (end) {
                if (queryFilter.createdAt) {
                    queryFilter.createdAt = {
                        [Op.gte]: d(start),
                        [Op.lte]: d(end),
                    };
                } else {
                    queryFilter.createdAt = {
                        [Op.lte]: d(end),
                    };
                }
            }

            if (order) {
                queryFilter.id = order;
            }

            return this.orderModel.findAll({
                where: {
                    user_id: userId,
                    ...queryFilter,
                },
                offset: +offset,
                limit: +limit,
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: this.orderProductModel,
                    all: true,
                    required: false,
                }],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrder(dto: CreateOrderDto[], user_id: number): Promise<{ message: string }> {
        try {
            const order = await this.orderModel.create({user_id});

            const newDto = dto.map(item => {
                item['order_id'] = order.id;

                return item;
            });

            await this.orderProductModel.bulkCreate(newDto);

            return {
                message: `Заказ № ${order.id} добавлен`,
            };
        } catch (error) {
            console.log(error);
            messageErrors(400, 'Заполните все поля', 'orderNotFields');
        }
    }
}
