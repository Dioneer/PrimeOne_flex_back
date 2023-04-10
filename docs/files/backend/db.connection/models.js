import { DataTypes } from 'sequelize';
import { db } from './db.connection.js';

export const saveDataFromUser = db.define(
	'PromeOneUser',
	{
		// Здесь определяются атрибуты модели
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userEmail: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		userPhone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		userMessage: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		updatedAt: false,
	});