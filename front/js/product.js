//Récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;
console.log (queryString_url_id);

/*
//Récupération de l'ID du produit (Méthode Slice)
const productId = queryString_url_id.slice(4);
console.log(productId);
*/

//Récupération de l'ID du produit (Méthode URLSearchParams)
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const productId = urlSearchParams.get("id");
console.log(productId);

//Modification de l'URL de l'API, en fonction de l'ID du produit
const url = `http://localhost:3000/api/products/${productId}`;
console.log(url);

//Constantes et fonctions nécessaires à l'intégration de la photo de produit
const div = document.getElementsByClassName("item__img");
console.log(div);

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

//Récupération des données du produit sur l'API
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const product = data;
    
    //Intégration de la photo du produit
    let img = createNode('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    console.log(img);
    append(div[0], img);

    //Intégration du nom du produit
    let productName = document.getElementById("title");
    productName.innerHTML += `<h1 id="title">${product.name}</h1>`;
    console.log(productName);

    //Intégration du prix
    let productPrice = document.getElementById("price");
    productPrice.innerHTML += `<span id="price">${product.price}</span>`;
    console.log(productPrice);

    //Intégration de la description
    let productDescription = document.getElementById("description");
    productDescription.innerHTML += `<p id="description">${product.description}/p>`;
    console.log(productDescription);

    //Intégration de la couleur
    product.colors.forEach(productColor => {
      option = document.createElement('option');
      option.value = productColor;
      option.innerHTML = productColor;
      colors.appendChild(option);
      console.log(productColor);
    })

    /*
    //Contenu de la page produit
    Récupérer l'ID du produit
    Interroger l'API pour accéder aux données
    Modifier le DOM avec les datas du produit
    */
  
    //Ajout du produit dans le panier
    let button = document.getElementById("addToCart"); //Définir le bouton

    button.addEventListener("click", function(cart) { //La fonction permettant d'ajouter le produit sélectionné au panier
      let name = document.getElementById("title").textContent;
      let quantity = document.getElementById("quantity").value;
      let color = document.getElementById("colors").value;

      if (quantity <= 0) { //Conditions d'ajout au panier
        alert("Veuillez saisir le nombre de canapés.");
      } else if (color == "") {
        alert("Veuillez choisir une couleur.");
      } else {
        localStorage.setItem(productId, name, quantity, color);
        //window.location.assign("cart.html"); //Redirection vers la page Panier
        console.log(localStorage);
      }
    })
  })

/*
// Ajouter les produits au panier
Intégrer le bouton
Définir les valeurs à récupérer dans le panier : id, quantité et couleur sélectionnée
Cliquer sur le bouton pour ajouter au panier
Produit ajouté au panier avec les bonnes informations
*/