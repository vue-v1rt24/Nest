import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Order} from '../orders/models/order';
import {OrderProduct} from '../orders/models/orderProduct';
import {AnalyticsDto, OrdersDto, OverviewData, Overview} from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
        @InjectModel(OrderProduct)
        private readonly orderProductModel: typeof OrderProduct,
    ) {
    }

    async overview(userId): Promise<OverviewData> {
        try {
            const allOrders = await this.orderModel.findAll({
                where: {user_id: userId},
                order: [
                    ['createdAt', 'ASC'],
                ],
                include: [{
                    model: this.orderProductModel,
                    required: false,
                }],
            });

            const ordersMap = this.getOrdersMap(allOrders);

            const totalOrdersNumber = allOrders.length;

            const daysNumber = Object.keys(ordersMap).length;

            const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);

            const yesterdayOrders = ordersMap[new Date(Date.now() - (1000 * 60 * 60 * 24)).toLocaleDateString()] || [];

            const yesterdayOrdersNumber = yesterdayOrders.length;

            const ordersPercent = (((yesterdayOrdersNumber / +ordersPerDay) - 1) * 100).toFixed(2);

            const totalGain = this.calculatePrice(allOrders);

            const gainPerDay = totalGain / daysNumber;

            const yesterdayGain = this.calculatePrice(yesterdayOrders);

            const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);

            const compareGain = (yesterdayGain - gainPerDay).toFixed(2);

            const compareNumber = (yesterdayOrdersNumber - +ordersPerDay).toFixed(2);

            return {
                gain: {
                    percent: Math.abs(+gainPercent),
                    compare: Math.abs(+compareGain),
                    yesterday: +yesterdayGain,
                    isHigher: +gainPercent > 0,
                },
                orders: {
                    percent: Math.abs(+ordersPercent),
                    compare: Math.abs(+compareNumber),
                    yesterday: +yesterdayOrdersNumber,
                    isHigher: +ordersPercent > 0,
                },
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async analytics(userId): Promise<Overview> {
        try {
            const allOrders = await this.orderModel.findAll({
                where: {user_id: userId},
                order: [
                    ['createdAt', 'ASC'],
                ],
                include: [{
                    model: this.orderProductModel,
                    required: false,
                }],
            });

            const ordersMap = this.getOrdersMap(allOrders);

            const average = +(this.calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);

            const chart = Object.keys(ordersMap).map(item => {
                const gain = this.calculatePrice(ordersMap[item]);
                const order = ordersMap[item].length;

                return {item, gain, order};
            });

            return {average, chart};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private getOrdersMap(orders: Array<AnalyticsDto> = []): object {
        const daysOrders: Partial<OrdersDto> = {};

        orders.forEach(order => {
            const data = new Date(order.createdAt).toLocaleDateString();

            if (data === new Date().toLocaleDateString()) {
                return;
            }

            if (!daysOrders[data]) {
                daysOrders[data] = [];
            }

            daysOrders[data].push(order);
        });

        return daysOrders;
    }

    private calculatePrice(orders: Array<AnalyticsDto> = []): number {
        return orders.reduce((total, order) => {
            const sum = order.orderProducts.reduce((acc, item) => acc += item.cost * item.quantity, 0);
            return total += sum;
        }, 0);
    }
}
