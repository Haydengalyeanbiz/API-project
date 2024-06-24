'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// has many for SPOTS
			User.hasMany(
				models.Spot,
				{
					foreignKey: 'ownerId',
					as: 'OwnedSpots',
				},
				{
					onDelete: 'CASCADE',
				}
			);
			// has many for BOOKINGS
			User.hasMany(
				models.Booking,
				{
					foreignKey: 'userId',
				},
				{
					onDelete: 'CASCADE',
				}
			);
			// has many for REVIEWS
			User.hasMany(
				models.Review,
				{
					foreignKey: 'userId',
				},
				{
					onDelete: 'CASCADE',
				}
			);
		}
	}

	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.');
						}
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Please enter your first name.',
					},
					isAlpha: true,
					len: [0, 30],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Please enter your last name.',
					},
					isAlpha: true,
					len: [0, 30],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
				},
			},
		}
	);
	return User;
};
