const express = require('express');
const {
	Spot,
	SpotImage,
	Review,
	Booking,
	User,
	ReviewImage,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op, Sequelize } = require('sequelize');
const router = express.Router();

// Get all Reviews of the current user
router.get('/current', async (req, res) => {
	const userId = req.user.id;
	const reviews = await Review.findAll({
		where: { userId },
		include: [
			{
				model: User,
				attributes: ['id', 'firstName', 'lastName'],
			},
			{
				model: Spot,
				attributes: [
					'id',
					'ownerId',
					'address',
					'city',
					'state',
					'country',
					'lat',
					'lng',
					'name',
					'price',
				],
				include: {
					model: SpotImage,
					as: 'SpotImages',
					attributes: ['url'],
					where: { preview: true },
					required: false,
				},
			},
			{
				model: ReviewImage,
				attributes: ['id', 'url'],
			},
		],
	});

	return res.status(200).json({ Reviews: reviews });
});

module.exports = router;

// router.get('/current', requireAuth, async (req, res) => {
// 	const currentUser = req.user.id;
// 	const reviews = Review.findAll({
// 		where: {
// 			userId: currentUser,
// 		},
// 	});
// });
