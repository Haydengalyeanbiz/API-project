'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// belongs to for USERS
			Review.belongsTo(
				models.User,
				{
					foreignKey: 'userId',
				},
				{
					onDelete: 'CASCADE',
				}
			);
			// belongs to for SPOTS
			Review.belongsTo(
				models.Spot,
				{
					foreignKey: 'spotId',
				},
				{
					onDelete: 'CASCADE',
				}
			);
		}
	}
	Review.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
				},
				references: { model: 'Spots' },
				onDelete: 'CASCADE',
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
				},
				references: { model: 'Users' },
				onDelete: 'CASCADE',
			},
			review: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stars: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					min: 1,
					max: 5,
				},
			},
		},
		{
			sequelize,
			modelName: 'Review',
		}
	);
	return Review;
};
