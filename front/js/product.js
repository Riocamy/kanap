//Récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;
console.log (queryString_url_id);

/*
//Récupération de l'ID du produit (Méthode Slice)
const idProduit = queryString_url_id.slice(4);
console.log(idProduit);
*/

//Récupération de l'ID du produit (Méthode URLSearchParams)
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const productId = urlSearchParams.get("id");
console.log(productId);