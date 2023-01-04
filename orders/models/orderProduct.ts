import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Order} from './order';

@Table
export class OrderProduct extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER.UNSIGNED, allowNull: false})
    quantity: number;

    @Column({type: DataType.FLOAT, allowNull: false})
    cost: number;

    @ForeignKey(() => Order)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    order_id: number;

    @BelongsTo(() => Order)
    order: Order;
}
