if (sessionStorage.getItem("accesAutorise") !== "true") {
    window.location.href = "login.html";
}
const logoutButton = document.querySelector(".nv1");
document.addEventListener("DOMContentLoaded", () => {
    const btnCategorie = document.getElementById("btn-categorie");
    const btnPrix = document.getElementById("btn-prix");
    const btnIngredient = document.getElementById("btn-ingredient");
    const btnPizza = document.getElementById("btn-pizza");
    const contentArea = document.getElementById("content-area");
    const logoutButton = document.querySelector(".nv1");

    document.getElementById("nv0").addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("accesAutorise");
            window.location.href = "login.html";
        });
    }


    contentArea.innerHTML = `<div style="text-align:center; margin-top: 50px;"><h2>Bienvenue sur le panneau d'administration</h2><p>Sélectionnez une option dans la barre latérale pour commencer.</p></div>`;

    // ============ CATÉGORIES ============
    btnCategorie.addEventListener("click", () => {
        contentArea.innerHTML = `
            <div class="categorie-container">
                <div class="categorie-form">
                    <h3>Création de catégorie</h3>
                    <div>
                        <input type="text" id="nom" placeholder="Entrer le nom">
                    </div>
                    <button id="creer-categorie">Créer la catégorie</button>
                </div>

                <div class="categorie-list">
                    <h3>Liste des catégories</h3>
                    <ul id="liste-categories"></ul>
                </div>
            </div>
        `;

        const creerBtn = document.getElementById("creer-categorie");
        const nomInput = document.getElementById("nom");
        const liste = document.getElementById("liste-categories");

        function afficherCategories() {
            const categories = JSON.parse(localStorage.getItem("categories")) || [];
            liste.innerHTML = "";
            categories.forEach((cat, index) => {
                const li = document.createElement("li");
                li.textContent = cat;
                const delBtn = document.createElement("button");
                delBtn.textContent = "✖";
                delBtn.style.marginLeft = "10px";
                delBtn.style.color = "red";
                delBtn.onclick = () => {
                    categories.splice(index, 1);
                    localStorage.setItem("categories", JSON.stringify(categories));
                    afficherCategories();
                };
                li.appendChild(delBtn);
                liste.appendChild(li);
            });
        }

        creerBtn.addEventListener("click", () => {
            const nom = nomInput.value.trim();
            if (nom !== "") {
                const categories = JSON.parse(localStorage.getItem("categories")) || [];
                categories.push(nom);
                localStorage.setItem("categories", JSON.stringify(categories));
                nomInput.value = "";
                afficherCategories();
            } else {
                alert("Veuillez entrer un nom de catégorie.");
            }
        });

        afficherCategories();
    });

    btnPrix.addEventListener("click", () => {
        contentArea.innerHTML = `
            <div class="prix-container">
                <div class="prix-form">
                    <h3>Création de prix fixe</h3>
                    <div>
                        <input type="number" id="prix" placeholder="Entrer le prix">
                    </div>
                    <button id="creer-prix">Créer le prix</button>
                </div>

                <div class="prix-list">
                    <h3>Liste des prix</h3>
                    <ul id="liste-prix"></ul>
                </div>
            </div>
        `;

        const creerBtn = document.getElementById("creer-prix");
        const prixInput = document.getElementById("prix");
        const liste = document.getElementById("liste-prix");

        function afficherPrix() {
            const prixList = JSON.parse(localStorage.getItem("prix")) || [];
            liste.innerHTML = "";
            prixList.forEach((p, index) => {
                const li = document.createElement("li");
                li.textContent = `${p} €`;
                const delBtn = document.createElement("button");
                delBtn.textContent = "✖";
                delBtn.style.marginLeft = "10px";
                delBtn.style.color = "red";
                delBtn.onclick = () => {
                    prixList.splice(index, 1);
                    localStorage.setItem("prix", JSON.stringify(prixList));
                    afficherPrix();
                };
                li.appendChild(delBtn);
                liste.appendChild(li);
            });
        }

        creerBtn.addEventListener("click", () => {
            const val = prixInput.value.trim();
            if (val !== "") {
                const prixList = JSON.parse(localStorage.getItem("prix")) || [];
                prixList.push(val);
                localStorage.setItem("prix", JSON.stringify(prixList));
                prixInput.value = "";
                afficherPrix();
            } else {
                alert("Veuillez entrer un prix.");
            }
        });

        afficherPrix();
    });

    btnIngredient.addEventListener("click", () => {
        contentArea.innerHTML = `
            <div class="ingredient-container">
                <div class="ingredient-form">
                    <h3>Création d'ingrédient</h3>
                    <div>
                        <input type="text" id="ingredient" placeholder="Entrer un ingrédient">
                    </div>
                    <button id="creer-ingredient">Créer l'ingrédient</button>
                </div>
                <div class="ingredient-list">
                    <h3>Liste des ingrédients</h3>
                    <ul id="liste-ingredients"></ul>
                </div>
            </div>
        `;

        const creerBtn = document.getElementById("creer-ingredient");
        const input = document.getElementById("ingredient");
        const liste = document.getElementById("liste-ingredients");

        function afficherIngredients() {
            const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
            liste.innerHTML = "";
            ingredients.forEach((ing, index) => {
                const li = document.createElement("li");
                li.textContent = ing;

                const delBtn = document.createElement("button");
                delBtn.textContent = "✖";
                delBtn.style.marginLeft = "10px";
                delBtn.style.color = "red";
                delBtn.onclick = () => {
                    ingredients.splice(index, 1);
                    localStorage.setItem("ingredients", JSON.stringify(ingredients));
                    afficherIngredients();
                };

                li.appendChild(delBtn);
                liste.appendChild(li);
            });
        }

        creerBtn.addEventListener("click", () => {
            const val = input.value.trim();
            if (val !== "") {
                const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
                ingredients.push(val);
                localStorage.setItem("ingredients", JSON.stringify(ingredients));
                input.value = "";
                afficherIngredients();
            } else {
                alert("Veuillez entrer un ingrédient.");
            }
        });

        afficherIngredients();
    });

    
    btnPizza.addEventListener("click", () => {
    contentArea.innerHTML = `
        <div class="pizza-container">
            <div class="pizza-form">
                <h3>Création de pizza</h3>
                <input type="text" id="pizza-nom" placeholder="Nom de la pizza">
                <label for="pizza-categorie">Catégorie :</label>
                <select id="pizza-categorie"></select>
                <label>Ingrédients :</label>
                <div id="ingredients-checkboxes" class="checkbox-wrapper"></div>
                <label for="pizza-prix">Prix :</label>
                <select id="pizza-prix"></select>
                <label for="pizza-image-url">Image:</label>
                <input type="text" id="pizza-image-url" placeholder="Nom du fichier image dans /images/">
                <button id="creer-pizza">Créer la pizza</button>
            </div>
            <div class="pizza-list">
                <h3>Liste des pizzas</h3>
                <ul id="liste-pizzas"></ul>
            </div>
        </div>
    `;

    const nomInput = document.getElementById("pizza-nom");
    const categorieSelect = document.getElementById("pizza-categorie");
    const prixSelect = document.getElementById("pizza-prix");
    const imageUrlInput = document.getElementById("pizza-image-url");
    const liste = document.getElementById("liste-pizzas");
    const creerBtn = document.getElementById("creer-pizza");

    function afficherCategories() {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        categorieSelect.innerHTML = "";
        categories.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            categorieSelect.appendChild(opt);
        });
    }

    function afficherPrix() {
        const prixList = JSON.parse(localStorage.getItem("prix")) || [];
        prixSelect.innerHTML = "";
        prixList.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p;
            opt.textContent = `${p} €`;
            prixSelect.appendChild(opt);
        });
    }

    function afficherCheckboxIngredients() {
        const container = document.getElementById("ingredients-checkboxes");
        const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
        container.innerHTML = "";
        ingredients.forEach((ing, i) => {
            const id = `ingredient-${i}`;
            const input = document.createElement("input");
            input.type = "checkbox";
            input.value = ing;
            input.id = id;
            input.name = "ingredients";
            const label = document.createElement("label");
            label.setAttribute("for", id);
            label.textContent = ing;
            const wrapper = document.createElement("div");
            wrapper.classList.add("checkbox-item");
            wrapper.appendChild(input);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });
    }

    function afficherPizzas() {
        const pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        liste.innerHTML = "";
        pizzas.forEach((pizza, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${pizza.nom}</strong> - ${pizza.categorie} - ${pizza.ingredients.join(", ")} - ${pizza.prix} €
                <br>
                ${pizza.image ? `<img class="card-img" src="../assets/${pizza.image}" alt="${pizza.nom}" style="max-width:150px; margin-top:5px;">` : ""}
            `;
            li.style.display = "flex";
            li.style.flexDirection = "column";
            const delBtn = document.createElement("button");
            delBtn.textContent = "✖";
            delBtn.style.marginLeft = "10px";
            delBtn.style.color = "red";
            delBtn.onclick = () => {
                pizzas.splice(index, 1);
                localStorage.setItem("pizzas", JSON.stringify(pizzas));
                afficherPizzas();
            };
            li.appendChild(delBtn);
            liste.appendChild(li);
        });
    }

    creerBtn.addEventListener("click", () => {
    const nom = nomInput.value.trim();
    const categorie = categorieSelect.value;
    const prix = prixSelect.value;
    const ingredients = Array.from(document.querySelectorAll("input[name='ingredients']:checked")).map(cb => cb.value);
    const image = imageUrlInput.value.trim();

    if (nom && categorie && prix && ingredients.length > 0 && image) {
        const pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];

        if (pizzas.length >= 20) {
            alert("Le nombre maximum de pizzas est atteint. Supprimez une pizza pour en ajouter une nouvelle.");
            return;
        }

        pizzas.push({ nom, categorie, prix, ingredients, image });
        localStorage.setItem("pizzas", JSON.stringify(pizzas));

        nomInput.value = "";
        imageUrlInput.value = "";
        document.querySelectorAll("input[name='ingredients']").forEach(cb => cb.checked = false);
        afficherPizzas();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
});

    afficherCategories();
    afficherPrix();
    afficherCheckboxIngredients();
    afficherPizzas();
});

});