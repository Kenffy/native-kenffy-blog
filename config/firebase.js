import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import {REACT_APP_API_KEY} from '@env'

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "kenffy-blog.firebaseapp.com",
  databaseURL: "https://kenffy-blog-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kenffy-blog",
  storageBucket: "kenffy-blog.appspot.com",
  messagingSenderId: "647019992446",
  appId: "1:647019992446:web:97b48458817537b3274f2f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);