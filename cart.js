function updateCartTotals() {
  const rows = document.querySelectorAll(".cart-table tbody tr");
  let finalTotal = 0;

  rows.forEach((row) => {
    const qtyInput = row.querySelector(".quantity-control input");
    const unitPriceCell = row.querySelector("td:nth-child(5)");
    const totalPriceCell = row.querySelector("td:nth-child(6)");

    if (!qtyInput || !unitPriceCell || !totalPriceCell) return;

    const qty = parseInt(qtyInput.value) || 0;
    const unitPrice =
      parseFloat(unitPriceCell.textContent.replace(/[^0-9.]/g, "")) || 0;
    const total = qty * unitPrice;

    totalPriceCell.textContent = "$" + total.toFixed(2);
    finalTotal += total;
  });

  document.querySelector(".checkout-box span:last-child").textContent =
    "$" + finalTotal.toFixed(2);
}

document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const btn = e.target;

    
    if (btn.textContent === "+") {
      const input = btn.parentElement.querySelector("input");
      input.value = parseInt(input.value) + 1;
      updateCartTotals();
    }

    
    if (btn.textContent === "-") {
      const input = btn.parentElement.querySelector("input");
      const newVal = parseInt(input.value) - 1;
      input.value = newVal > 0 ? newVal : 1;
      updateCartTotals();
    }

    
    if (btn.classList.contains("delete-btn")) {
      btn.closest("tr").remove();
      updateCartTotals();
    }
  }
});

document.addEventListener("DOMContentLoaded", updateCartTotals);
