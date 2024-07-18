const express = require('express');
const {
	Spot,
	SpotImage,
	Review,
	ReviewImage,
	Booking,
	User,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op, Sequelize } = require('sequelize');
const router = express.Router();

const formatDate = (date) => {
	const isoString = date.toISOString();
	return isoString.substring(0, 19).replace('T', ' ');
};

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
	try {
		const spots = await Spot.findAll({
			where: {
				ownerId: req.user.id,
			},
		});

		const response = await Promise.all(
			spots.map(async (spot) => {
				const reviews = await Review.findAll({
					where: {
						spotId: spot.id,
					},
					attributes: ['stars'],
				});

				const avgRating =
					reviews.length > 0
						? (
								reviews.reduce((sum, review) => sum + review.stars, 0) /
								reviews.length
						  ).toFixed(1)
						: null;

				const spotImage = await SpotImage.findOne({
					where: {
						spotId: spot.id,
						preview: true,
					},
					attributes: ['url'],
				});

				return {
					id: spot.id,
					ownerId: spot.ownerId,
					address: spot.address,
					city: spot.city,
					state: spot.state,
					country: spot.country,
					lat: parseFloat(spot.lat),
					lng: parseFloat(spot.lng),
					name: spot.name,
					description: spot.description,
					price: spot.price,
					createdAt: formatDate(spot.createdAt),
					updatedAt: formatDate(spot.updatedAt),
					avgRating,
					previewImage: spotImage ? spotImage.url : null,
				};
			})
		);

		res.status(200).json({ Spots: response });
	} catch (err) {
		next(err);
	}
});

// Get all Reviews by a Spot's Id
router.get('/:spotId/reviews', async (req, res, next) => {
	try {
		const spotId = req.params.spotId;

		if (spotId === 'null') {
			return res.status(404).json({
				message: 'Not found',
			});
		}

		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({
				message: "Spot couldn't be found",
			});
		}

		const allSpotReviews = await Review.findAll({
			where: { spotId },
			include: [
				{
					model: User,
					attributes: ['id', 'firstName', 'lastName'],
				},
				{
					model: ReviewImage,
					attributes: ['id', 'url'],
				},
			],
		});

		const response = allSpotReviews.map((review) => ({
			id: review.id,
			userId: review.userId,
			spotId: review.spotId,
			review: review.review,
			stars: review.stars,
			createdAt: formatDate(review.createdAt),
			updatedAt: formatDate(review.updatedAt),
			User: review.User,
			ReviewImages: review.ReviewImages,
		}));

		res.status(200).json({ Reviews: response });
	} catch (err) {
		next(err);
	}
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	if (spotId === 'null') {
		return res.status(404).json({
			message: 'Not found',
		});
	}
	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
		});
	}
	const bookings = await Booking.findAll({
		where: { spotId },
		include: [
			{
				model: User,
				attributes: ['id', 'firstName', 'lastName'],
				as: 'User',
			},
		],
		order: [['createdAt', 'DESC']], // Example ordering by createdAt
	});
	const isOwner = req.user && req.user.id === spot.ownerId;
	if (isOwner) {
		const formattedBookings = bookings.map((booking) => ({
			User: booking.User,
			id: booking.id,
			spotId: booking.spotId,
			userId: booking.userId,
			startDate: booking.startDate.toISOString().slice(0, 10),
			endDate: booking.endDate.toISOString().slice(0, 10),
			createdAt: formatDate(booking.createdAt),
			updatedAt: formatDate(booking.updatedAt),
		}));
		return res.status(200).json({ Bookings: formattedBookings });
	} else {
		const simplifiedBookings = bookings.map((booking) => ({
			spotId: booking.spotId,
			startDate: booking.startDate.toISOString().slice(0, 10),
			endDate: booking.endDate.toISOString().slice(0, 10),
		}));
		return res.status(200).json({ Bookings: simplifiedBookings });
	}
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
	const spotId = req.params.spotId;

	try {
		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({
				message: "Spot couldn't be found",
				statusCode: 404,
			});
		}

		const reviews = await Review.findAll({
			where: { spotId },
			attributes: ['stars'],
		});

		const numReviews = reviews.length;
		const avgStarRating =
			numReviews > 0
				? (
						reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews
				  ).toFixed(1)
				: null;

		const spotImages = await SpotImage.findAll({
			where: { spotId },
			attributes: ['id', 'url', 'preview'],
		});

		const owner = await User.findByPk(spot.ownerId, {
			attributes: ['id', 'firstName', 'lastName'],
		});

		const spotData = {
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: parseFloat(spot.lat),
			lng: parseFloat(spot.lng),
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: formatDate(spot.createdAt),
			updatedAt: formatDate(spot.updatedAt),
			numReviews,
			avgStarRating,
			SpotImages: spotImages,
			Owner: owner,
		};

		res.status(200).json(spotData);
	} catch (err) {
		next(err);
	}
});

