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
			});

			Booking.belongsTo(models.Spot, {
				foreignKey: 'spotId',
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
					isAfter: {
						args: new Date().toISOString().split('T')[0],
						msg: 'Start date must be in the future',
					},
				},
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					afterStart(date) {
						if (new Date(date) <= new Date(this.startDate)) {
							throw new Error('End Date has to be AFTER Start Date');
						}
					},
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
