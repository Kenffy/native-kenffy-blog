import {auth} from '../../config/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import { getUserAsync } from '../../services/firestoreServices';
//import { toast } from 'react-toastify';


export function signInUser(user) {
  return {
    type: 'SIGN_IN_USER',
    payload: user
  }
}

export function signOutUser() {
  return {
    type: 'SIGN_OUT_USER',
  };
}

export function updateProfileImage(profile) {
  return {
    type: 'UPDATE_PROFILE',
    payload: profile
  };
}

export function verifyAuth() {
    return function (dispatch) {
        return onAuthStateChanged(auth, async(user) => {
            if (user) {
              const userdata = await getUserAsync(user.uid);
              dispatch(signInUser({user, currentUser: userdata}));
              dispatch({type: 'APP_LOADED'})
              // if(user.emailVerified){
              //   const userdata = await getUserAsync(user.uid);
              //   dispatch(signInUser({user, currentUser: userdata}));
              // }else{
              //   toast.warning("Please verify your email to continue");
              // }  
            } else {
                dispatch(signOutUser())
                dispatch({type: 'APP_LOADED'})
            }
        })
    }
}