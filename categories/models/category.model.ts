import {Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import {Auth} from '../../auth/models/auth.model';
import {Position} from '../../positions/models/position.model';

@Table
export class Category extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: true})
    imageSrc: string;

    @ForeignKey(() => Auth)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    user_id: number;

    @BelongsTo(() => Auth)
    user: Auth;

    @HasMany(() => Position)
    positions: Position[];
}
