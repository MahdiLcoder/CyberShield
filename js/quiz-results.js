document.querySelectorAll("[data-toggle-explanation]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .getElementById(button.dataset.toggleExplanation)
      .classList.toggle("hidden");
  });
});
