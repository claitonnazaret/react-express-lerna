import { DataTypes, Model, type Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import Profile from './Profile';
import Servico from './Servico';

interface ProfileServicoAttributes {
    id?: number;
    profileId: number;
    servicoId: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProfileServicoInput extends Optional<ProfileServicoAttributes, 'id'> {}
export interface ProfileServicoOutput extends Required<ProfileServicoAttributes> {}

class ProfileServico extends Model<ProfileServicoAttributes, ProfileServicoInput> implements ProfileServicoAttributes {
    public id!: number;
    public profileId!: number;
    public servicoId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProfileServico.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        profileId: {
            allowNull: true,
            type: DataTypes.BIGINT,
        },
        servicoId: {
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

ProfileServico.belongsTo(Profile, { foreignKey: 'profileId' });
ProfileServico.belongsTo(Servico, { foreignKey: 'servicoId' });

export default ProfileServico;
