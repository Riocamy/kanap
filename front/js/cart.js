// Variable qui récupère les articles du panier dans le local storage
let cart = JSON.parse(localStorage.getItem("cart"));

// Variable pour stocker les id de chaque articles présent dans le panier
let products = [];

// Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST
let orderId = "";

// Condition de vérification si le panier existe et ou est vide et modification texte
if (cart === null || cart.length === 0) {
  alert("Le panier est vide !");
} else {
  console.log("Des produits sont présents dans le panier");
}

//Boucle intégrant les informations du produit dans la page panier
for (product of cart) {
  document.querySelector(
    "#cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
        <div class="cart__item__img">
            <img src="${product.img}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>Couleur du produit: ${product.color}</p>
                <p>Prix unitaire: ${product.price}€</p>
            </div>
        <div class="cart__item__content__settings">
            <div id="jojo" class="cart__item__content__settings__quantity">
                <p id="quantité">Qté : ${product.quantity} </p>
                <p id="sousTotal">Prix total pour cet article: ${product.totalPrice}€</p> 
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem"><button>Supprimer</button></p>
            </div>
        </div>
        </div>
    </article>`;

  // Récupération des Id de chaque articles et envoi dans le tableau de la variable products[]
  products.push(product.id);
  console.log(products);
}

// Fonction récupération des prix des articles et somme totale
let addPriceFunction = () => {
  console.log(cart);
  let found = cart.map((element) => element.totalPrice);
  console.log(found);

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let somme = found.reduce(reducer);
  console.log(somme);
  return somme;
};

// Fonction récupération des quantités des articles et quantité totale
let addQuantFunction = () => {
  console.log(cart);
  let found2 = cart.map((element) => element.quantity);
  console.log(found2);

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let quant = found2.reduce(reducer);
  console.log(quant);
  return quant;
};

// Fonction mise à jour du local storage products
let majLocalStorageProducts = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fonction d'injection dans le DOM des donnés addPrice et addQuant
function injectSommeQuant() {
  // Appel de la fonction addPriceFunction qui nous retourne la variable somme
  let sommeTotale = addPriceFunction();
  //Intégration de la somme totale dans le DOM
  document.querySelector("#totalPrice").textContent = sommeTotale;

  localStorage.setItem("sommeTotale", JSON.stringify(sommeTotale));

  // Appel de la fonction addQuantFunction qui nous retourne la variable quant
  let quantTotale = addQuantFunction();

  //intégration de la quantité des articles dans le DOM
  document.querySelector("#totalQuantity").textContent = quantTotale;

  majLocalStorageProducts();
}
injectSommeQuant();

console.log(cart);
let itemQuantity = Array.from(document.querySelectorAll(".itemQuantity"));
let sousTotal = Array.from(document.querySelectorAll("#sousTotal"));
let screenQuantity = Array.from(document.querySelectorAll("#quantité"));

itemQuantity.forEach(function (quantity, i) {
  quantity.addEventListener("change", (event) => {
    event.preventDefault();
    let newArticlePrice = quantity.value * cart[i].price;
    console.log(quantity.value);

    screenQuantity[i].textContent = "Qté: " + quantity.value;
    cart[i].quantity = parseInt(quantity.value, 10);

    sousTotal[i].textContent =
      "Prix total pour cet article: " + newArticlePrice + " €";
      cart[i].totalPrice = newArticlePrice;

    console.log(`le prix de ${cart[i].name} et passé à ${newArticlePrice}`);

    injectSommeQuant();
  });
});



/* SUPPRESSION DES ARTICLES */

// Récupération de la node list des boutons supprimer et transformation en tableau avec Array.from
let supprimerSelection = Array.from(document.querySelectorAll(".deleteItem"));

// Nouveau tableau pour récupérer le tableau cart existant et contrôler les suppression
let tabControlDelete = [];

// Fonction de suppression des articles
function deleteProduct() {
  for (let i = 0; i < supprimerSelection.length; i++) {
    // Écoute d'évènements au click sur le tableau des boutons supprimer
    supprimerSelection[i].addEventListener("click", () => {
      // Suppression de l'article visuellement sur la page
      supprimerSelection[i].parentElement.style.display = "none";

      // Copie du tableau cart dans le tableau tabControlDelete
      tabControlDelete = cart;

      // Array.prototype.splice() supprime un élément à chaque index [i] du tableau écouté
      tabControlDelete.splice([i], 1);

      // Mise à jour du local storage
      cart = localStorage.setItem("cart", JSON.stringify(tabControlDelete));

      // Rafraîchissement de la page
      window.location.href = "cart.html";
    });
  }
}

deleteProduct();



/* LE FORMULAIRE */

// sélection du bouton Valider

const btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir contrôler, valider et ennoyer le formulaire et les produits au back-end

btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  /* GESTION DU FORMULAIRE */

  // Regex pour le contrôle des champs Prénom, Nom et Ville
  const regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  // Regex pour le contrôle du champ Adresse
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  // Regex pour le contrôle du champ Email
  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonctions de contrôle du champ Prénom:
  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      inputFirstName.style.backgroundColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      inputFirstName.style.backgroundColor = "#FF6F61";

      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ Prénom de formulaire invalide, ex: Paul";
      return false;
    }
  }

  // Fonctions de contrôle du champ Nom:
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (regExPrenomNomVille(nom)) {
      inputLastName.style.backgroundColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ Nom de formulaire invalide, ex: Durand";
      return false;
    }
  }

  // Fonctions de contrôle du champ Adresse:
  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (regExAdresse(adresse)) {
      inputAddress.style.backgroundColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";

      document.querySelector("#addressErrorMsg").textContent =
        "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
      return false;
    }
  }

  // Fonctions de contrôle du champ Ville:
  function cityControl() {
    const ville = contact.city;
    let inputCity = document.querySelector("#city");
    if (regExPrenomNomVille(ville)) {
      inputCity.style.backgroundColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";

      document.querySelector("#cityErrorMsg").textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }
  }

  // Fonctions de contrôle du champ Email:
  function mailControl() {
    const courriel = contact.email;
    let inputMail = document.querySelector("#email");
    if (regExEmail(courriel)) {
      inputMail.style.backgroundColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputMail.style.backgroundColor = "#FF6F61";

      document.querySelector("#emailErrorMsg").textContent =
        "Champ Email de formulaire invalide, ex: example@contact.fr";
      return false;
    }
  }

  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistrer le formulaire dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));

    document.querySelector("#order").value =
      "Articles et formulaire valide\n Passer commande !";
    sendToServer();
  } else {
    error("Veuillez bien remplir le formulaire");
  }

  /* FIN GESTION DU FORMULAIRE */

  /* REQUÊTE DU SERVEUR ET POST DES DONNÉES */
  function sendToServer() {
    const sendToServer = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Ensuite on stock la réponse de l'api (orderId)
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
      });
    // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable
    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId;
    }
  }
});

/* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES */

// Maintenir le contenu du localStorage dans le champs du formulaire

let dataFormulaire = JSON.parse(localStorage.getItem("contact"));

console.log(dataFormulaire);
if (dataFormulaire) {
  document.querySelector("#firstName").value = dataFormulaire.firstName;
  document.querySelector("#lastName").value = dataFormulaire.lastName;
  document.querySelector("#address").value = dataFormulaire.address;
  document.querySelector("#city").value = dataFormulaire.city;
  document.querySelector("#email").value = dataFormulaire.email;
} else {
  console.log("Le formulaire est vide");
}