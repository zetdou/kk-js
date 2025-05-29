import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { saveAuthData } from "./saveAuthData.mjs";

const authModal = document.querySelector("[dataAuth]");
const authModalOpen = document.querySelector(".auth-btn");
const authModalClose = document.querySelector(".modalAuthClose");

const authForm = document.getElementById("auth-form");
const toggleAuthCheckbox = document.getElementById("toggle-auth");
const authTitle = document.getElementById("auth-title");
const emailField = document.getElementById("email-field");

const openAuthModal = () => {
  authModal.classList.toggle("isHidden");
  document.body.classList.add("no-scroll");
  toggleAuthCheckbox.checked = false;
  updateFormMode();
};

export const closeAuthModal = () => {
  authModal.classList.toggle("isHidden");
  document.body.classList.remove("no-scroll");
  authForm.reset();
};

authModalOpen.addEventListener("click", openAuthModal);
authModalClose.addEventListener("click", closeAuthModal);

const updateFormMode = () => {
  const isLogin = toggleAuthCheckbox.checked;
  authTitle.textContent = isLogin ? "Zaloguj się" : "Zarejestruj się";
  emailField.classList.toggle("hidden", isLogin);

  if (isLogin) {
    emailField.removeAttribute("required");
  } else {
    emailField.setAttribute("required", "true");
  }
};

toggleAuthCheckbox.addEventListener("change", updateFormMode);

authForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const formData = new FormData(authForm);
  const data = Object.fromEntries(formData.entries());

  const isLogin = toggleAuthCheckbox.checked;
  const url = isLogin
    ? "http://127.0.0.1:3000/users/login"
    : "http://127.0.0.1:3000/users/signup";

  try {
    const res = await axios.post(url, data);
    const { token, user } = res.data;
    console.log(res.data);

    if (token) {
      saveAuthData(token, user);
      alert(
        `Successully ${isLogin ? `logged in` : `registered`} as ${
          user.username
        }`
      );
      checkAuthState();
    } else {
      alert(
        "Registration successfull Please verify your email before logging in!"
      );
    }
    closeAuthModal();
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    alert(message);
  }
});

export const checkAuthState = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("authUser"));

  if (token && user) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        logoutUser();
      } else {
        showLoggedIn(user.username);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logoutUser();
    }
  } else {
    showLoggedOut();
  }
};

const userGreetingAndLogoutWrapper = document.querySelector(".user-info");
const userWelcomeText = document.querySelector(".user-greeting");

function showLoggedIn(username) {
  userWelcomeText.textContent = `Witaj, ${username}!`;
  userGreetingAndLogoutWrapper.classList.remove("hidden");

  authModalOpen.classList.add("hidden");
}

function showLoggedOut() {
  userGreetingAndLogoutWrapper.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthState();
});

const userLogOut = document.querySelector(".logout-btn");

async function logoutUser() {
  const logOutPath = "http://127.0.0.1:3000/users/logout";
  const token = localStorage.getItem("authToken");

  if (!token) return;

  try {
    const res = await axios.get(logOutPath, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.clear();
    checkAuthState();
  } catch (err) {
    console.error("Error", err);
  }
}

userLogOut.addEventListener("click", logoutUser);
