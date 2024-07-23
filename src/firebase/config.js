// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING,
  appId: import.meta.env.VITE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

//Creating a New User
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Logging in User
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//Logging out user
export const logout = () => {
  return signOut(auth);
};

//Getting the logged user details
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);
  return currentUser;
};
