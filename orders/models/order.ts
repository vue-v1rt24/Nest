import {Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import {Auth} from '../../auth/models/auth.model';
import {OrderProduct} from './orderProduct';

@Table
export class Order extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Auth)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    user_id: number;

    @BelongsTo(() => Auth)
    user: Auth;

    @HasMany(() => OrderProduct)
    orderProducts: OrderProduct[];
}
