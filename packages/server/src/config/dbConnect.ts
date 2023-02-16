import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const dbDatabase = DB_DATABASE as string;
const dbUsername = DB_USERNAME as string;
const dbDialect = "mysql";

const sequelizeConnection = new Sequelize(dbDatabase, dbUsername, DB_PASSWORD, {
    host: DB_HOST,
    dialect: dbDialect
})

export default sequelizeConnection;