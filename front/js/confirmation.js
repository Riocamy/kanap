const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const orderId = getProductId();

const cart = JSON.parse(localStorage.getItem("cart"));

const idConfirmation = document.querySelector("#orderId");

const btnRetourHtml = `<button id="retourAccueil"><a href="./index.html">Retour à l'accueil</a></button>`;

//Affichage de l'orderId dans le DOM
(function () {
  idConfirmation.innerHTML = `
  <br>
  <strong>${orderId}</strong>. <br>
  <br>
  `;

  idConfirmation.insertAdjacentHTML("beforeend", btnRetourHtml);

  localStorage.clear();
})();