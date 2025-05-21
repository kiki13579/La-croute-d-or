document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("connexion");

    document.getElementById("nv0").addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    // Création d’un message dynamique
    const message = document.createElement("p");
    message.style.marginTop = "10px";
    document.getElementById("connexion-area").appendChild(message);

    // Identifiants valides en dur
    const VALID_USERNAME = "admin";
    const VALID_PASSWORD = "lacroutedor";

    loginButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            message.textContent = "Connexion réussie !";
            message.style.color = "green";

            // Redirection simulée
            sessionStorage.setItem("accesAutorise", "true");

            setTimeout(() => {
                window.location.href = "../html/admin.html"; // modifie vers ta vraie page
            }, 1000);
        } else {
            message.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
            message.style.color = "red";
        }
    });
});