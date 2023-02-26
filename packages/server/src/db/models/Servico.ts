import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

interface ServicoAttributes {
    id?: number;
    descricao?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServicoInput extends Optional<ServicoAttributes, 'id'> {}
export interface ServicoOutput extends Required<ServicoAttributes> {}

class Servico extends Model<ServicoAttributes, ServicoInput> implements ServicoAttributes {
    public id!: number;
    public descricao!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Servico.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        descricao: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        sequelize: connection,
        underscored: false,
    }
);

export default Servico;
