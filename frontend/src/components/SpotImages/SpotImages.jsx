import { useSelector } from 'react-redux';
import './SpotImages.css';

export const SpotImages = ({ spotId }) => {
	const spot = useSelector((state) => state.spots.spotDetails[spotId]);

	if (!spot || !spot.SpotImages) {
		return <div>Loading images...</div>;
	}

	return (
		<div className='spot-images-wrapper'>
			{spot.SpotImages.map((image) => (
				<div
					className='spot-image'
					key={image.id}
				>
					<img
						className='spot-image-structure'
						src={image.url}
						alt={`Spot image ${image.id}`}
					/>
				</div>
			))}
		</div>
	);
};
