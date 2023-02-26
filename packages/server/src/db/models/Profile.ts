import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import User from './User';

interface ProfileAttributes {
    id?: number;
    nome?: string | null;
    sobreNome?: string | null;
    avatar?: string | null;
    documento?: string | null;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProfileInput extends Optional<ProfileAttributes, 'id'> {}
export interface ProfileOutput extends Required<ProfileAttributes> {}

class Profile extends Model<ProfileAttributes, ProfileInput> implements ProfileAttributes {
    public id!: number;
    public nome!: string;
    public sobreNome!: string;
    public avatar!: string;
    public documento!: string;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Profile.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        nome: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        sobreNome: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        avatar: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        documento: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        userId: {
            allowNull: true,
            type: DataTypes.BIGINT,
        },
    },
    {
        timestamps: true,
        sequelize: connection,
        underscored: false,
    }
);

Profile.belongsTo(User, { foreignKey: 'userId' });

export default Profile;
