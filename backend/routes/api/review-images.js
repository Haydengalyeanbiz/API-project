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

// Delete a Review image
router.delete('/:imageId', requireAuth, async (req, res) => {
	const imageId = req.params.imageId;
	const userId = req.user.id;
	if (imageId === 'null') {
		return res.status(404).json({
			message: 'Not found',
		});
	}
	const image = await ReviewImage.findByPk(imageId, {
		include: {
			model: Review,
			attributes: ['userId'],
		},
	});
	if (!image) {
		return res.status(404).json({
			message: "Review Image couldn't be found",
		});
	}
	if (image.Review.userId !== userId) {
		return res.status(403).json({
			message: 'Unauthorized',
		});
	}
	await image.destroy();
	return res.status(200).json({
		message: 'Successfully deleted',
	});
});

module.exports = router;
