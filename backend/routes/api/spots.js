const express = require('express');
const {
	Sequelize,
	Spot,
	SpotImage,
	Review,
	Booking,
	User,
} = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
// Get all spots
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
				attributes: ['stars'],
			},
			{
				model: SpotImage,
				attributes: ['url'],
				where: { preview: true },
				required: false,
			},
		],
		group: ['Spot.id', 'SpotImages.id'],
	});

	const response = spots.map((spot) => {
		const spotData = spot.toJSON();
		return {
			id: spotData.id,
			ownerId: spotData.ownerId,
			address: spotData.address,
			city: spotData.city,
			state: spotData.state,
			country: spotData.country,
			lat: spotData.lat,
			lng: spotData.lng,
			name: spotData.name,
			description: spotData.description,
			price: spotData.price,
			createdAt: spotData.createdAt,
			updatedAt: spotData.updatedAt,
			avgRating: parseFloat(spotData.avgRating).toFixed(1),
			previewImage:
				spotData.SpotImages.length > 0 ? spotData.SpotImages[0].url : null,
		};
	});

	res.status(200).json({ Spots: response });
});
// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
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
				attributes: ['stars'],
			},
			{
				model: SpotImage,
				attributes: ['url'],
				where: { preview: true },
				required: false,
			},
		],
		group: ['Spot.id', 'SpotImages.id'],
	});

	const response = spots.map((spot) => {
		const spotData = spot.toJSON();
		return {
			id: spotData.id,
			ownerId: spotData.ownerId,
			address: spotData.address,
			city: spotData.city,
			state: spotData.state,
			country: spotData.country,
			lat: spotData.lat,
			lng: spotData.lng,
			name: spotData.name,
			description: spotData.description,
			price: spotData.price,
			createdAt: spotData.createdAt,
			updatedAt: spotData.updatedAt,
			avgRating: parseFloat(spotData.avgRating).toFixed(1),
			previewImage:
				spotData.SpotImages.length > 0 ? spotData.SpotImages[0].url : null,
		};
	});
	res.status(200).json({ Spots: response });
});

router.get('/:spotsId');

module.exports = router;
