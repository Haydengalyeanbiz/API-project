'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await ReviewImage.bulkCreate(
			[
				{
					reviewId: 1,
					url: 'https://example.com/image1.jpg',
				},
				{
					reviewId: 1,
					url: 'https://example.com/image2.jpg',
				},
				{
					reviewId: 2,
					url: 'https://example.com/image3.jpg',
				},
				{
					reviewId: 2,
					url: 'https://example.com/image4.jpg',
				},
				{
					reviewId: 3,
					url: 'https://example.com/image5.jpg',
				},
				{
					reviewId: 4,
					url: 'https://example.com/image6.jpg',
				},
				{
					reviewId: 5,
					url: 'https://example.com/image7.jpg',
				},
				{
					reviewId: 6,
					url: 'https://example.com/image8.jpg',
				},
				{
					reviewId: 7,
					url: 'https://example.com/image9.jpg',
				},
				{
					reviewId: 8,
					url: 'https://example.com/image10.jpg',
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'ReviewImages';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				url: {
					[Op.in]: [
						'https://example.com/review_image1.jpg',
						'https://example.com/review_image2.jpg',
						'https://example.com/review_image3.jpg',
						'https://example.com/review_image4.jpg',
						'https://example.com/review_image5.jpg',
						'https://example.com/review_image6.jpg',
					],
				},
			},
			{}
		);
	},
};
