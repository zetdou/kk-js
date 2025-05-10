import axios from "axios";

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

const closeAuthModal = () => {
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
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      alert(
        `Successully ${isLogin ? `logged in` : `registered`} as ${
          user.username
        }`
      );
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
