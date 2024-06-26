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

//Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
	if (req.params.imageId === 'null') {
	}
	const imageId = req.params.imageId;
	const userId = req.user.id;
	const spotImage = await SpotImage.findByPk(imageId);
	if (!spotImage) {
		return res.status(404).json({
			message: "Spot Image couldn't be found",
		});
	}
	const spot = await Spot.findByPk(spotImage.spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
		});
	}
	if (spot.ownerId !== userId) {
		return res.status(403).json({ message: 'Unauthorized' });
	}
	await spotImage.destroy();
	return res.status(200).json({
		message: 'Successfully deleted',
	});
});

module.exports = router;
