'use strict';
const { Spot, Sequelize } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate(
			[
				// spot1
				{
					ownerId: 1,
					address: 'Lunar Base 2',
					city: 'Luna',
					state: 'Moon',
					country: 'Lunar Colony',
					lat: 0.7,
					lng: -23.5,
					name: 'Lunar Escape Pod',
					description:
						"Nestled in the tranquil serenity of the Moon's surface, the Lunar Escape Pod offers an otherworldly experience. Enjoy the stark beauty of lunar landscapes from the comfort of your pod, complete with panoramic windows and modern amenities. Perfect for stargazing, this getaway promises a unique blend of isolation and luxury, allowing you to disconnect from Earth and reconnect with the cosmos.",
					price: 250.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot2
				{
					ownerId: 1,
					address: 'Starlight Road 3',
					city: 'Galaxia',
					state: 'Moon',
					country: 'Andromeda Galaxy',
					lat: 41.2,
					lng: 2.1,
					name: 'Galactic Getaway',
					description:
						'The Galactic Getaway is your ultimate retreat among the stars. Located in the heart of the Andromeda Galaxy, this luxurious haven offers breathtaking views of celestial bodies and cosmic phenomena. With its opulent interiors and state-of-the-art facilities, you can unwind in style while exploring the mysteries of the universe. A perfect fusion of elegance and adventure, this spot ensures a memorable stay.',
					price: 450.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot3
				{
					ownerId: 2,
					address: 'Nebula Heights 4',
					city: 'Nebulon',
					state: 'Saturn',
					country: 'Nebula Galaxy',
					lat: 23.4,
					lng: -45.6,
					name: 'Nebula Nights',
					description:
						'Experience the ethereal beauty of the Nebula Galaxy at Nebula Nights. This celestial abode is designed for those seeking a truly unique and mesmerizing stay. Surrounded by colorful nebulae, the nights here are nothing short of magical. The accommodation boasts a cozy, intimate atmosphere with all the modern comforts you need, making it an ideal choice for a romantic getaway or a peaceful retreat.',
					price: 350.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot4
				{
					ownerId: 2,
					address: 'Planetary Path 5',
					city: 'Moonville',
					state: 'Moon',
					country: 'Moonia Planet',
					lat: -4.6,
					lng: 135.5,
					name: 'Moon Vista',
					description:
						"Immerse yourself in the breathtaking beauty of Moon at Moon Vista. This luxurious spot offers stunning views of the planet's vibrant landscapes and swirling clouds. With its elegant design and high-end amenities, Moon Vista provides a perfect blend of comfort and adventure. Whether you're exploring the planet's surface or simply relaxing and soaking in the views, this is the ultimate Venusian experience.",
					price: 400.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot5
				{
					ownerId: 3,
					address: 'Asteroid Alley 6',
					city: 'Asteroid Belt',
					state: 'Belt',
					country: 'Saturn',
					lat: 3.5,
					lng: -55.2,
					name: 'Asteroid Hideaway',
					description:
						'Asteroid Hideaway is a unique retreat situated in the asteroid belt. This secluded spot offers a truly one-of-a-kind experience, surrounded by the rugged beauty of floating asteroids. The cozy, well-appointed interiors provide a stark contrast to the raw, untouched exterior. Ideal for adventurers and solitude seekers alike, this hideaway promises an unforgettable stay in the heart of the cosmos.',
					price: 220.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot6
				{
					ownerId: 3,
					address: 'Comet Cove 7',
					city: 'Comet Town',
					state: 'Comet',
					country: 'Moon',
					lat: 5.1,
					lng: 78.4,
					name: 'Comet Cabin',
					description:
						'Comet Cabin offers an exhilarating stay amidst the thrill of passing comets. Located in Comet Town, this cabin provides a front-row seat to the spectacular cosmic show. The rustic yet comfortable interior ensures a warm and inviting atmosphere. Perfect for astronomy enthusiasts and adventure seekers, Comet Cabin is a unique blend of excitement and relaxation.',
					price: 180.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot7
				{
					ownerId: 4,
					address: 'Starbase 8',
					city: 'Starport',
					state: 'Starland',
					country: 'Saturn',
					lat: 15.6,
					lng: -20.3,
					name: 'Starbase Station',
					description:
						'Starbase Station is a vibrant hub in the cosmos, offering a lively and dynamic atmosphere. Located in Starport, this spot is perfect for those looking to explore the bustling life of a cosmic city. The accommodation features modern design and all the amenities needed for a comfortable stay. Enjoy the vibrant nightlife, diverse culture, and the constant hum of activity in this stellar destination.',
					price: 500.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot8
				{
					ownerId: 4,
					address: 'Interstellar Drive 9',
					city: 'Cosmic City',
					state: 'Interstellar',
					country: 'Moon',
					lat: 42.0,
					lng: 75.5,
					name: 'Interstellar Inn',
					description:
						'Interstellar Inn is your home away from home in space. Located in the heart of Cosmic City, this inn offers a cozy and welcoming atmosphere with all the comforts of Earth. The charming interiors and friendly service make it a perfect choice for travelers looking for a familiar yet exciting experience. Explore the interstellar wonders by day and relax in the comfort of your inn by night.',
					price: 280.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot9
				{
					ownerId: 5,
					address: 'Orbit Lane 10',
					city: 'Orbitopolis',
					state: 'Saturn',
					country: 'Orbit Zone',
					lat: 23.1,
					lng: -15.5,
					name: 'Orbit Oasis',
					description:
						"Orbit Oasis is a serene retreat in the heart of orbiting planets. This tranquil spot offers stunning views of planetary orbits and celestial bodies. The elegant and modern design of the accommodation ensures a comfortable and luxurious stay. Whether you're here for relaxation or exploration, Orbit Oasis provides the perfect backdrop for your cosmic adventures.",
					price: 300.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				//spot10
				{
					ownerId: 5,
					address: 'Pulsar Place 11',
					city: 'Pulsar Town',
					state: 'Moon',
					country: 'Pulsar Galaxy',
					lat: 30.4,
					lng: 60.1,
					name: 'Pulsar Palace',
					description:
						"Pulsar Palace offers a dazzling stay near pulsars, with breathtaking views of these celestial phenomena. The luxurious interiors and top-notch amenities make it a perfect choice for those seeking both adventure and comfort. Watch the pulsars' mesmerizing light show from the comfort of your palace, and immerse yourself in the wonders of the universe.",
					price: 375.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot11
				{
					ownerId: 6,
					address: 'Solar Street 12',
					city: 'Solaris',
					state: 'Mars',
					country: 'Solar System',
					lat: -16.3,
					lng: 45.0,
					name: 'Solar Sanctuary',
					description:
						"Solar Sanctuary is a radiant retreat in the solar system, offering an unparalleled solar experience. Located in Solaris, this sanctuary provides stunning views of the sun and surrounding planets. The spacious and elegant interiors are designed for comfort and luxury. Whether you're soaking in the solar rays or exploring the solar system, this sanctuary is the perfect escape.",
					price: 410.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot12
				{
					ownerId: 6,
					address: 'Eclipse Avenue 13',
					city: 'Eclipsia',
					state: 'Mars',
					country: 'Eclipse Realm',
					lat: 22.7,
					lng: 88.2,
					name: 'Eclipse Escapade',
					description:
						'Eclipse Escapade offers a mystical experience during eclipses, located in the enchanting Eclipsia. This spot provides front-row seats to the celestial spectacle of eclipses. The accommodation is designed for comfort and luxury, with modern amenities and elegant interiors. Perfect for eclipse chasers and astronomy enthusiasts, Eclipse Escapade promises an unforgettable stay.',
					price: 330.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot13
				{
					ownerId: 1,
					address: 'Gravity Way 14',
					city: 'Graviton',
					state: 'Saturn',
					country: 'Gravity Galaxy',
					lat: 12.6,
					lng: 90.9,
					name: 'Gravity Gateway',
					description:
						'Gravity Gateway offers a unique experience with its gravity-defying settings. Located in Graviton, this spot provides an adventurous stay for those looking to explore different gravity environments. The modern and stylish interiors ensure a comfortable stay, while the unique gravity settings offer a fun and exciting twist. Perfect for thrill-seekers and adventure lovers.',
					price: 290.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot14
				{
					ownerId: 2,
					address: 'Quantum Quarters 15',
					city: 'Quantopia',
					state: 'Mars',
					country: 'Quantum World',
					lat: 18.2,
					lng: 30.0,
					name: 'Quantum Quarters',
					description:
						'Step into the world of quantum mechanics at Quantum Quarters. This spot offers a fascinating stay in the heart of Quantopia, with unique experiences based on quantum principles. The elegant and modern design of the quarters ensures a luxurious stay, while the quantum-themed activities provide a unique and educational experience. Perfect for science enthusiasts and curious travelers.',
					price: 410.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot15
				{
					ownerId: 3,
					address: 'Spaceway 16',
					city: 'Starship City',
					state: 'Mars',
					country: 'Starship Universe',
					lat: 35.0,
					lng: 70.5,
					name: 'Spaceway Suites',
					description:
						'Spaceway Suites offers luxurious suites for space travelers, located in the bustling Starship City. The suites are designed with comfort and elegance in mind, providing a perfect retreat after a day of exploration. The modern amenities and stylish interiors make it an ideal choice for those seeking a high-end space experience. Enjoy the vibrant city life and return to the comfort of your suite at Spaceway Suites.',
					price: 450.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot16
				{
					ownerId: 4,
					address: 'Meteor Meadow 17',
					city: 'Meteor Town',
					state: 'Mars',
					country: 'Meteor Region',
					lat: 5.5,
					lng: 120.3,
					name: 'Meteor Manor',
					description:
						'Meteor Manor offers a charming stay in a meteorite house, located in the picturesque Meteor Town. The rustic yet comfortable interiors provide a warm and inviting atmosphere, perfect for a cozy getaway. Enjoy the unique charm of living in a meteorite, with all the modern amenities you need for a comfortable stay. Perfect for those looking for a unique and memorable experience.',
					price: 260.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot17
				{
					ownerId: 5,
					address: 'Nebula Grove 18',
					city: 'Nebula City',
					state: 'Moon',
					country: 'Nebula Zone',
					lat: 25.6,
					lng: -60.7,
					name: 'Nebula Nook',
					description:
						'Nebula Nook is an inviting nook in the nebula, offering a peaceful and serene stay. Located in Nebula City, this spot provides stunning views of colorful nebulae and celestial phenomena. The cozy and well-appointed interiors ensure a comfortable stay, making it an ideal choice for a relaxing retreat. Immerse yourself in the beauty of the nebula and enjoy the tranquility of Nebula Nook.',
					price: 370.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot18
				{
					ownerId: 6,
					address: 'Vortex View 19',
					city: 'Vortexia',
					state: 'Moon',
					country: 'Vortex Galaxy',
					lat: 10.4,
					lng: -50.1,
					name: 'Vortex Villa',
					description:
						'Vortex Villa offers a stunning view of cosmic vortices, located in the mesmerizing Vortexia. This luxurious villa is designed for comfort and elegance, with modern amenities and stylish interiors. Enjoy the breathtaking views of vortices from the comfort of your villa, and experience the thrill of being in the heart of cosmic activity. Perfect for those seeking both adventure and relaxation.',
					price: 325.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot19
				{
					ownerId: 1,
					address: 'Astro Alley 20',
					city: 'Astropolis',
					state: 'Moon',
					country: 'Astro Universe',
					lat: 45.0,
					lng: 95.0,
					name: 'Astro Abode',
					description:
						'Astro Abode is a comfortable abode in the stars, located in the charming Astropolis. The modern and stylish design of the abode ensures a luxurious stay, with all the amenities you need for comfort. Explore the wonders of the universe by day and relax in the comfort of your abode by night. Perfect for those looking for a blend of adventure and comfort in a celestial setting.',
					price: 380.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// spot20
				{
					ownerId: 1,
					address: 'Galactic Avenue 1',
					city: 'Mars City',
					state: 'Mars',
					country: 'Mars Planet',
					lat: 18.5,
					lng: 77.3,
					name: 'Red Planet Retreat',
					description:
						"Welcome to Mars Oasis, your ultimate getaway on the Red Planet! Nestled in the serene Vallis Marineris canyon system, our luxurious dome offers an unparalleled Martian experience. Imagine waking up to the breathtaking sight of the planet's iconic rusty landscape stretching as far as the eye can see. Our state-of-the-art dome features a spacious living area with panoramic windows, providing a stunning view of the two moons, Phobos and Deimos, dancing in the sky.",
					price: 300.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Spots';
		const Op = Sequelize.Op;
		await Spot.bulkDelete(options, {
			ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
		});
	},
};
