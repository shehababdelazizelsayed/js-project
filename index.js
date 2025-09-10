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

const cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    window.location.href = "./cart.html";
  });
}

function redirectToProfile() {
  window.location.href = "./profile.html";
}

document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;

  function showSlides(n) {
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach((slide) => (slide.style.display = "none"));
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
    }

    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add("active");
    }
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  // Initialize slider
  showSlides(slideIndex);

  // Next/prev buttons
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => plusSlides(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => plusSlides(1));
  }

  // Dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => currentSlide(i + 1));
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    showSlides(slideIndex + 1);
  }, 5000);
});

const container = document.querySelector(".Mother-boards");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

const scrollAmount = container.offsetWidth / 3;

rightBtn.addEventListener("click", () => {
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
  container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});
