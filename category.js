const filterCards = document.querySelectorAll(".filter-card");
const form = document.querySelector("#filters form");
const formReset = document.querySelector("#filters .reset-btn");

filterCards.forEach((card) => {
  card
    .querySelector(".fa-caret-down")
    .addEventListener("click", () => card.classList.add("active"));

  card
    .querySelector(".fa-caret-up")
    .addEventListener("click", () => card.classList.remove("active"));
});

formReset.addEventListener("click", () => {
  filterCards.forEach((card) => {
    card.classList.remove("active");
  });
});
const cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    window.location.href = "./cart.html";
  });
}
