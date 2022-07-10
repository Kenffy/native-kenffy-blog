import {auth} from '../config/firebase';
//import {database} from '../config/firebase';
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         sendEmailVerification,
         signOut, updateProfile,
         FacebookAuthProvider,
         GoogleAuthProvider,
         signInWithPopup, } from 'firebase/auth';
import { createUserAsync } from './firestoreServices';
  
//import { ref, child, push, update, onValue, query, get } from "firebase/database";


export async function loginAsync(creds) {
  return await signInWithEmailAndPassword(auth, creds.email, creds.password);
}
  
export async function logoutAsync() {
  return await signOut(auth);
}
  
export async function registerAsync(creds) {
  try {
    const result = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
    await sendEmailVerification(auth.currentUser);
    let user;
    if(result.user){
      await updateProfile(result.user, {
        displayName: creds.username,
      })
      user = await createUserAsync({...creds, uid: result.user.uid});
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function socialLoginAsync(selectedProvider){
  let provider;
  let user;
  if (selectedProvider === 'facebook') {
      provider = new FacebookAuthProvider();
  }
  if (selectedProvider === 'google') {
      provider = new GoogleAuthProvider();
  }
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    if (result._tokenResponse.isNewUser) {
      user = await createUserAsync({username: result.user.displayName, email: result.user.email, uid: result.user.uid});
    }
    return user;
  } catch (error) {
    throw error;
  }
}

// export const addConversationAsync = async(friendId)=>{
//   const user = auth.currentUser;
//   if(!user){return}
//   try {
//     // const usersSnapshot = await get(query(ref(database, 'conversation/')).where('members', 'in',[user.uid, friendId]));
//     // console.log(usersSnapshot) 
//     // return usersSnapshot;
//     const newConv = push(child(ref(database), `conversations`),{
//       members: [user.uid, friendId],
//       lastmessage: '',
//       friend: null
//     });
//     console.log(newConv)
//     return newConv;
//   } catch (error) {
//     console.log(error)
//   }
  
// }

// // messgaes

// export const createMessageAsync = async(message)=>{
//   //const user = auth.currentUser;
//   const msg = {
//     ...message,
//     images: [],
//     createdAt: Date.now()
//   }

//   const newPost = push(child(ref(database), `messages/${message.conversationId}`),msg);
//   console.log(newPost)
//   return newPost;
//   //return database().ref(`messages/${message.conversationId}`).push(msg);
// }

// export const getMessageByConversationId = (id)=>{
//   const msgRef = ref(database, 'messages/' + id);
//   let messages = [];
//   onValue(msgRef, (snapshot) => {
//     messages.push({id: snapshot.key, ...snapshot.val()});
//   });
//   console.log(messages)
//   return messages;
//   //return database().ref(`messages/${id}`).orderByKey();
// }
  