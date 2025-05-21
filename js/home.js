// Cette partie sert a rediriger l'utilisateur vers la page d'acceuil, le panier, et de connexion
document.getElementById("nv0").addEventListener("click", () => {
    window.location.href = "../index.html";
});
document.getElementById("nv2").addEventListener("click", () => {
    window.location.href = "../html/panier.html";
});
document.getElementById("nv1").addEventListener("click", () => {
    window.location.href = "../html/login.html";
});
document.getElementById("btn-commande").addEventListener("click", () => {
    window.location.href = "../html/panier.html";
});

//Cette partie sert a creer les variables pour les filtres (DOM)
const categorySelect = document.getElementById('filter-category');
const ingredientSelect = document.getElementById('filter-ingredient');
const priceSelect = document.getElementById('filter-price');
const searchInput = document.getElementById('search-name');
const pizzaList = document.querySelector('.pizza-list');
const resetBtn = document.getElementById('btn-reset-filtres');

//Cette parite sert a creer les variables pour le stockage local(localstorage)
let pizzas = [];
const data = localStorage.getItem('pizzas');
pizzas = data ? JSON.parse(data) : [];

//cette partie sert a la gestion dynamique des filtres
const allIngredients = new Set();
const allCategories = new Set();
const allPrices = new Set();
pizzas.forEach(pizza => {
    allCategories.add(pizza.categorie);
    allPrices.add(pizza.prix);
    pizza.ingredients.forEach(ing => allIngredients.add(ing));
});
function populateSelect(select, options) {
    select.innerHTML = `<option value="">-- Tous --</option>`;
    Array.from(options).sort().forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
    });
}
populateSelect(categorySelect, allCategories);
populateSelect(ingredientSelect, allIngredients);
populateSelect(priceSelect, allPrices);

// Cette partie sert a l'affichage dynamique des pizzas
function displayPizzas(pizzasToShow) {
    pizzaList.innerHTML = "";
    if (pizzasToShow.length === 0) {
        pizzaList.innerHTML = "<p>Aucune pizza trouvée.</p>";
    return;
    }
    let quantities = {};
    try {
        const stored = localStorage.getItem('pizzaQuantities');
        quantities = stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.error("Erreur lors de la récupération des quantités :", e);
    }
    pizzasToShow.forEach(pizza => {
        const count = quantities[pizza.nom] || 0;
        const div = document.createElement('div');
        div.className = 'pizza-card';
        div.innerHTML = `
            <div class="card">
                <h3 class="card-h3">${pizza.nom}</h3>
                <img class="card-img" src="../assets/${pizza.image}" alt="${pizza.nom}" style="width: 100%; max-width: 300px; border-radius: 10px;">
                <p><strong>Catégorie:</strong> ${pizza.categorie}</p>
                <p><strong>Prix:</strong> ${pizza.prix} €</p>
                <p><strong>Ingrédients:</strong> ${pizza.ingredients.join(', ')}</p>
                <div class="quantity-control" style="margin-top: 10px;">
                    <button class="btn-minus" data-pizza="${pizza.nom}" ${count === 0 ? 'disabled' : ''}>-</button>
                        <span class="quantity" data-pizza="${pizza.nom}">${count}</span>
                    <button class="btn-plus" data-pizza="${pizza.nom}" ${count === 20 ? 'disabled' : ''}>+</button>
                </div>
            </div>
        `;
        pizzaList.appendChild(div);
    });

    //Cette partie sert a gerer les boutons + et - pour chaque pizza
    // et a gerer dynamiquement l'ajouts ou la suppression de la pizza dans le localstorage
    const btnPlus = pizzaList.querySelectorAll('.btn-plus');
    const btnMinus = pizzaList.querySelectorAll('.btn-minus');
    const quantitySpans = pizzaList.querySelectorAll('.quantity');
    btnPlus.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.pizza;
      if (!quantities[name]) quantities[name] = 0;
      if (quantities[name] < 20) {
        quantities[name]++;
        updateQuantity(name, quantities[name]);
      }
    });
  });

  btnMinus.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.pizza;
      if (quantities[name] > 0) {
        quantities[name]--;
        updateQuantity(name, quantities[name]);
      }
    });
  });

  function updateQuantity(name, count) {
    quantitySpans.forEach(span => {
      if (span.dataset.pizza === name) {
        span.textContent = count;
      }
    });

    btnPlus.forEach(btn => {
      if (btn.dataset.pizza === name) {
        btn.disabled = (count >= 20);
      }
    });
    btnMinus.forEach(btn => {
      if (btn.dataset.pizza === name) {
        btn.disabled = (count <= 0);
      }
    });
    if (count === 0) {
      delete quantities[name];
    } else {
      quantities[name] = count;
    }

    localStorage.setItem('pizzaQuantities', JSON.stringify(quantities));
  }
}

  function filterPizzas() {
    const selectedCat = categorySelect.value;
    const selectedIng = ingredientSelect.value;
    const selectedPrice = priceSelect.value;

    const filtered = pizzas.filter(pizza => {
      const matchCat = !selectedCat || pizza.categorie === selectedCat;
      const matchIng = !selectedIng || pizza.ingredients.includes(selectedIng);
      const matchPrice = !selectedPrice || pizza.prix === selectedPrice;
      return matchCat && matchIng && matchPrice;
    });

    displayPizzas(filtered);
  }

  // === Événements ===
  categorySelect.addEventListener('change', filterPizzas);
  ingredientSelect.addEventListener('change', filterPizzas);
  priceSelect.addEventListener('change', filterPizzas);
  resetBtn.addEventListener('click', () => {
    categorySelect.value = "";
    ingredientSelect.value = "";
    priceSelect.value = "";
    displayPizzas(pizzas);
  });

  // === Initialisation ===
  displayPizzas(pizzas);