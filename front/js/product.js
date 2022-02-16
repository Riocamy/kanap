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
const newUrl = `http://localhost:3000/api/products/${productId}`;
console.log(newUrl);

//Récupération des données du produit sur l'API
fetch(newUrl)
  .then((response) => response.json())
  .then((data) => {
    const product = data;
    //selectedProduct(product);
    console.log(product);

    //Intégration des données du produit
    function selectedProduct (product) {
      let productImg = document.getElementByClassName("item_img");
      productImg.innerHTML += 
      `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    }
  })



/*
Récupérer l'ID du produit
Interroger l'API pour accéder aux données
Modifier le DOM avec les datas du produit
*/