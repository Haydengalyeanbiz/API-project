import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spots';
import { SpotImages } from '../SpotImages/SpotImages';
import { FaStar } from 'react-icons/fa';
import './SpotDetails.css';

export const SpotDetails = () => {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.spotDetails[spotId]);

	useEffect(() => {
		dispatch(getSpotDetails(spotId));
	}, [dispatch, spotId]);

	if (!spot) {
		return <div>Loading...</div>;
	}

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
							{spot.avgStarRating} - {spot.numReviews}
						</p>
					</div>
					<button className='book-btn'>Reserve</button>
				</div>
			</div>
			<div className='line-break'></div>
			<div className='review-content'>
				<div className='review-heading'>
					<p className='review-title'>
						<FaStar />
						{spot.avgStarRating} - {spot.numReviews}
					</p>
				</div>
			</div>
		</div>
	);
};
