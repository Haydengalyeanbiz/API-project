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
router.get('/current', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const user = await User.findByPk(userId);
	if (user.id !== userId) {
		return res.status(403).json({
			message: 'Unauthorized',
		});
	}
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

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const reviewId = req.params.reviewId;
	const { url } = req.body;
	const review = await Review.findByPk(reviewId);
	if (!review) {
		return res.status(404).json({
			message: "Review couldn't be found",
		});
	}
	if (review.userId !== userId) {
		return res.status(403).json({
			message: 'Unauthorized',
		});
	}
	const imageCount = await ReviewImage.count({
		where: {
			reviewId,
		},
	});
	if (imageCount >= 10) {
		return res.status(403).json({
			message: 'Maximum number of images for this resource was reached',
		});
	}
	const newImage = await ReviewImage.create({
		reviewId,
		url,
	});
	return res.status(200).json({
		id: newImage.id,
		url: newImage.url,
	});
});

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
	const reviewId = req.params.reviewId;
	const { review, stars } = req.body;
	const userId = req.user.id;
	const existingReview = await Review.findByPk(reviewId);
	if (!existingReview) {
		return res.status(404).json({
			message: "Review couldn't be found",
		});
	}
	if (existingReview.userId !== userId) {
		return res.status(403).json({
			message: 'Unauthorized',
		});
	}
	const errors = {};
	if (!review) {
		errors.review = 'Review text is required';
	}
	if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
		errors.stars = 'Stars must be an integer from 1 to 5';
	}
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({
			message: 'Bad Request',
			errors,
		});
	}
	existingReview.review = review;
	existingReview.stars = stars;
	await existingReview.save();

	return res.status(200).json({
		id: existingReview.id,
		userId: existingReview.userId,
		spotId: existingReview.spotId,
		review: existingReview.review,
		stars: existingReview.stars,
		createdAt: existingReview.createdAt,
		updatedAt: existingReview.updatedAt,
	});
});
// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
	const reviewId = req.params.reviewId;
	if (reviewId === 'null') {
		return res.status(404).json({
			message: 'Not found',
		});
	}
	const findReview = await Review.findByPk(reviewId);
	if (!findReview) {
		return res.status(404).json({
			message: "Review couldn't be found",
		});
	}
	if (findReview.userId !== req.user.id) {
		return res.status(403).json({
			message: 'Unauthorized',
		});
	}
	await findReview.destroy();
	res.status(200).json({
		message: 'Successfully deleted',
	});
});

module.exports = router;
