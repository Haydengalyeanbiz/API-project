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
				// Spot 1
				{
					spotId: 1,
					url: '/images/moon/moonhome1/main.webp',
					preview: true,
				},
				{
					spotId: 1,
					url: '/images/moon/moonhome1/bathroom.webp',
					preview: false,
				},
				{
					spotId: 1,
					url: '/images/moon/moonhome1/bedroom.webp',
					preview: false,
				},
				{
					spotId: 1,
					url: '/images/moon/moonhome1/kitchen.webp',
					preview: false,
				},
				{
					spotId: 1,
					url: '/images/moon/moonhome1/moonroom5.jpg',
					preview: false,
				},

				// Spot 2
				{
					spotId: 2,
					url: '/images/moon/moonhome2/main.webp',
					preview: true,
				},
				{
					spotId: 2,
					url: '/images/moon/moonhome2/kitchen.webp',
					preview: false,
				},
				{
					spotId: 2,
					url: '/images/moon/moonhome2/bedroom.webp',
					preview: false,
				},
				{
					spotId: 2,
					url: '/images/moon/moonhome2/bathroom.webp',
					preview: false,
				},
				{
					spotId: 2,
					url: '/images/moon/moonhome2/moonroom1.jpg',
					preview: false,
				},

				// Spot 3
				{
					spotId: 3,
					url: '/images/saturn/saturnhome1/saturn7.jpg',
					preview: true,
				},
				{
					spotId: 3,
					url: '/images/saturn/saturnhome1/bathroom.webp',
					preview: false,
				},
				{
					spotId: 3,
					url: '/images/saturn/saturnhome1/bedroom.webp',
					preview: false,
				},
				{
					spotId: 3,
					url: '/images/saturn/saturnhome1/kitchen.webp',
					preview: false,
				},
				{
					spotId: 3,
					url: '/images/saturn/saturnhome1/saturnhome.webp',
					preview: false,
				},

				// Spot 4
				{
					spotId: 4,
					url: '/images/moon/moonhome3/main.webp',
					preview: true,
				},
				{
					spotId: 4,
					url: '/images/moon/moonhome3/bathroom.webp',
					preview: false,
				},
				{
					spotId: 4,
					url: '/images/moon/moonhome3/bedroom.webp',
					preview: false,
				},
				{
					spotId: 4,
					url: '/images/moon/moonhome3/livingroom.webp',
					preview: false,
				},
				{
					spotId: 4,
					url: '/images/moon/moonhome3/kitchen.webp',
					preview: false,
				},

				// Spot 5
				{
					spotId: 5,
					url: '/images/saturn/saturnhome2/saturn5.jpg',
					preview: true,
				},
				{
					spotId: 5,
					url: '/images/saturn/saturnhome2/kitchen.webp',
					preview: false,
				},
				{
					spotId: 5,
					url: '/images/saturn/saturnhome2/livingroom.webp',
					preview: false,
				},
				{
					spotId: 5,
					url: '/images/saturn/saturnhome2/bedroom.webp',
					preview: false,
				},
				{
					spotId: 5,
					url: '/images/saturn/saturnhome2/bathroom.webp',
					preview: false,
				},

				// Spot 6
				{
					spotId: 6,
					url: '/images/moon/moonhome4/bathroom.webp',
					preview: true,
				},
				{
					spotId: 6,
					url: '/images/moon/moonhome4/bedroom.webp',
					preview: false,
				},
				{
					spotId: 6,
					url: '/images/moon/moonhome4/kitchen.webp',
					preview: false,
				},
				{
					spotId: 6,
					url: '/images/saturn/saturn5.jpg',
					preview: false,
				},
				{
					spotId: 6,
					url: '/images/saturn/saturn6.jpg',
					preview: false,
				},

				// Spot 7
				{
					spotId: 7,
					url: '/images/saturn/saturnhome3/main.jpg',
					preview: true,
				},
				{
					spotId: 7,
					url: '/images/saturn/saturnhome3/bedroom.webp',
					preview: false,
				},
				{
					spotId: 7,
					url: '/images/saturn/saturnhome3/bathroom.webp',
					preview: false,
				},
				{
					spotId: 7,
					url: '/images/saturn/saturnhome3/kitchen.webp',
					preview: false,
				},
				{
					spotId: 7,
					url: '/images/saturn/saturnhome3/livingroom.webp',
					preview: false,
				},

				// Spot 8
				{
					spotId: 8,
					url: '/images/moon/moonhome5/main.webp',
					preview: true,
				},
				{
					spotId: 8,
					url: '/images/moon/moonhome5/bedroom.webp',
					preview: false,
				},
				{
					spotId: 8,
					url: '/images/moon/moonhome5/bathroom.webp',
					preview: false,
				},
				{
					spotId: 8,
					url: '/images/moon/moonhome5/kitchen.webp',
					preview: false,
				},
				{
					spotId: 8,
					url: '/images/moon/moonhome5/livingroom.webp',
					preview: false,
				},

				// Spot 9
				{
					spotId: 9,
					url: '/images/saturn/saturnhome4/saturnhome.webp',
					preview: true,
				},
				{
					spotId: 9,
					url: '/images/saturn/saturnhome4/livingroom.webp',
					preview: false,
				},
				{
					spotId: 9,
					url: '/images/saturn/saturnhome4/kitchen.webp',
					preview: false,
				},
				{
					spotId: 9,
					url: '/images/saturn/saturnhome4/bedroom.webp',
					preview: false,
				},
				{
					spotId: 9,
					url: '/images/saturn/saturnhome4/bedroom.webp',
					preview: false,
				},

				// Spot 10
				{
					spotId: 10,
					url: '/images/moon/moonhome6/main.webp',
					preview: true,
				},
				{
					spotId: 10,
					url: '/images/moon/moonhome6/bathroom.webp',
					preview: false,
				},
				{
					spotId: 10,
					url: '/images/moon/moonhome6/bedroom.webp',
					preview: false,
				},
				{
					spotId: 10,
					url: '/images/moon/moonhome6/kitchen.webp',
					preview: false,
				},
				{
					spotId: 10,
					url: '/images/moon/moonhome6/livingroom.webp',
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
						'/images/moon/moonroom5.jpg',
						'/images/moon/moonroom1.jpg',
						'/images/moon/moonroom2.jpg',
						'/images/moon/moonroom3.jpg',
						'/images/moon/moonroom4.jpg',
						'/images/moon/moon2.jpg',
						'/images/moon/moon3.jpg',
						'/images/moon/moon4.jpg',
						'/images/moon/moon5.jpg',
						'/images/moon/moon6.jpg',
						'/images/saturn/saturn1.jpg',
						'/images/saturn/saturn2.jpg',
						'/images/saturn/saturn3.jpg',
						'/images/saturn/saturn4.jpg',
						'/images/saturn/saturn5.jpg',
						'/images/moon/moonroom1.jpg',
						'/images/moon/moonroom2.jpg',
						'/images/moon/moonroom3.jpg',
						'/images/moon/moonroom4.jpg',
						'/images/moon/moonroom5.jpg',
						'/images/saturn/saturn2.jpg',
						'/images/saturn/saturn3.jpg',
						'/images/saturn/saturn4.jpg',
						'/images/saturn/saturn5.jpg',
						'/images/saturn/saturn6.jpg',
						'/images/moon/moonroom2.jpg',
						'/images/moon/moonroom3.jpg',
						'/images/moon/moonroom4.jpg',
						'/images/moon/moonroom5.jpg',
						'/images/moon/moonroom6.jpg',
						'/images/saturn/saturn3.jpg',
						'/images/saturn/saturn4.jpg',
						'/images/saturn/saturn5.jpg',
						'/images/saturn/saturn6.jpg',
						'/images/saturn/saturn7.jpg',
						'/images/moon/moonroom3.jpg',
						'/images/moon/moonroom4.jpg',
						'/images/moon/moonroom5.jpg',
						'/images/moon/moonroom6.jpg',
						'/images/moon/moonroom7.jpg',
						'/images/saturn/saturn4.jpg',
						'/images/saturn/saturn5.jpg',
						'/images/saturn/saturn6.jpg',
						'/images/saturn/saturn7.jpg',
						'/images/saturn/saturn8.jpg',
					],
				},
			},
			{}
		);
	},
};
