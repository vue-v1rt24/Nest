import {Column, Model, Table, DataType, HasMany} from 'sequelize-typescript';
import {Category} from '../../categories/models/category.model';
import {Position} from '../../positions/models/position.model';
import {Order} from '../../orders/models/order';

@Table
export class Auth extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Category)
    categories: Category[];

    @HasMany(() => Position)
    positions: Position[];

    @HasMany(() => Order)
    orders: Order[];
}
