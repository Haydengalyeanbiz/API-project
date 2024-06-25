'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Booking.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});

			Booking.belongsTo(models.Spot, {
				foreignKey: 'spotId',
				onDelete: 'CASCADE',
			});
		}
	}
	Booking.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
				},
				references: { model: 'Spots' },
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
				},
				references: { model: 'Users' },
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isDate: true,
				},
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isDate: true,
				},
			},
		},
		{
			sequelize,
			modelName: 'Booking',
		}
	);
	return Booking;
};
