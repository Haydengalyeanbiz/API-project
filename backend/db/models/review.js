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
			Review.belongsTo(models.Spot, {
				foreignKey: 'spotId',
			});
			Review.belongsTo(models.User, {
				foreignKey: 'userId',
			});
			Review.hasMany(models.ReviewImage, {
				foreignKey: 'reviewId',
				onDelete: 'CASCADE',
				hooks: true,
			});
		}
	}
	Review.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Spots' },
				onDelete: 'CASCADE',
				validate: {
					isInt: true,
				},
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Users' },
				onDelete: 'CASCADE',
				validate: {
					isInt: true,
				},
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
