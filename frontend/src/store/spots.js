import { csrfFetch } from './csrf';

//constant actions
const ADD_SPOT = 'spots/ADD_SPOT';
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';
const SET_USER_SPOTS = 'spots/SET_USER_SPOTS';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';

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

// GET USER SPOTS
const setUserSpots = (spots) => ({
	type: SET_USER_SPOTS,
	payload: spots,
});

// ADD A SPOT
export const addSpot = (spot) => {
	return {
		type: ADD_SPOT,
		payload: spot,
	};
};

// UPDATE A SPOT
const updateSpot = (spot) => ({
	type: UPDATE_SPOT,
	payload: spot,
});

// DELETE A SPOT
const deleteSpot = (spotId) => ({
	type: DELETE_SPOT,
	spotId,
});

// THUNK ACTIONS
// GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
	const response = await csrfFetch('/api/spots');
	if (response.ok) {
		const spots = await response.json();
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

// GET USERS SPOTS
export const getUserSpots = () => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/current`);
	if (response.ok) {
		const spots = await response.json();
		dispatch(setUserSpots(spots));
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
		dispatch(addSpot(newSpot));
		return newSpot;
	} else {
		const error = await response.json();
		throw error;
	}
};

// UPDATE A SPOT
export const updateASpot = (spotId, spotData) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(spotData),
	});
	if (response.ok) {
		const updatedSpot = await response.json();
		dispatch(updateSpot(updatedSpot));
		return updatedSpot;
	}
};

// DELETE A SPOT
export const deleteASpot = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(deleteSpot(spotId));
	}
};

const initialState = { allSpots: {}, spotDetails: {}, userSpots: [] };

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
					[action.payload.id]: action.payload,
					...state.allSpots,
				},
				spotDetails: {
					...state.spotDetails,
					[action.payload.id]: action.payload,
				},
			};
			return newState;
		}
		case SET_USER_SPOTS: {
			return {
				...state,
				userSpots: action.payload.Spots,
			};
		}
		case UPDATE_SPOT: {
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
				userSpots: state.userSpots.map((spot) =>
					spot.id === action.payload.id ? action.payload : spot
				),
			};
			return newState;
		}
		case DELETE_SPOT: {
			const newState = { ...state };
			delete newState.allSpots[action.spotId];
			newState.userSpots = newState.userSpots.filter(
				(spot) => spot.id !== action.spotId
			);
			delete newState.spotDetails[action.spotId];
			return newState;
		}
		default:
			return state;
	}
};

export default spotsReducer;
