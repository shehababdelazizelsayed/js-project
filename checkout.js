function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCheckoutCart() {
  const cart = getCart();
  const tbody = document.querySelector(".cart-table tbody");
  tbody.innerHTML = "";
  let fullTotal = 0;

  cart.forEach((item, index) => {
    const totalPrice = item.price * item.quantity;
    fullTotal += totalPrice;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" width="60"/></td>
      <td>${item.name}</td>
      <td>${item.brand || "-"}</td>
      <td>
        <div class="quantity-control">
          <button class="decrease">-</button>
          <input type="text" value="${item.quantity}" readonly />
          <button class="increase">+</button>
          <button class="delete-btn">Delete</button>
        </div>
      </td>
      <td>${item.price} EGP</td>
      <td>${totalPrice} EGP</td>
    `;

    row.querySelector(".increase").addEventListener("click", () => {
      cart[index].quantity++;
      saveCart(cart);
      renderCheckoutCart();
    });

    row.querySelector(".decrease").addEventListener("click", () => {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        renderCheckoutCart();
      }
    });

    row.querySelector(".delete-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart(cart);
      renderCheckoutCart();
    });

    tbody.appendChild(row);
  });

  updateTotals(fullTotal);
}

function updateTotals(fullTotal) {
  const totalBox = document.querySelector(".totals-box");
  if (totalBox) {
    const shipment = 20;
    totalBox.querySelector("p span").textContent = `${fullTotal} EGP`;
    totalBox.querySelector("p:nth-child(2) span").textContent = `${shipment} EGP`;
    totalBox.querySelector("strong span").textContent = `${fullTotal + shipment} EGP`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutCart();
});

// ===================== الدفع =====================
const confirmBtn = document.querySelector(".confirm-btn");
if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    const method = document.querySelector('input[name="payment"]:checked').value;

    if (method === "cod") {
      alert("Order placed with Cash on Delivery!");
      return;
    }

    if (method === "card") {
      // عرض زرار PayPal
      document.querySelector(".confirm-order").innerHTML = `<div id="paypal-button-container"></div>`;

      paypal.Buttons({
        createOrder: function (data, actions) {
          const totalText = document.querySelector(".totals-box strong span").textContent;
          const totalNumber = parseFloat(totalText.replace(/[^\d.]/g, "")); // شيل EGP
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: totalNumber.toString() } // بالدولار في Sandbox
              }
            ]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert("Transaction completed by " + details.payer.name.given_name);
            window.location.href = "success.html";
          });
        },
        onCancel: function () {
          window.location.href = "cancel.html";
        }
      }).render("#paypal-button-container");
    }
  });
}
