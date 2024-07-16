import { csrfFetch } from './csrf';

//constant actions
const ADD_SPOT = 'spots/ADD_SPOT';
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';

// ACTIONS
// GET ALL SPOTS
export const getSpots = (spots) => {
	return {
		type: GET_ALL_SPOTS,
		payload: spots,
	};
};
// GET A SPOT
export const getSpot = (spot) => ({
	type: GET_SPOT_DETAILS,
	payload: spot,
});

// ADD A SPOT
export const addSpot = (spot) => {
	return {
		type: ADD_SPOT,
		payload: spot,
	};
};

// THUNK ACTIONS
// GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
	const response = await csrfFetch('/api/spots');
	if (response.ok) {
		const spots = await response.json();
		console.log('THIS IS THE RESPONSE ====>', spots);
		dispatch(getSpots(spots));
		return spots;
	}
};
// GET A SPOTS DETAILS
export const getSpotDetails = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`);
	if (response.ok) {
		const spot = await response.json();
		dispatch(getSpot(spot));
		return spot;
	}
};

// ADD SPOT
export const addANewSpot = (spot) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(spot),
	});
	if (response.ok) {
		const newSpot = await response.json();
		console.log('THIS IS MY RESPONSE FOR ADDING A SPOT ===> ', newSpot);
		dispatch(addSpot(newSpot));
		return newSpot;
	} else {
		const error = await response.json();
		throw error;
	}
};

const initialState = { allSpots: {}, spotDetails: {} };

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_SPOTS: {
			const newState = { ...state, allSpots: {} };
			const spotsArray = action.payload.allSpots;
			spotsArray.forEach((spot) => {
				newState.allSpots[spot.id] = spot;
			});
			return newState;
		}
		case GET_SPOT_DETAILS: {
			return {
				...state,
				spotDetails: {
					...state.spotDetails,
					[action.payload.id]: action.payload,
				},
			};
		}
		case ADD_SPOT: {
			const newState = {
				...state,
				allSpots: {
					...state.allSpots,
					[action.payload.id]: action.payload,
				},
				spotDetails: {
					...state.spotDetails,
					[action.payload.id]: action.payload,
				},
			};
			return newState;
		}
		default:
			return state;
	}
};

export default spotsReducer;
