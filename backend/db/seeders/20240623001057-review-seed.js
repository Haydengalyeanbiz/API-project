'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate(
			[
				{
					spotId: 1,
					userId: 2,
					review: 'Great place, very clean and comfortable!',
					stars: 5,
				},
				{
					spotId: 1,
					userId: 3,
					review: 'Nice location, but a bit noisy at night.',
					stars: 3,
				},
				{
					spotId: 2,
					userId: 1,
					review: 'Amazing experience, would definitely come back!',
					stars: 5,
				},
				{
					spotId: 2,
					userId: 3,
					review: 'Decent stay, but the host could be more responsive.',
					stars: 4,
				},
				{
					spotId: 3,
					userId: 1,
					review: 'Beautiful spot, loved the ambiance.',
					stars: 5,
				},
				{
					spotId: 3,
					userId: 2,
					review: 'Good value for money, clean and tidy.',
					stars: 4,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Reviews';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				review: {
					[Op.in]: [
						'Great place, very clean and comfortable!',
						'Nice location, but a bit noisy at night.',
						'Amazing experience, would definitely come back!',
						'Decent stay, but the host could be more responsive.',
						'Beautiful spot, loved the ambiance.',
						'Good value for money, clean and tidy.',
					],
				},
			},
			{}
		);
	},
};
