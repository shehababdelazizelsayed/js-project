

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    try {
      const firstName = document.getElementById("firstName")?.value || "";
      const lastName = document.getElementById("lastName")?.value || "";
      const email = document.getElementById("emailInput")?.value || "";
      const phone = document.getElementById("phone")?.value || "";

      const payload = {
        firstName,
        lastName,
        email,
        phone,
        savedAt: new Date().toISOString(),
      };

      
      localStorage.setItem("pendingRegisteredUser", JSON.stringify(payload));
    } catch (err) {
      
      console.error(
        "Failed to save registration fallback to localStorage",
        err
      );
    }
  });
});
