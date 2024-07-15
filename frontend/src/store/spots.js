//constant actions
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';

// ACTIONS
export const getSpots = (spots) => {
	return {
		type: GET_ALL_SPOTS,
		payload: spots,
	};
};

export const getSpot = (spot) => ({
	type: GET_SPOT_DETAILS,
	payload: spot,
});

// THUNK ACTIONS
// GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
	const response = await fetch('/api/spots');
	if (response.ok) {
		const spots = await response.json();
		dispatch(getSpots(spots));
		return spots;
	}
};
// GET A SPOTS DETAILS
export const getSpotDetails = (spotId) => async (dispatch) => {
	const response = await fetch(`/api/spots/${spotId}`);
	if (response.ok) {
		const spot = await response.json();
		dispatch(getSpot(spot));
		return spot;
	}
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_SPOTS: {
			return { ...state, spots: action.payload.allSpots };
		}
		case GET_SPOT_DETAILS: {
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		}
		default:
			return state;
	}
};

export default spotsReducer;