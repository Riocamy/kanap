//Récupération des données de l'API
fetch("http://localhost:3000/api/products/")
  .then(function(data) {
    if (data.ok) {
      return data.json();
    }
  })
  //Création d'une liste des produits à partir des données de l'API
  .then(function(jsonListProduct) {
    //Intégration des produits dans la page d'accueil
    for(let product of jsonListProduct) {
      let i = 0; i < product.length; i++;
      document.getElementById("items").innerHTML += `<a href="${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>`
    }
  })
  //En cas d'erreur de récupération des données de l'API
  .catch(function(error) {
    console.log(error)
  });




/* RAISONNEMENT
Récupérer les données de l'API avec une requête GET
Créer une liste des produits au format JSON
Modifier le DOM
Intégrer chaque produit avec une boucle FOR
*/



  /* OLD CODE
  .then(function(product) {
    for (let i = 0; i < product.length; i++) {
      document.getElementById("items").innerHTML += `<a href="${product._id}">
                                                      <article>
                                                        <img src="http://localhost:3000/api/products/${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>`
    }
    console.log(product);
  })
  .catch(function(error) {
    console.log(error)
    // Une erreur est survenue
  });
  */
