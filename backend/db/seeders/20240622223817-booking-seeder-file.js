'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await Booking.bulkCreate(
			[
				{
					userId: 1,
					spotId: 1,
					startDate: new Date('2027-07-20'),
					endDate: new Date('2027-07-27'),
				},
				{
					userId: 2,
					spotId: 2,
					startDate: new Date('2025-07-02'),
					endDate: new Date('2025-07-08'),
				},
				{
					userId: 3,
					spotId: 3,
					startDate: new Date('2026-06-29'),
					endDate: new Date('2026-07-03'),
				},
				{
					userId: 4,
					spotId: 4,
					startDate: new Date('2027-07-06'),
					endDate: new Date('2027-07-11'),
				},
				{
					userId: 5,
					spotId: 5,
					startDate: new Date('2028-06-30'),
					endDate: new Date('2028-07-04'),
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Bookings';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				spotId: { [Op.in]: [1, 2, 3] },
				userId: { [Op.in]: [1, 2, 3] },
			},
			{}
		);
	},
};
