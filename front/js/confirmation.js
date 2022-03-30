const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const orderId = getProductId();

const cart = JSON.parse(localStorage.getItem("cart"));

const total = JSON.parse(localStorage.getItem("sommeTotale"));

const idConfirmation = document.querySelector("#orderId");

const btnRetourHtml = `<button id="retourAccueil"><a href="./index.html">Retour à l'accueil</a></button>`;

//Fonction Auto-invoquer pour afficher l'orderId dans le DOM

(function () {
  idConfirmation.innerHTML = `
  <p>Commande validée ! <br>Votre numéro de commande est : 
  <strong>${orderId}</strong>. <br>
  Le montant de votre commande est de <strong>${total} €</strong>.</p> <br>
  `;

  idConfirmation.insertAdjacentHTML("beforeend", btnRetourHtml);

  localStorage.clear();
})();