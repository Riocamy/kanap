// Récupération des données de l'API
fetch("http://localhost:3000/api/products/")
  .then(function(response) { //Version courte : .then((response) => response.json())
    if (response.ok) {
      return response.json();
    }
  }) 
  // Création d'une liste des produits à partir des données de l'API
  .then(function(products) {
    //Intégration des différents produits dans la page d'accueil
    for(let product of products) {
      let i = 0; i < product.length; i++;
      document.getElementById("items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>`
    }
  })
  // En cas d'échec de récupération des données de l'API
  .catch(function(error) {
    console.log(error);
  });