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
					url: '/images/mars/mars1.jpg',
					preview: true,
				},
				{
					spotId: 2,
					url: '/images/moon/moon2.jpg',
					preview: true,
				},
				{
					spotId: 3,
					url: '/images/moon/moon3.jpg',
					preview: true,
				},
				{
					spotId: 4,
					url: '/images/saturn/saturn1.jpg',
					preview: true,
				},
				{
					spotId: 5,
					url: '/images/moon/moonroom1.jpg',
					preview: true,
				},
				{
					spotId: 6,
					url: '/images/saturn/saturn2.jpg',
					preview: true,
				},
				{
					spotId: 7,
					url: '/images/moon/moonroom2.jpg',
					preview: true,
				},
				{
					spotId: 8,
					url: '/images/saturn/saturn3.jpg',
					preview: true,
				},
				{
					spotId: 9,
					url: '/images/moon/moonroom3.jpg',
					preview: true,
				},
				{
					spotId: 10,
					url: '/images/saturn/saturn4.jpg',
					preview: true,
				},
				{
					spotId: 11,
					url: '/images/moon/moon4.jpg',
					preview: true,
				},
				{
					spotId: 12,
					url: '/images/mars/marsroom3.jpg',
					preview: true,
				},
				{
					spotId: 13,
					url: '/images/mars/mars3.jpg',
					preview: true,
				},
				{
					spotId: 14,
					url: '/images/saturn/saturn5.jpg',
					preview: true,
				},
				{
					spotId: 15,
					url: '/images/mars/marsroom3.jpg',
					preview: true,
				},
				{
					spotId: 16,
					url: '/images/mars/mars6.jpg',
					preview: true,
				},
				{
					spotId: 17,
					url: '/images/mars/mars6.jpg',
					preview: true,
				},
				{
					spotId: 18,
					url: '/images/mars/mars5.jpg',
					preview: true,
				},
				{
					spotId: 19,
					url: '/images/moon/moon3.jpg',
					preview: true,
				},
				{
					spotId: 20,
					url: '/images/moon/moonroom5.jpg',
					preview: true,
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
						'https://example.com/image1.jpg',
						'https://example.com/image2.jpg',
						'https://example.com/image3.jpg',
						'https://example.com/image4.jpg',
						'https://example.com/image5.jpg',
						'https://example.com/image6.jpg',
					],
				},
			},
			{}
		);
	},
};
