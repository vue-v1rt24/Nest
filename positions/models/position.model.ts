import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Auth} from '../../auth/models/auth.model';
import {Category} from '../../categories/models/category.model';

@Table
export class Position extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.FLOAT, allowNull: false})
    cost: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Auth)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    user_id: number;

    @BelongsTo(() => Auth)
    user: Auth;
}
