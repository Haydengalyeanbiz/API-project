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
					userId: 1,
					review: 'What an amazing spot! Perfect for stargazing.',
					stars: 5,
				},
				{
					spotId: 2,
					userId: 2,
					review: 'Great place to relax and unwind after a space mission.',
					stars: 4,
				},
				{
					spotId: 1,
					userId: 3,
					review: 'Lovely atmosphere, felt like floating among the stars.',
					stars: 5,
				},
				{
					spotId: 3,
					userId: 1,
					review: 'Incredible view of Earth from this spot!',
					stars: 5,
				},
				{
					spotId: 2,
					userId: 3,
					review: 'Amazing experience, felt like exploring a new planet!',
					stars: 5,
				},
				{
					spotId: 3,
					userId: 2,
					review: 'The view from this spot is breathtaking, a must-visit!',
					stars: 4,
				},
				{
					spotId: 1,
					userId: 4,
					review: 'Perfect spot for space enthusiasts, highly recommended!',
					stars: 5,
				},
				{
					spotId: 2,
					userId: 1,
					review: 'Unique accommodations, loved every moment here!',
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
