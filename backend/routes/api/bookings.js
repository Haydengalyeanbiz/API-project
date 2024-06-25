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

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const bookings = await Booking.findAll({
		where: {
			userId,
		},
		include: [
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
				attributes: {
					model: SpotImage,
					attributes: ['url'],
					where: {
						preview: true,
					},
					required: false,
				},
			},
		],
	});
	const response = bookings.map((booking) => {
		const spot = booking.Spot;
		return {
			id: booking.id,
			spotId: spot.id,
			Spot: {
				id: spot.id,
				ownerId: spot.ownerId,
				address: spot.address,
				city: spot.city,
				state: spot.state,
				country: spot.country,
				lat: spot.lat,
				lng: spot.lng,
				name: spot.name,
				price: spot.price,
				previewImage: spot.SpotImages[0] ? spot.SpotImages[0].url : null,
			},
			userId: booking.userId,
			startDate: booking.startDate,
			endDate: booking.endDate,
			createdAt: booking.createdAt,
			updatedAt: booking.updatedAt,
		};
	});
	res.status(200).json({ Bookings: response });
});

module.exports = router;