// Get all spots with query filters
router.get('/', async (req, res) => {
	try {
		let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

		// // Default values for pagination
		// page = parseInt(page) || 1;
		// size = parseInt(size) || 20;

		const errors = {};

		// // Validate pagination parameters
		// if (page < 1 || page > 10) {
		// 	errors.page = 'Page must be between 1 and 10';
		// }
		// if (size < 1 || size > 20) {
		// 	errors.size = 'Size must be between 1 and 20';
		// }

		// Validate and set latitude and longitude filters
		if (minLat !== undefined) {
			const lat = parseFloat(minLat);
			if (isNaN(lat) || lat < -90 || lat > 90) {
				errors.minLat = 'Minimum latitude is invalid';
			}
		}

		if (maxLat !== undefined) {
			const lat = parseFloat(maxLat);
			if (isNaN(lat) || lat < -90 || lat > 90) {
				errors.maxLat = 'Maximum latitude is invalid';
			}
		}

		if (minLng !== undefined) {
			const lng = parseFloat(minLng);
			if (isNaN(lng) || lng < -180 || lng > 180) {
				errors.minLng = 'Minimum longitude is invalid';
			}
		}

		if (maxLng !== undefined) {
			const lng = parseFloat(maxLng);
			if (isNaN(lng) || lng < -180 || lng > 180) {
				errors.maxLng = 'Maximum longitude is invalid';
			}
		}

		// Validate and set price filters
		if (minPrice !== undefined) {
			const price = parseFloat(minPrice);
			if (isNaN(price) || price < 0) {
				errors.minPrice = 'Minimum price must be greater than or equal to 0';
			}
		}

		if (maxPrice !== undefined) {
			const price = parseFloat(maxPrice);
			if (isNaN(price) || price < 0) {
				errors.maxPrice = 'Maximum price must be greater than or equal to 0';
			}
		}

		// If there are validation errors, return a 400 status with the errors
		if (Object.keys(errors).length > 0) {
			return res.status(400).json({ message: 'Bad Request', errors });
		}

		const where = {};

		// Apply latitude and longitude filters if they exist
		if (minLat !== undefined) where.lat = { [Op.gte]: parseFloat(minLat) };
		if (maxLat !== undefined)
			where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
		if (minLng !== undefined) where.lng = { [Op.gte]: parseFloat(minLng) };
		if (maxLng !== undefined)
			where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };

		// Apply price filters if they exist
		if (minPrice !== undefined)
			where.price = { [Op.gte]: parseFloat(minPrice) };
		if (maxPrice !== undefined)
			where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

		// Fetch spots with filters and pagination
		const spots = await Spot.findAll({
			where,
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
				'description',
				'price',
				'createdAt',
				'updatedAt',
			],
			// limit: size,
			// offset: (page - 1) * size,
		});

		// Fetch related data in a lazy load manner
		const spotIds = spots.map((spot) => spot.id);

		const reviews = await Review.findAll({
			attributes: [
				'spotId',
				[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
			],
			where: { spotId: spotIds },
			group: ['spotId'],
		});

		const spotImages = await SpotImage.findAll({
			attributes: ['spotId', 'url'],
			where: {
				spotId: spotIds,
				preview: true,
			},
		});

		const reviewsMap = reviews.reduce((acc, review) => {
			acc[review.spotId] = parseFloat(review.dataValues.avgRating).toFixed(1);
			return acc;
		}, {});

		const spotImagesMap = spotImages.reduce((acc, image) => {
			acc[image.spotId] = image.url;
			return acc;
		}, {});

		const response = spots.map((spot) => ({
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: parseFloat(spot.lat),
			lng: parseFloat(spot.lng),
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: formatDate(spot.createdAt),
			updatedAt: formatDate(spot.updatedAt),
			avgRating: reviewsMap[spot.id] || null,
			previewImage: spotImagesMap[spot.id] || null,
		}));

		res.status(200).json({ allSpots: response });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	const userId = req.user.id;
	const { review, stars } = req.body;
	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
		});
	}
	const currReview = await Review.findOne({
		where: {
			spotId,
			userId,
		},
	});
	if (currReview) {
		return res.status(500).json({
			message: 'User already has a review for this spot',
		});
	}
	if (!review || stars == null) {
		return res.status(400).json({
			message: 'Validation error',
			errors: {
				review: 'Review text is required',
				stars: 'Stars must be an integer from 1 to 5',
			},
		});
	}
	if (stars < 1 || stars > 5 || !Number.isInteger(stars)) {
		return res.status(400).json({
			message: 'Validation error',
			errors: {
				stars: 'Stars must be an integer from 1 to 5',
			},
		});
	}
	const newReview = await Review.create({
		userId,
		spotId,
		review,
		stars,
	});

	// Fetch the user who created the review
	const user = await User.findByPk(userId, {
		attributes: ['id', 'firstName', 'lastName'],
	});

	// Add the user to the review object
	const reviewWithUser = {
		...newReview.toJSON(),
		User: user,
	};

	res.status(201).json(reviewWithUser);
});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	const userId = req.user.id;
	const { startDate, endDate } = req.body;
	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
		});
	}
	if (spot.ownerId === userId) {
		return res.status(403).json({ message: "You can't book your own spot" });
	}
	const now = new Date();
	const start = new Date(startDate);
	if (start < now) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { startDate: 'startDate cannot be in the past' },
		});
	}
	const end = new Date(endDate);
	if (end <= start) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { endDate: 'endDate cannot be on or before startDate' },
		});
	}
	const conflictBooking = await Booking.findOne({
		where: {
			spotId,
			[Op.or]: [
				{
					startDate: { [Op.between]: [start, end] },
				},
				{
					endDate: { [Op.between]: [start, end] },
				},
				{
					startDate: { [Op.lte]: start },
					endDate: { [Op.gte]: end },
				},
			],
		},
	});

	if (conflictBooking) {
		return res.status(403).json({
			message: 'Sorry, this spot is already booked for the specified dates',
			errors: {
				startDate: 'Start date conflicts with an existing booking',
				endDate: 'End date conflicts with an existing booking',
			},
		});
	}
	const newBooking = await Booking.create({
		spotId,
		userId: userId,
		startDate,
		endDate,
	});
	return res.status(200).json({
		id: newBooking.id,
		spotId: newBooking.spotId,
		userId: newBooking.userId,
		startDate: formatDate(newBooking.startDate),
		endDate: formatDate(newBooking.endDate),
		createdAt: formatDate(newBooking.createdAt),
		updatedAt: formatDate(newBooking.updatedAt),
	});
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
	const { url, preview } = req.body;
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}
	if (spot.ownerId !== req.user.id) {
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

//Edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
	const { address, city, state, country, name, description, price } = req.body;
	const spot = await Spot.findByPk(req.params.spotId);

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
		name,
		description,
		price,
	});
	await spot.save();
	res.status(200).json({
		id: spot.id,
		ownerId: spot.ownerId,
		address: spot.address,
		city: spot.city,
		state: spot.state,
		country: spot.country,
		name: spot.name,
		description: spot.description,
		price: spot.price,
		createdAt: formatDate(spot.createdAt),
		updatedAt: formatDate(spot.updatedAt),
	});
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const spot = await Spot.findByPk(req.params.spotId);
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

//Create a Spot
router.post('/', requireAuth, async (req, res) => {
	const userId = req.user.id;
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
		ownerId: req.user.id,
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
		id: spot.id,
		ownerId: userId,
		address: spot.address,
		city: spot.city,
		state: spot.state,
		country: spot.country,
		lat: parseFloat(spot.lat),
		lng: parseFloat(spot.lng),
		name: spot.name,
		description: spot.description,
		price: spot.price,
		createdAt: formatDate(spot.createdAt),
		updatedAt: formatDate(spot.updatedAt),
	});
});

module.exports = router;
