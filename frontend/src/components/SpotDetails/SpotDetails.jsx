import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spots';
import { SpotImages } from '../SpotImages/SpotImages';
import { Reviews } from '../Reviews/Reviews';
import { FaStar } from 'react-icons/fa';
import './SpotDetails.css';

export const SpotDetails = () => {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.spotDetails[spotId]);
	const spotDetails = {};

	// fetch call for getting the spotId
	useEffect(() => {
		dispatch(getSpotDetails(spotId));
	}, [dispatch, spotId]);

	// checking to see if spot exists
	if (!spot) {
		return <div>Loading...</div>;
	}

	// conditionals for seeing # of reviews
	if (spot.numReviews === 1) {
		spotDetails.numReviews = 'Review';
	} else if (spot.numReviews >= 2) {
		spotDetails.numReviews = 'Reviews';
	}

	const handleClick = () => {
		alert('Feature coming soon');
	};

	return (
		<div className='spot-details'>
			<div className='spot-main-titles'>
				<h1 className='spot-details-title'>{spot.name}</h1>
				<p>
					{spot.city}, {spot.state}, {spot.country}
				</p>
			</div>
			<SpotImages spotId={spotId} />
			<div className='spot-details-info'>
				<div className='spot-owner-description'>
					<p className='spot-owner'>
						{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}
					</p>
					<p className='spot-description'>{spot.description}</p>
				</div>
				<div className='book-spot-div'>
					<div className='price-review-title'>
						<p className='book-price'>{`$${spot.price} night`}</p>
						<p className='book-review'>
							<FaStar />
							{spot.avgStarRating}
							{spot.numReviews
								? ` · ${spot.numReviews} ${spotDetails.numReviews}`
								: 'New'}
						</p>
					</div>
					<button
						onClick={handleClick}
						className='book-btn'
					>
						Reserve
					</button>
				</div>
			</div>
			<div className='line-break'></div>
			<div className='review-content'>
				<div className='review-heading'>
					<p className='review-title'>
						<FaStar />
						{spot.avgStarRating}{' '}
						{spot.numReviews
							? `· ${spot.numReviews} ${spotDetails.numReviews}`
							: 'New'}
					</p>
				</div>
				<Reviews spotId={spotId} />
			</div>
		</div>
	);
};
