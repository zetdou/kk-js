import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbL_9Cv68lroXQ5Yim11Z5Buu1NbuJYOM",
  authDomain: "kk-login-register.firebaseapp.com",
  projectId: "kk-login-register",
  storageBucket: "kk-login-register.firebasestorage.app",
  messagingSenderId: "600515120672",
  appId: "1:600515120672:web:3512727a0a260ff0183645",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-signin");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
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
