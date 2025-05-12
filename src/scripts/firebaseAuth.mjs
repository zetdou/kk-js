import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "kk-login-register.firebaseapp.com",
  projectId: "kk-login-register",
  storageBucket: "kk-login-register.firebasestorage.app",
  messagingSenderId: "600515120672",
  appId: "1:600515120672:web:3512727a0a260ff0183645",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const googleProvider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-signin");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

const fbProvider = new FacebookAuthProvider();

const fbLogin = document.getElementById("fb-signin");
fbLogin.addEventListener("click", () => {
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
});
