//Récupération de l'ID du produit
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })

  .then((product) => {
    selectedProduct(product);
    registredProduct(product);
  })
  .catch((error) => {
    alert(error);
  });

// Sélection de l'ID colors
const selectedColor = document.querySelector("#colors");

// Sélection de l'ID quantity
const selectedQuantity = document.querySelector("#quantity");

// Sélection du bouton Ajouter au panier
const button = document.querySelector("#addToCart");

// Fonction qui récupère les données de la promesse .then(product) pour injecter les valeurs dans le fichier Html
let selectedProduct = (product) => {

  // Intégration des données du produit sélectionné dans la page HTML
  document.querySelector("head > title").textContent = product.name;
  document.querySelector(".item__img")
  .innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent += product.name;
  document.querySelector("#price").textContent += product.price;
  document.querySelector("#description").textContent += product.description;

  // Boucle intégrant les différentes couleurs du produit dans le HTML
  for (color of product.colors) {
    let option = document.createElement("option");
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectedColor.appendChild(option);
  }
};

// Fonction qui enregistre dans un objet les options de l'utilisateur au click sur le bouton ajouter au panier
let registredProduct = (product) => {

  // Écoute de l'évènement click sur le bouton ajouter
  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (selectedColor.value == false) {
      confirm("Veuillez sélectionner une couleur");
    } else if (selectedQuantity.value == 0) {
      confirm("Veuillez sélectionner le nombre d'articles souhaités");
    } else {
      alert("Votre article a bien été ajouté au panier");

      // Récupération des informations du produit sélectionné
      let selectedProduct = {
        id: product._id,
        name: product.name,
        img: product.imageUrl,
        altTxt: product.altTxt,
        description: product.description,
        color: selectedColor.value,
        quantity: parseInt(selectedQuantity.value, 10),
        price: product.price,
        totalPrice: product.price * parseInt(selectedQuantity.value, 10),
      };
      console.log(selectedProduct);

      /* Gestion du Local Storage */

      //Récupération des données du Local Storage
      let existingCart = JSON.parse(localStorage.getItem("cart"));

      // Si le Local Storage existe
      if (existingCart) {
        console.log("Il y a déjà un produit dans le panier, on compare les données");
        // On recherche avec la méthode find() si l'id et la couleur d'un article sont déjà présents
        let item = existingCart.find(
          (item) =>
            item.id == selectedProduct.id && item.color == selectedProduct.color
        );
        // Si oui, on incrémente la nouvelle quantité et la mise à jour du prix total de l'article
        if (item) {
          item.quantity = item.quantity + selectedProduct.quantity;
          item.totalPrice += item.price * selectedProduct.quantity;
          localStorage.setItem("cart", JSON.stringify(existingCart));
          console.log("Quantité supplémentaire dans le panier.");
          return;
        }
        // Si non, alors on push le nouvel article sélectionné
        existingCart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        console.log("Le produit a été ajouté au panier");

      } else {
        //  Sinon création d'un tableau dans le lequel on push l'objet "selectedProduct"
        let createLocalStorage = [];
        createLocalStorage.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(createLocalStorage));
        console.log("Le panier est vide, on ajoute le premier produit");
      }
    }
  });
};