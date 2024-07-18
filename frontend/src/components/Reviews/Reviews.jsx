import './Reviews.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, deleteAReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { ReviewFormModal } from '../ReviewFormModal/ReviewFormModal';
import ConfirmDeleteReview from '../ConfirmDeleteReview/ConfirmDeleteReview';

export const Reviews = ({ spotId }) => {
	const { setModalContent, closeModal } = useModal();
	const dispatch = useDispatch();
	const reviews = useSelector((state) => state.reviews.reviews);
	const sessionUser = useSelector((state) => state.session.user);
	const spot = useSelector((state) => state.spots.spotDetails[spotId]);
	const userHasPostedReview = reviews.some(
		(review) => sessionUser && sessionUser.id === review.userId
	);

	useEffect(() => {
		dispatch(getAllReviews(spotId));
	}, [dispatch, spotId]);

	const dateFormat = (date) => {
		const monthArr = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const splitDate = date.split('-');
		const monthIndex = parseInt(splitDate[1], 10) - 1;
		return `${monthArr[monthIndex]}-${splitDate[0]}`;
	};

	const handleDelete = (reviewId) => {
		setModalContent(
			<ConfirmDeleteReview
				onConfirm={() => {
					dispatch(deleteAReview(reviewId)).then(() => {
						closeModal();
					});
				}}
				onCancel={closeModal}
			/>
		);
	};

	return (
		<div className='review-wrapper'>
			{sessionUser &&
				spot &&
				sessionUser.id !== spot.ownerId &&
				!userHasPostedReview && (
					<div className='post-review-div'>
						<button
							onClick={() =>
								setModalContent(<ReviewFormModal spotId={spotId} />)
							}
							className='add-review-btn'
						>
							Post Your Review
						</button>
					</div>
				)}
			{reviews.length > 0 ? (
				reviews
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.map((review) => (
						<div
							key={review.id}
							className='review-div-structure'
						>
							<h3 className='review-user'>{review.User?.firstName}</h3>
							<p className='review-date'>{dateFormat(review.createdAt)}</p>
							<p className='actual-review'>{review.review}</p>
							{sessionUser && sessionUser.id === review.userId && (
								<button
									onClick={() => handleDelete(review.id)}
									className='delete-review-btn'
								>
									Delete Review
								</button>
							)}
						</div>
					))
			) : sessionUser && sessionUser.id !== spot.ownerId ? (
				<p className='no-review-p'>Be the first to post a review!</p>
			) : (
				<p className='no-review-p'>No reviews yet.</p>
			)}
		</div>
	);
};
