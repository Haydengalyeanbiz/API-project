//constant actions
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';

// ACTIONS
export const getSpots = (spots) => {
	return {
		type: GET_ALL_SPOTS,
		payload: spots,
	};
};

// THUNK ACTIONS
export const getAllSpots = () => async (dispatch) => {
	const response = await fetch('/api/spots');
	if (response.ok) {
		const spots = await response.json();
		dispatch(getSpots(spots));
		console.log('============>', spots);
		return spots;
	}
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_SPOTS: {
			return { ...state, spots: action.payload.Spots };
		}
		default:
			return state;
	}
};

export default spotsReducer;
