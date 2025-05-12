import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import axios from "axios";

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
const fbProvider = new FacebookAuthProvider();

const sentIdTokenToBackend = async (idToken) => {
  try {
    const res = await axios.post("http://127.0.0.1:3000/users/firebase-login", {
      idToken,
    });

    const { token } = res.data;
    localStorage.setItem("jwt", token);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

const googleLogin = document.getElementById("google-signin");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const user = result.user;
      const idToken = await user.getIdToken();
      await sentIdTokenToBackend(idToken);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

const fbLogin = document.getElementById("fb-signin");
fbLogin.addEventListener("click", () => {
  signInWithPopup(auth, fbProvider)
    .then(async (result) => {
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
