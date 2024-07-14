import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import './Spots.css';

export const Spots = () => {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.spots);
	console.log(spots);
	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	const handleSpotClick = (spotId) => {
		history.push(`/spots/${spotId}`);
	};

	return (
		<div className='spots-wrapper'>
			{spots &&
				spots.map((spot) => (
					<div
						className='spot-div-structure'
						key={spot.id}
						onClick={() => handleSpotClick(spot.id)}
					>
						<img
							className='spot-image'
							src={spot.previewImage}
							alt={spot.name}
						/>
						<p>{spot.name}</p>
						<p>{`$${spot.price}`}</p>
					</div>
				))}
		</div>
	);
};
