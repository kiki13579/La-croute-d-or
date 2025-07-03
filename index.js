// index.js

const filtreCategorie = document.getElementById("filtreCategorie");
const titreCategorie = document.getElementById("titreCategorie");
const listePizzas = document.getElementById("listePizzas");
const btnCommander = document.getElementById("btnCommander");

// Créer champ de recherche
const champRecherche = document.createElement("input");
champRecherche.type = "text";
champRecherche.placeholder = "Rechercher une pizza...";
champRecherche.id = "recherchePizza";
champRecherche.style.padding = "0.5rem";
champRecherche.style.marginLeft = "1rem";
document.querySelector(".filtres").appendChild(champRecherche);

function getPizzas() {
  return JSON.parse(localStorage.getItem("pizzas")) || [];
}

function getCategories() {
  return JSON.parse(localStorage.getItem("categories")) || [];
}

function getQuantites() {
  return JSON.parse(localStorage.getItem("quantites")) || {};
}

function saveQuantites(quantites) {
  localStorage.setItem("quantites", JSON.stringify(quantites));
}

function chargerCategories() {
  const categories = getCategories();
  filtreCategorie.innerHTML = '<option value="">Toutes</option>';
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filtreCategorie.appendChild(opt);
  });
}

function afficherPizzas(categorie = "", recherche = "") {
  const pizzas = getPizzas();
  const quantites = getQuantites();
  listePizzas.innerHTML = "";

  let filtres = pizzas;

  if (categorie) {
    filtres = filtres.filter(p => p.categorie === categorie);
  }

  if (recherche.trim() !== "") {
    filtres = filtres.filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase()));
  }

  titreCategorie.textContent = (categorie || recherche) ?
    `Résultats ${categorie ? ' - ' + categorie : ''}${recherche ? ' pour « ' + recherche + ' »' : ''}` :
    "Toutes les pizzas disponibles";

  filtres.forEach((pizza) => {
    const card = document.createElement("div");
    card.className = "pizza-card";

    const imagePath = `images/categories/${pizza.categorie.toLowerCase()}/${pizza.image}`;

    card.innerHTML = `
      <img src="${imagePath}" alt="${pizza.nom}">
      <h3>${pizza.nom}</h3>
      <p>${pizza.ingredients.join(", ")}</p>
      <div class="prix">${pizza.prix.toFixed(2)} €</div>
      <div class="quantite-control">
        <button class="moins">-</button>
        <span>${quantites[pizza.nom] || 0}</span>
        <button class="plus">+</button>
      </div>
    `;

    const btnMoins = card.querySelector(".moins");
    const btnPlus = card.querySelector(".plus");
    const compteur = card.querySelector("span");

    btnMoins.addEventListener("click", () => {
      let qte = quantites[pizza.nom] || 0;
      if (qte > 0) {
        qte--;
        quantites[pizza.nom] = qte;
        compteur.textContent = qte;
        saveQuantites(quantites);
      }
    });

    btnPlus.addEventListener("click", () => {
      let qte = quantites[pizza.nom] || 0;
      if (qte < 20) {
        qte++;
        quantites[pizza.nom] = qte;
        compteur.textContent = qte;
        saveQuantites(quantites);
      }
    });

    listePizzas.appendChild(card);
  });
}

filtreCategorie.addEventListener("change", () => {
  champRecherche.value = "";
  afficherPizzas(filtreCategorie.value, "");
});

champRecherche.addEventListener("input", () => {
  filtreCategorie.value = "";
  afficherPizzas("", champRecherche.value);
});

btnCommander.addEventListener("click", () => {
  window.location.href = "panier.html";
});

chargerCategories();
afficherPizzas();
