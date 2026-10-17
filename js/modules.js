document.querySelectorAll("[data-category-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.categoryFilter;
    const cards = document.querySelectorAll(".module-card");
    const buttons = document.querySelectorAll(".filter-chip");

    buttons.forEach((filterButton) => {
      const isActive = filterButton.dataset.category === category;
      filterButton.classList.toggle("is-active", isActive);
    });

    cards.forEach((card) => {
      card.style.display =
        category === "all" || card.dataset.cat === category ? "flex" : "none";
    });
  });
});
