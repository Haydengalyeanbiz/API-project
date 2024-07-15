'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await SpotImage.bulkCreate(
			[
				{
					spotId: 1,
					url: '/images/mars/marshome1/bathroom.jpg',
					preview: false,
				},
				{
					spotId: 1,
					url: '/images/mars/marshome1/gym.jpg',
					preview: false,
				},
				{
					spotId: 1,
					url: '/images/mars/marshome1/hallway.jpg',
					preview: false,
				},
				{
					spotId: 1,
					url: '/images/mars/marshome1/kitchen.jpg',
					preview: false,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'SpotImages';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				url: {
					[Op.in]: [
						'/images/mars/marshome1/bathroom.jpg',
						'/images/mars/marshome1/gym.jpg',
						'/images/mars/marshome1/hallway.jpg',
						'/images/mars/marshome1/kitchen.jpg',
					],
				},
			},
			{}
		);
	},
};
