const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'APP_LOADED': 
            return {
                ...state,
                initialized: true,
            };
      default:
        return state;
    }
}