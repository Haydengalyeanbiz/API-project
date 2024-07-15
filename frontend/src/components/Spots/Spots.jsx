import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import { Tooltip } from 'react-tooltip';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Spots.css';

export const Spots = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.spots);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	const handleSpotClick = (spotId) => {
		navigate(`/spots/${spotId}`);
	};

	return (
		<div className='spots-wrapper'>
			{spots &&
				spots.map((spot) => (
					<div
						data-tip={spot.name}
						className='spot-div-structure'
						key={spot.id}
						onClick={() => handleSpotClick(spot.id)}
					>
						<div className='tooltip'>{spot.name}</div>
						<img
							className='spot-image'
							src={spot.previewImage}
							alt={spot.name}
						/>
						<div className='spot-town-star'>
							<p className='spot-city-state'>
								{spot.city}, {spot.state}
							</p>
							<p className='spot-rating'>
								<FaStar />
								{spot.avgRating ? spot.avgRating : 'New'}
							</p>
						</div>
						<p className='spot-price'>{`$${spot.price}`} night</p>
					</div>
				))}
			<Tooltip />
		</div>
	);
};
