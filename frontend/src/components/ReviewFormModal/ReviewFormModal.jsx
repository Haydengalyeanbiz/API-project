import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import StarRating from '../StarRating/StarRating';
import './ReviewFormModal.css';

export const ReviewFormModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(0);
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = {};
		if (review.length < 10)
			newErrors.review = 'Review must be at least 10 characters long';
		if (stars < 1 || stars > 5)
			newErrors.stars = 'Stars must be between 1 and 5';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		await dispatch(addAReview({ review, stars }, spotId));
		closeModal();
	};

	return (
		<div>
			<h2 className='review-title-form'>How was your stay?</h2>
			<form onSubmit={handleSubmit}>
				<textarea
					placeholder='Leave your review here...'
					className='review-textarea'
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
				/>
				{errors.review && <p className='error-message'>{errors.review}</p>}
				<label className='stars-label'>
					<StarRating
						rating={stars}
						setRating={setStars}
					/>
					<span>Stars</span>
				</label>
				{errors.stars && <p className='error-message'>{errors.stars}</p>}
				<button
					type='submit'
					disabled={review.length < 10 || stars < 1}
				>
					Submit Review
				</button>
			</form>
		</div>
	);
};
