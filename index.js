const shoppingCart = document.getElementById("shoppingCart");
const productQuantities = Array.from(document.querySelectorAll(".product-quantity"));
const productUnitPrices = Array.from(document.querySelectorAll(".product-unit-price"));
const productTotalPrices = Array.from(document.querySelectorAll(".product-total-price"));
const grandTotal = document.getElementById("grandTotal");

const resetButton = document.getElementById("resetButton");
const helpButton = document.getElementById("helpButton");

const confirmModal = document.getElementById("confirmModal");
const messageArea = document.getElementById("messageArea");

function showConfirmModal() {
  confirmModal.style.display = "flex";
  shoppingCart.style.display = "none";
}

function showMessage(message) {
  messageArea.innerText = message;
}

productQuantities.forEach((productQuantity, index) => {
  productQuantity.addEventListener("input", () => {
    let quantity = Number(productQuantity.value);

    if (quantity < 0 || quantity > 20) {
      showMessage("Il valore deve essere compreso tra 0 e 20.");
      quantity = 0;
      productQuantity.value = 0;
    } else {
      messageArea.innerText = "";
    }

    const unitPrice = Number(productUnitPrices[index].innerText.replace("€", ""));
    const totalPrice = quantity * unitPrice;
    productTotalPrices[index].innerText = totalPrice + "€";

    const totalOrder = productTotalPrices.reduce((total, productTotalPrice) => {
      return total + Number(productTotalPrice.innerText.replace("€", ""));
    }, 0);

    grandTotal.innerText = totalOrder + "€";
  });
});

confirmModal.addEventListener("click", function (event) {
  if (event.target.dataset.action == "confirm") {
    confirmModal.style.display = "none";
    shoppingCart.style.display = "block";

    productQuantities.forEach((productQuantity) => (productQuantity.value = ""));
    productTotalPrices.forEach((productTotalPrice) => (productTotalPrice.innerText = ""));
    grandTotal.innerText = "0€";
    messageArea.innerText = "";
  } else if (event.target.dataset.action == "cancel") {
    confirmModal.style.display = "none";
    shoppingCart.style.display = "block";
  }
});

resetButton.addEventListener("click", showConfirmModal);

helpButton.addEventListener("click", () => {
  showMessage("Per riempire il modulo, inserisci la quantità desiderata per ogni prodotto. I valori immessi devono essere compresi tra 0 e 20.");
});
