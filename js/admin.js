// admin.js

// Vérification d'accès admin
if (sessionStorage.getItem("auth") !== "autorisation accordé") {
  alert("Accès à la page administration interdit sans mot de passe.");
  window.location.href = "index.html";
}

// DOM Elements
const categorieInput = document.getElementById("categorieInput");
const addCategorieBtn = document.getElementById("addCategorieBtn");
const categorieList = document.getElementById("categorieList");
const pizzaCategorie = document.getElementById("pizzaCategorie");
const pizzaName = document.getElementById("pizzaName");
const pizzaIngredients = document.getElementById("pizzaIngredients");
const pizzaPrice = document.getElementById("pizzaPrice");
const pizzaImage = document.getElementById("pizzaImage");
const addPizzaBtn = document.getElementById("addPizzaBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Zone d'affichage des pizzas
const pizzaListContainer = document.createElement("section");
pizzaListContainer.id = "pizza-list-section";
document.querySelector("main").appendChild(pizzaListContainer);

// Utilitaires LocalStorage
function getCategories() {
  return JSON.parse(localStorage.getItem("categories")) || [];
}

function saveCategories(categories) {
  localStorage.setItem("categories", JSON.stringify(categories));
}

function getPizzas() {
  return JSON.parse(localStorage.getItem("pizzas")) || [];
}

function savePizzas(pizzas) {
  localStorage.setItem("pizzas", JSON.stringify(pizzas));
}

function updateCategorieList() {
  const categories = getCategories();
  categorieList.innerHTML = "";
  pizzaCategorie.innerHTML = "";
  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat;
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteCategorie(cat);
    li.appendChild(delBtn);
    categorieList.appendChild(li);

    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    pizzaCategorie.appendChild(option);
  });
}

function updatePizzaList() {
  const pizzas = getPizzas();
  pizzaListContainer.innerHTML = '<h2>Pizzas existantes</h2>';

  pizzas.forEach((pizza, index) => {
    const div = document.createElement("div");
    div.className = "pizza-admin-item";
    div.innerHTML = `
      <strong>${pizza.nom}</strong> - ${pizza.categorie} - ${pizza.prix.toFixed(2)} €<br>
      <em>${pizza.ingredients.join(", ")}</em>
      <button data-index="${index}" class="delete-pizza">Supprimer</button>
    `;
    pizzaListContainer.appendChild(div);
  });

  document.querySelectorAll(".delete-pizza").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      const pizzas = getPizzas();
      pizzas.splice(idx, 1);
      savePizzas(pizzas);
      updatePizzaList();
    });
  });
}

// Ajouter Catégorie
addCategorieBtn.addEventListener("click", () => {
  const value = categorieInput.value.trim();
  if (value) {
    const categories = getCategories();
    if (!categories.includes(value)) {
      categories.push(value);
      saveCategories(categories);
      updateCategorieList();
      categorieInput.value = "";
    } else {
      alert("Cette catégorie existe déjà.");
    }
  }
});

// Supprimer Catégorie
function deleteCategorie(nom) {
  const categories = getCategories().filter(c => c !== nom);
  saveCategories(categories);
  updateCategorieList();
}

// Ajouter Pizza
addPizzaBtn.addEventListener("click", () => {
  const nom = pizzaName.value.trim();
  const categorie = pizzaCategorie.value;
  const ingredients = pizzaIngredients.value.split(",").map(i => i.trim()).filter(i => i);
  const prix = parseFloat(pizzaPrice.value);
  const image = pizzaImage.value.trim();

  if (!nom || !categorie || ingredients.length === 0 || isNaN(prix) || prix <= 0 || !image) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  const pizzas = getPizzas();
  pizzas.push({ nom, categorie, ingredients, prix, image });
  savePizzas(pizzas);

  pizzaName.value = "";
  pizzaIngredients.value = "";
  pizzaPrice.value = "";
  pizzaImage.value = "";
  alert("Pizza ajoutée avec succès !");

  updatePizzaList();
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("auth");
  window.location.href = "index.html";
});

updateCategorieList();
updatePizzaList();
