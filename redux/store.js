import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import { verifyAuth } from './actions/authActions';
import appReducer from './reducers/appReducer';

const rootReducer = combineReducers({ 
    app: appReducer,
    auth: authReducer,
    users: userReducer,
    posts: postReducer,
});

const middleware = [thunk];

export function configureStore() {
  if(process.env.NODE_ENV === 'development'){
    const store = createStore(
      rootReducer, 
      composeWithDevTools(applyMiddleware(...middleware)));
      store.dispatch(verifyAuth());
      return store;
  }else{
    const store = createStore(rootReducer, applyMiddleware(...middleware));
    store.dispatch(verifyAuth());
    return store;
  }
}
