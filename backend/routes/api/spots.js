const express = require('express');
const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op, Sequelize } = require('sequelize');
const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
	const spots = await Spot.findAll({
		attributes: {
			include: [
				[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
			],
		},
		include: [
			{
				model: Review,
				as: 'Reviews',
				attributes: [],
			},
			{
				model: SpotImage,
				as: 'SpotImages',
				attributes: ['url'],
				where: { preview: true },
				required: false,
			},
		],
		group: ['Spot.id', 'SpotImages.id'],
	});

	const response = spots.map((spot) => ({
		id: spot.id,
		ownerId: spot.ownerId,
		address: spot.address,
		city: spot.city,
		state: spot.state,
		country: spot.country,
		lat: spot.lat,
		lng: spot.lng,
		name: spot.name,
		description: spot.description,
		price: spot.price,
		createdAt: spot.createdAt,
		updatedAt: spot.updatedAt,
		avgRating: parseFloat(spot.dataValues.avgRating).toFixed(1),
		previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
	}));

	res.status(200).json({ Spots: response });
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
	try {
		const spots = await Spot.findAll({
			where: {
				ownerId: req.user.id,
			},
			attributes: {
				include: [
					[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
				],
			},
			include: [
				{
					model: Review,
					as: 'Reviews',
					attributes: ['stars'],
				},
				{
					model: SpotImage,
					as: 'SpotImages',
					attributes: ['url'],
					where: { preview: true },
					required: false,
				},
			],
			group: ['Spot.id', 'SpotImages.id'],
		});

		const response = spots.map((spot) => ({
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: spot.lat,
			lng: spot.lng,
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: spot.createdAt,
			updatedAt: spot.updatedAt,
			avgRating: parseFloat(spot.dataValues.avgRating).toFixed(1),
			previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
		}));

		res.status(200).json({ Spots: response });
	} catch (error) {
		next(error);
	}
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
	const spotId = req.params.spotId;

	const spot = await Spot.findByPk(spotId, {
		include: [
			{
				model: Review,
				attributes: [],
				as: 'Reviews',
			},
			{
				model: SpotImage,
				attributes: ['id', 'url', 'preview'],
				as: 'SpotImages',
			},
			{
				model: User,
				as: 'Owner',
				attributes: ['id', 'firstName', 'lastName'],
			},
		],
		attributes: {
			include: [
				[Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
				[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating'],
			],
		},
		group: ['Spot.id', 'SpotImages.id', 'Owner.id'],
	});

	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	const spotData = spot.toJSON();
	spotData.avgStarRating = parseFloat(spotData.avgStarRating).toFixed(1);

	res.status(200).json(spotData);
});

//Create a Spot
router.post('/', requireAuth, async (req, res) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	// Validation checks
	if (!address) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { address: 'Street address is required' },
		});
	}
	if (!city) {
		return res
			.status(400)
			.json({ message: 'Bad Request', errors: { city: 'City is required' } });
	}
	if (!state) {
		return res
			.status(400)
			.json({ message: 'Bad Request', errors: { state: 'State is required' } });
	}
	if (!country) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { country: 'Country is required' },
		});
	}
	if (lat < -90 || lat > 90) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { lat: 'Latitude must be within -90 and 90' },
		});
	}
	if (lng < -180 || lng > 180) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { lng: 'Longitude must be within -180 and 180' },
		});
	}
	if (name.length > 50) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { name: 'Name must be less than 50 characters' },
		});
	}
	if (!description) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { description: 'Description is required' },
		});
	}
	if (price <= 0) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { price: 'Price per day must be a positive number' },
		});
	}
	const spot = await Spot.create({
		ownerId: req.user.id, // Assuming ownerId comes from authenticated user
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	});
	res.status(201).json({
		address: spot.address,
		city: spot.city,
		state: spot.state,
		country: spot.country,
		lat: spot.lat,
		lng: spot.lng,
		name: spot.name,
		description: spot.description,
		price: spot.price,
	});
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
	const { spotId } = req.params.spotId;
	const { url, preview } = req.body;
	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}
	if (spot.owner !== req.user.id) {
		return res.status(403).json({ message: 'Unauthorized' });
	}
	const newImage = await SpotImage.create({
		spotId: spot.id,
		url,
		preview,
	});
	res.status(200).json({
		id: newImage.id,
		url: newImage.url,
		preview: newImage.preview,
	});
});

router.put('/:spotId', requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	const spot = await Spot.findByPk(spotId);

	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}
	if (spot.ownerId !== req.user.id) {
		return res.status(403).json({ message: 'Unauthorized' });
	}
	const errors = {};
	if (!address) errors.address = 'Street address is required';
	if (!city) errors.city = 'City is required';
	if (!state) errors.state = 'State is required';
	if (!country) errors.country = 'Country is required';
	if (typeof lat !== 'number' || lat < -90 || lat > 90)
		errors.lat = 'Latitude must be within -90 and 90';
	if (typeof lng !== 'number' || lng < -180 || lng > 180)
		errors.lng = 'Longitude must be within -180 and 180';
	if (!name || name.length > 50)
		errors.name = 'Name must be less than 50 characters';
	if (!description) errors.description = 'Description is required';
	if (typeof price !== 'number' || price <= 0)
		errors.price = 'Price per day must be a positive number';
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({
			message: 'Bad Request',
			errors,
		});
	}
	await spot.update({
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	});
	res.status(200).json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
	const { spotId } = req.params.spotId;
	const userId = req.user.id;
	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
		});
	}
	if (spot.ownerId !== userId) {
		return res.status(403).json({ message: 'Unauthorized' });
	}
	await spot.destroy();
	res.status(200).json({
		message: 'Successfully deleted',
	});
});

module.exports = router;
