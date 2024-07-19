import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Spots.css';
// SVG
import mars from '../../../assets/svgs/planets/mars.svg';
import moon from '../../../assets/svgs/planets/moon.svg';
import saturn from '../../../assets/svgs/planets/saturn.svg';

export const Spots = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.allSpots);
	const [selectedPlanet, setSelectedPlanet] = useState(null);
	const [toolTip, setToolTip] = useState(null);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	const handleSpotClick = (spotId) => {
		navigate(`/spots/${spotId}`);
	};

	const handlePlanetClick = (planet) => {
		setSelectedPlanet(planet);
	};

	const filteredSpots = selectedPlanet
		? Object.values(spots).filter((spot) => spot.state === selectedPlanet)
		: Object.values(spots);

	return (
		<div className='spots-component'>
			<motion.div
				className='planet-wrapper'
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className='planet-container'>
					<label>Moon</label>
					<div
						className='planet-icon'
						onClick={() => handlePlanetClick('Moon')}
					>
						<img
							src={moon}
							alt=''
						/>
					</div>
				</div>
				<div className='planet-container'>
					<label>Saturn</label>
					<div
						className='planet-icon'
						onClick={() => handlePlanetClick('Saturn')}
					>
						<img
							src={saturn}
							alt=''
						/>
					</div>
				</div>
				<div className='planet-container'>
					<label>Mars</label>
					<div
						className='planet-icon'
						onClick={() => handlePlanetClick('Mars')}
					>
						<img
							src={mars}
							alt=''
						/>
					</div>
				</div>
			</motion.div>
			<motion.div
				className='spots-wrapper'
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.5 }}
			>
				{filteredSpots.length > 0 &&
					filteredSpots
						.sort((a, b) => b.id - a.id)
						.map((spot) => (
							<div
								value={toolTip}
								onMouseOut={() => setToolTip(null)}
								onMouseOver={() => setToolTip(spot.id)}
								className='spot-div-structure'
								key={spot.id}
								onClick={() => handleSpotClick(spot.id)}
							>
								{toolTip === spot.id && <div id='tooltip'>{spot.name}</div>}
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
			</motion.div>
		</div>
	);
};
