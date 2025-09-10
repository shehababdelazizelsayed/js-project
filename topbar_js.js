document.addEventListener("click", function (event) {
  if (!event.target.closest(".profile-wrapper")) {
    document.getElementById("profileDropdown").classList.remove("active");
  }
});

document.getElementById("emailBtn").addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("emailBox").classList.toggle("active");
  document.getElementById("phoneBox").classList.remove("active");
});

document.getElementById("phoneBtn").addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("phoneBox").classList.toggle("active");
  document.getElementById("emailBox").classList.remove("active");
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".wrapper")) {
    document.getElementById("emailBox").classList.remove("active");
    document.getElementById("phoneBox").classList.remove("active");
  }
});

function redirectToProfile() {
  window.location.href = "./profile.html";
}

const cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    window.location.href = "./cart.html";
  });
}

// ✅ define getCart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById("cartCount");

  if (cartCountElem) {
    if (count > 0) {
      cartCountElem.textContent = count;
      cartCountElem.style.display = "inline-block";
    } else {
      cartCountElem.style.display = "none";
    }
  }
}

// ✅ run once on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
