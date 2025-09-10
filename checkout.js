function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCheckoutCart() {
  const cart = getCart();
  const tbody = document.querySelector(".cart-table tbody");
  tbody.innerHTML = "";
  let fullTotal = 0;
  cart.forEach((item) => {
    const totalPrice = item.price * item.quantity;
    fullTotal += totalPrice;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" width="60"/></td>
      <td>${item.name}</td>
      <td>${item.brand || "-"}</td>
      <td>
        <div class="quantity-control">
          <input type="text" value="${item.quantity}" readonly />
        </div>
      </td>
      <td>${item.price} EGP</td>
      <td>${totalPrice} EGP</td>
    `;
    tbody.appendChild(row);
  });

  // Update totals in totals-box
  const totalBox = document.querySelector(".totals-box");
  if (totalBox) {
    // Use localStorage finalTotal if available, else use calculated
    let finalTotal = localStorage.getItem("finalTotal");
    if (!finalTotal) finalTotal = fullTotal;
    totalBox.querySelector("p span").textContent = `${fullTotal} EGP`;
    // Shipment is assumed to be 20 EGP as before
    const shipment = 20;
    totalBox.querySelector(
      "p:nth-child(2) span"
    ).textContent = `${shipment} EGP`;
    totalBox.querySelector("strong span").textContent = `${
      parseInt(finalTotal) + shipment
    } EGP`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutCart();
});

// Confirm button logic (if present)
const confirmBtn = document.querySelector(".confirm-btn");
if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    alert("Thank you! Your order has been confirmed.");
  });
}
