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
					address: '100 Apollo Ave',
					city: 'Moon Base',
					state: 'Lunar',
					country: 'Moon',
					lat: 0.67408,
					lng: 23.47297,
					name: 'Tranquility Base',
					description:
						'A serene spot on the Moon, perfect for those seeking peace and quiet away from Earth.',
					price: 500.0,
				},
				{
					ownerId: 2,
					address: '456 Mars Rd',
					city: 'Valles Marineris',
					state: 'Mars',
					country: 'Mars',
					lat: -14.235,
					lng: 75.251,
					name: 'Red Planet Retreat',
					description:
						'Experience the rugged beauty of Mars with a stay at this comfortable and well-equipped base.',
					price: 750.0,
				},
				{
					ownerId: 3,
					address: '789 Jupiter Ln',
					city: 'Great Red Spot',
					state: 'Jovian',
					country: 'Jupiter',
					lat: -22.8426,
					lng: -142.5151,
					name: 'Storm Chaser Haven',
					description:
						'Located near Jupiter’s Great Red Spot, this haven offers stunning views of the planet’s massive storm.',
					price: 1000.0,
				},
				{
					ownerId: 4,
					address: '101 Saturn Blvd',
					city: 'Ring View',
					state: 'Saturn',
					country: 'Saturn',
					lat: -30.0444,
					lng: -60.0646,
					name: 'Ringside Residence',
					description:
						'Enjoy panoramic views of Saturn’s rings from this luxurious residence.',
					price: 1200.0,
				},
				{
					ownerId: 5,
					address: '102 Titan St',
					city: 'Methane Lakes',
					state: 'Titan',
					country: 'Saturn',
					lat: 22.4127,
					lng: 78.6946,
					name: 'Titan Tranquility',
					description:
						'Relax by the methane lakes of Titan in this cozy and futuristic spot.',
					price: 800.0,
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
