import './Reviews.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../store/reviews';

export const Reviews = ({ spotId }) => {
	const dispatch = useDispatch();
	const reviews = useSelector((state) => state.reviews.reviews);
	const sessionUser = useSelector((state) => state.session.user);
	const spot = useSelector((state) => state.spots.spotDetails[spotId]);

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
		const dateArr = [
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
			'10',
			'11',
			'12',
		];
		const splitDate = date.split('-');
		for (let i = 0; i < dateArr.length; i++) {
			if (dateArr[i] === splitDate[1]) {
				return `${monthArr[i]}-${splitDate[0]}`;
			}
		}
	};
	return (
		<div className='review-wrapper'>
			{reviews.length > 0 ? (
				reviews
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.map((review) => (
						<div
							key={review.id}
							className='review-div-structure'
						>
							<h3 className='review-user'>{review.User.firstName}</h3>
							<p className='review-date'>{dateFormat(review.createdAt)}</p>
							<p className='actual-review'>{review.review}</p>
						</div>
					))
			) : sessionUser && spot && sessionUser.id !== spot.ownerId ? (
				<div className='no-review-div'>
					<p className='no-review-p'>Be the first to post a review!</p>
					<button className='add-review-btn'>add review</button>
				</div>
			) : (
				<p className='no-review-p'>No reviews yet.</p>
			)}
		</div>
	);
};
