import './ManageSpots.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserSpots, deleteASpot } from '../../store/spots';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfrimDeleteModal';
import { useModal } from '../../context/Modal';
import { FaStar } from 'react-icons/fa';

export const ManageSpots = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sessionUser = useSelector((state) => state.session.user);
	const userSpots = useSelector((state) => state.spots.userSpots);
	const [toolTip, setToolTip] = useState(null);
	const { setModalContent, closeModal } = useModal();

	useEffect(() => {
		if (sessionUser) {
			dispatch(getUserSpots(sessionUser.id));
		}
	}, [dispatch, sessionUser]);

	const handleDelete = (spotId) => {
		setModalContent(
			<ConfirmDeleteModal
				onConfirm={() => {
					dispatch(deleteASpot(spotId)).then(() => {
						closeModal();
					});
				}}
				onCancel={() => {
					closeModal();
				}}
			/>
		);
	};

	if (!userSpots.length) {
		return (
			<div className='mspot-wrapper'>
				<div className='mspot-heading'>
					<h2>Manage Spots</h2>
				</div>
				<div className='no-spots'>
					<p>No spots posted yet.</p>
					<button
						to='/spots/new'
						className='create-newspot-btn no-spot-btn'
					>
						Create a New Spot
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='mspot-wrapper'>
			<div className='mspot-heading'>
				<h2 className='mspot-title'>Manage Spots</h2>
				<button
					className='create-newspot-btn'
					onClick={() => navigate('/spots/new')}
				>
					Create a new spot
				</button>
			</div>
			<div className='mspot-list'>
				{userSpots.map((spot) => (
					<div
						onMouseOut={() => setToolTip(null)}
						onMouseOver={() => setToolTip(spot.id)}
						key={spot.id}
						className='mspot-tile'
						onClick={() => navigate(`/spots/${spot.id}`)}
					>
						{toolTip === spot.id && <div id='tooltip'>{spot.name}</div>}
						<img
							src={spot.previewImage}
							alt={spot.name}
							className='mspot-thumbnail'
						/>
						<div className='mspot-info'>
							<div className='mspot-info-sub'>
								<p className='mspot-location'>
									{spot.city}, {spot.state}
								</p>
								<p className='mspot-rating'>
									<FaStar />
									{spot.avgRating ? spot.avgRating : 'New'}
								</p>
							</div>
							<p className='mspot-price'>${spot.price} night</p>
							<div className='mspot-actions'>
								<button
									className='mspot-use-btn'
									onClick={(e) => {
										e.stopPropagation();
										navigate(`/spots/${spot.id}/edit`);
									}}
								>
									Update
								</button>
								<button
									className='mspot-use-btn'
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(spot.id);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
