const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-tab");
    tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
    tabPanels.forEach((p) => p.classList.toggle("active", p.id === id));
  });
});

const shareButtons = Array.from(document.querySelectorAll(".share-btn"));
shareButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const network = btn.getAttribute("data-network");
    const url = window.location.href;
    const title =
      document.querySelector(".Name")?.textContent || "Great product";

    if (network === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        btn.title = "Link copied!";
      } catch (e) {}
      return;
    }

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    let shareUrl = "";
    if (network === "facebook")
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    if (network === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    if (network === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    if (shareUrl) window.open(shareUrl, "_blank");
  });
});
