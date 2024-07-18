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
				// Spot 11
				{
					spotId: 11,
					url: '/images/mars/marshome2/mars7.jpg',
					preview: true,
				},
				{
					spotId: 11,
					url: '/images/mars/marshome2/discovery.jpg',
					preview: false,
				},
				{
					spotId: 11,
					url: '/images/mars/marshome2/bedroom.jpg',
					preview: false,
				},
				{
					spotId: 11,
					url: '/images/mars/marshome2/bedroom2.jpg',
					preview: false,
				},
				{
					spotId: 11,
					url: '/images/mars/marshome2/bedroom3.jpg',
					preview: false,
				},

				// Spot 12
				{
					spotId: 12,
					url: '/images/mars/marshome3/mars6.jpg',
					preview: true,
				},
				{
					spotId: 12,
					url: '/images/mars/marshome3/bedroom.jpg',
					preview: false,
				},
				{
					spotId: 12,
					url: '/images/mars/marshome3/bathroom.jpg',
					preview: false,
				},
				{
					spotId: 12,
					url: '/images/mars/marshome3/bedroom2.jpg',
					preview: false,
				},
				{
					spotId: 12,
					url: '/images/mars/marshome3/kitchen.jpg',
					preview: false,
				},

				// Spot 13
				{
					spotId: 13,
					url: '/images/saturn/saturnhome5/saturnhome.webp',
					preview: true,
				},
				{
					spotId: 13,
					url: '/images/saturn/saturnhome5/bathroom.webp',
					preview: false,
				},
				{
					spotId: 13,
					url: '/images/saturn/saturnhome5/kitchen.webp',
					preview: false,
				},
				{
					spotId: 13,
					url: '/images/saturn/saturnhome5/livingroom.webp',
					preview: false,
				},
				{
					spotId: 13,
					url: '/images/saturn/saturnhome5/bedroom.webp',
					preview: false,
				},

				// Spot 14
				{
					spotId: 14,
					url: '/images/mars/marshome5/main.webp',
					preview: true,
				},
				{
					spotId: 14,
					url: '/images/mars/marshome5/bathroom.webp',
					preview: false,
				},
				{
					spotId: 14,
					url: '/images/mars/marshome5/kitchen.webp',
					preview: false,
				},
				{
					spotId: 14,
					url: '/images/mars/marshome5/bedroom.webp',
					preview: false,
				},
				{
					spotId: 14,
					url: '/images/mars/marshome5/livingroom.webp',
					preview: false,
				},

				// Spot 15
				{
					spotId: 15,
					url: '/images/mars/marshome6/main.webp',
					preview: true,
				},
				{
					spotId: 15,
					url: '/images/mars/marshome6/kitchen.webp',
					preview: false,
				},
				{
					spotId: 15,
					url: '/images/mars/marshome6/livingroom.webp',
					preview: false,
				},
				{
					spotId: 15,
					url: '/images/mars/marshome6/bathroom.webp',
					preview: false,
				},
				{
					spotId: 15,
					url: '/images/mars/marshome6/bedroom.webp',
					preview: false,
				},

				// Spot 16
				{
					spotId: 16,
					url: '/images/mars/marshome7/main.webp',
					preview: true,
				},
				{
					spotId: 16,
					url: '/images/mars/marshome7/bedroom.webp',
					preview: false,
				},
				{
					spotId: 16,
					url: '/images/mars/marshome7/kitchen.webp',
					preview: false,
				},
				{
					spotId: 16,
					url: '/images/mars/marshome7/livingroom.webp',
					preview: false,
				},
				{
					spotId: 16,
					url: '/images/mars/marshome7/bathroom.webp',
					preview: false,
				},

				// Spot 17
				{
					spotId: 17,
					url: '/images/moon/moonhome7/main.webp',
					preview: true,
				},
				{
					spotId: 17,
					url: '/images/moon/moonhome7/bedroom.webp',
					preview: false,
				},
				{
					spotId: 17,
					url: '/images/moon/moonhome7/livingroom.webp',
					preview: false,
				},
				{
					spotId: 17,
					url: '/images/moon/moonhome7/bathroom.webp',
					preview: false,
				},
				{
					spotId: 17,
					url: '/images/moon/moonhome7/kitchen.webp',
					preview: false,
				},

				// Spot 18
				{
					spotId: 18,
					url: '/images/moon/moonhome8/main.webp',
					preview: true,
				},
				{
					spotId: 18,
					url: '/images/moon/moonhome8/livingroom.webp',
					preview: false,
				},
				{
					spotId: 18,
					url: '/images/moon/moonhome8/bathroom.webp',
					preview: false,
				},
				{
					spotId: 18,
					url: '/images/moon/moonhome8/kitchen.webp',
					preview: false,
				},
				{
					spotId: 18,
					url: '/images/moon/moonhome8/bedroom.webp',
					preview: false,
				},

				// Spot 19
				{
					spotId: 19,
					url: '/images/moon/moonhome9/main.webp',
					preview: true,
				},
				{
					spotId: 19,
					url: '/images/moon/moonhome9/bedroom.webp',
					preview: false,
				},
				{
					spotId: 19,
					url: '/images/moon/moonhome9/kitchen.webp',
					preview: false,
				},
				{
					spotId: 19,
					url: '/images/moon/moonhome9/livingroom.webp',
					preview: false,
				},
				{
					spotId: 19,
					url: '/images/moon/moonhome9/bathroom.webp',
					preview: false,
				},

				// Spot 20
				{
					spotId: 20,
					url: '/images/mars/marshome1/mars1.jpg',
					preview: true,
				},
				{
					spotId: 20,
					url: '/images/mars/marshome1/bathroom.jpg',
					preview: false,
				},
				{
					spotId: 20,
					url: '/images/mars/marshome1/gym.jpg',
					preview: false,
				},
				{
					spotId: 20,
					url: '/images/mars/marshome1/hallway.jpg',
					preview: false,
				},
				{
					spotId: 20,
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
						'/images/moon/moon4.jpg',
						'/images/moon/moon5.jpg',
						'/images/moon/moon6.jpg',
						'/images/moon/moon7.jpg',
						'/images/moon/moon8.jpg',
						'/images/mars/marsroom3.jpg',
						'/images/mars/marsroom4.jpg',
						'/images/mars/marsroom5.jpg',
						'/images/mars/marsroom6.jpg',
						'/images/mars/marsroom7.jpg',
						'/images/mars/mars3.jpg',
						'/images/mars/mars4.jpg',
						'/images/mars/mars5.jpg',
						'/images/mars/mars6.jpg',
						'/images/mars/mars7.jpg',
						'/images/saturn/saturn5.jpg',
						'/images/saturn/saturn6.jpg',
						'/images/saturn/saturn7.jpg',
						'/images/saturn/saturn8.jpg',
						'/images/saturn/saturn9.jpg',
						'/images/mars/marsroom4.jpg',
						'/images/mars/marsroom5.jpg',
						'/images/mars/marsroom6.jpg',
						'/images/mars/marsroom7.jpg',
						'/images/mars/mars6.jpg',
						'/images/mars/mars7.jpg',
						'/images/mars/mars8.jpg',
						'/images/mars/mars9.jpg',
						'/images/mars/mars10.jpg',
						'/images/mars/mars5.jpg',
						'/images/moon/moon4.jpg',
						'/images/moon/moon5.jpg',
						'/images/moon/moon6.jpg',
						'/images/moon/moon7.jpg',
						'/images/mars/mars1.jpg',
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
