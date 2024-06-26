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
				include: [
					{
						model: SpotImage,
						as: 'SpotImages',
						attributes: ['url'],
						where: {
							preview: true,
						},
						required: false,
					},
				],
			},
		],
	});
	const response = bookings.map((booking) => {
		const spot = booking.Spot;
		const previewImage =
			spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;
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
				previewImage,
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

//Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
	const bookingId = req.params.bookingId;
	const userId = req.user.id;
	const { startDate, endDate } = req.body;
	const booking = await Booking.findByPk(bookingId);
	if (!booking) {
		return res.status(404).json({
			message: "Booking couldn't be found",
		});
	}
	if (booking.userId !== userId) {
		return res.status(403).json({ message: 'Unauthorized' });
	}
	const now = new Date();
	if (new Date(booking.endDate) < now) {
		return res.status(403).json({
			message: "Past bookings can't be modified",
		});
	}
	const newStartDate = new Date(startDate);
	const newEndDate = new Date(endDate);
	if (newStartDate < now) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: {
				startDate: 'startDate cannot be in the past',
			},
		});
	}
	if (newEndDate <= newStartDate) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: {
				endDate: 'endDate cannot be on or before startDate',
			},
		});
	}
	const conflictingBookings = await Booking.findAll({
		where: {
			spotId: booking.spotId,
			id: {
				[Op.ne]: bookingId,
			},
			[Op.or]: [
				{
					startDate: {
						[Op.between]: [newStartDate, newEndDate],
					},
				},
				{
					endDate: {
						[Op.between]: [newStartDate, newEndDate],
					},
				},
				{
					[Op.and]: [
						{ startDate: { [Op.lte]: newStartDate } },
						{ endDate: { [Op.gte]: newEndDate } },
					],
				},
			],
		},
	});
	if (conflictingBookings.length > 0) {
		return res.status(403).json({
			message: 'Sorry, this spot is already booked for the specified dates',
			errors: {
				startDate: 'Start date conflicts with an existing booking',
				endDate: 'End date conflicts with an existing booking',
			},
		});
	}
	booking.startDate = newStartDate;
	booking.endDate = newEndDate;
	await booking.save();

	return res.status(200).json({
		id: booking.id,
		spotId: booking.spotId,
		userId: booking.userId,
		startDate: booking.startDate,
		endDate: booking.endDate,
		createdAt: booking.createdAt,
		updatedAt: booking.updatedAt,
	});
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
	const bookingId = req.params.bookingId;
	if (bookingId === 'null') {
		return res.status(404).json({
			message: 'Not found',
		});
	}
	const userId = req.user.id;
	const booking = await Booking.findByPk(bookingId);
	if (!booking) {
		return res.status(404).json({
			message: "Booking couldn't be found",
		});
	}
	const spot = await Spot.findByPk(booking.spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
		});
	}
	if (booking.userId !== userId && spot.ownerId !== userId) {
		return res.status(403).json({ message: 'Unauthorized' });
	}
	const now = new Date();
	if (new Date(booking.startDate) <= now) {
		return res.status(403).json({
			message: "Bookings that have been started can't be deleted",
		});
	}
	await booking.destroy();
	return res.status(200).json({
		message: 'Successfully deleted',
	});
});
module.exports = router;
