import {initializeApp} from "firebase/app";
import {
    getDatabase,
    set,
    ref,
    onValue,
    get,
    child,
    push,
    update,
    remove,
    limitToFirst,
    query,
    limitToLast
} from "firebase/database";
import {
    getAuth,
    signInWithEmailAndPassword,
    browserLocalPersistence,
    setPersistence,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {getStorage, ref as refStorage, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

const createUser = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => user)
    .catch((e: Error) => e.message);

export {
    database,
    set,
    ref,
    onValue,
    get,
    child,
    push,
    update,
    remove,
    auth,
    storage,
    refStorage,
    getDownloadURL,
    limitToFirst,
    query,
    limitToLast,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    createUser
};