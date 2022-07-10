const initialState = {
    currentUser: null,
    isFetching: false,
    error: false,
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        // LOGIN
        case 'LOGIN_START': 
            return {
                ...state,
                isFetching: true,
            };
      default:
        return state;
    }
}