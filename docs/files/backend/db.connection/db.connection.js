import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
});