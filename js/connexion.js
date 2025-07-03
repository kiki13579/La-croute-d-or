// connexion.js

// Identifiants en dur
const ADMIN_EMAIL = "Kamihate@kamihate.com";
const ADMIN_PASSWORD = "hololive2025";

const loginForm = document.getElementById("loginForm");
const inputEmail = document.getElementById("identifiant");
const inputPassword = document.getElementById("motdepasse");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    sessionStorage.setItem("auth", "autorisation accordé");
    window.location.href = "admin.html";
  } else {
    alert("Identifiant ou mot de passe incorrect.");
  }
});
