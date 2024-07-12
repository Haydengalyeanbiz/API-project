'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await User.bulkCreate(
			[
				{
					email: 'demo@user.io',
					username: 'Demo-lition',
					hashedPassword: bcrypt.hashSync('password'),
					firstName: 'Demo1',
					lastName: 'User1',
				},
				{
					username: 'lunar_explorer',
					firstName: 'Neil',
					lastName: 'Armstrong',
					email: 'neil@planetbnb.com',
					hashedPassword: bcrypt.hashSync('password'),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: 'mars_marauder',
					firstName: 'Buzz',
					lastName: 'Aldrin',
					email: 'buzz@planetbnb.com',
					hashedPassword: bcrypt.hashSync('password'),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: 'stellar_navigator',
					firstName: 'Sally',
					lastName: 'Ride',
					email: 'sally@planetbnb.com',
					hashedPassword: bcrypt.hashSync('password'),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: 'galactic_pioneer',
					firstName: 'Yuri',
					lastName: 'Gagarin',
					email: 'yuri@planetbnb.com',
					hashedPassword: bcrypt.hashSync('password'),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: 'cosmic_voyager',
					firstName: 'Valentina',
					lastName: 'Tereshkova',
					email: 'valentina@planetbnb.com',
					hashedPassword: bcrypt.hashSync('password'),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Users';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
			},
			{}
		);
	},
};
