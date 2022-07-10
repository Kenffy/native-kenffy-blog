
const initialState = {
    authenticated: false,
    user: null,
    currentUser: null,
    isFetching: false,
    error: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_USER': 
            return {
                ...state,
                authenticated: true,
                user: {
                    uid: action.payload.user.uid,
                    username: action.payload.user.displayName,
                    profile: action.payload.user.photoURL,
                    email: action.payload.user.email,
                },
                currentUser: action.payload.currentUser,
            };
        case 'UPDATE_PROFILE': 
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: action.payload,
                },
            };
        case 'SIGN_OUT_USER': 
            return {
                ...state,
                authenticated: false,
                user: null,
                currentUser: null,
            };
      default:
        return state;
    }
}