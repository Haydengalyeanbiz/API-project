'use strict';
const { Spot, Sequelize } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await Spot.bulkCreate(
			[
				{
					ownerId: 1,
					address: '123 Main St',
					city: 'Anytown',
					state: 'CA',
					country: 'USA',
					lat: 34.0522,
					lng: -118.2437,
					name: 'Cozy Cottage',
					description:
						'A cozy cottage in the heart of the city. Close to all amenities and attractions.',
					price: 120.0,
				},
				{
					ownerId: 1,
					address: '456 Elm St',
					city: 'Somewhere',
					state: 'TX',
					country: 'USA',
					lat: 29.7604,
					lng: -95.3698,
					name: 'Urban Retreat',
					description:
						'A modern urban retreat with all the comforts of home. Perfect for a weekend getaway.',
					price: 150.0,
				},
				{
					ownerId: 2,
					address: '789 Oak St',
					city: 'Elsewhere',
					state: 'NY',
					country: 'USA',
					lat: 40.7128,
					lng: -74.006,
					name: 'Downtown Loft',
					description:
						'A stylish loft in the downtown area. Great for business trips and short stays.',
					price: 200.0,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		options.tableName = 'Spots';
		const Op = Sequelize.Op;
		await Spot.bulkDelete(options, {
			name: { [Op.in]: ['Downtown Loft', 'Urban Retreat', 'Cozy Cottage'] },
		});
	},
};
