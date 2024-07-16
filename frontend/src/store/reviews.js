import { csrfFetch } from './csrf';

//constant actions
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';

// ACTIONS
export const getReviews = (reviews) => {
	return {
		type: GET_ALL_REVIEWS,
		payload: reviews,
	};
};

// THUNK ACTIONS

export const getAllReviews = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
	if (response.ok) {
		const reviews = await response.json();

		dispatch(getReviews(reviews.Reviews));
		return reviews;
	}
};

const initialState = { reviews: [] };

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_REVIEWS: {
			return { ...state, reviews: action.payload };
		}
		default:
			return state;
	}
};

export default reviewsReducer;
