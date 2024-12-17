import {initializeApp} from "@firebase/app";
import {FacebookAuthProvider, getAuth, GoogleAuthProvider} from "@firebase/auth";
import {getStorage} from "@firebase/storage";
import {getAnalytics} from "@firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB7crCiPv9mGnO-9qyA8yTQyxNP7WaAeFY",
    authDomain: "phone-shop-adeba.firebaseapp.com",
    projectId: "phone-shop-adeba",
    storageBucket: "phone-shop-adeba.appspot.com",
    messagingSenderId: "383175832373",
    appId: "1:383175832373:web:d0424323b89c9369b1527c",
    measurementId: "G-5FXSB4CSTX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();
// const storage=getStorage(app);

export {provider, auth, facebookProvider}
export const storage = getStorage(app);
