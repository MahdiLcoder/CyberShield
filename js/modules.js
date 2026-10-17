document.querySelectorAll("[data-category-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.categoryFilter;
    const cards = document.querySelectorAll(".module-card");
    const buttons = document.querySelectorAll(".filter-chip");

    buttons.forEach((filterButton) => {
      const isActive = filterButton.dataset.category === category;
      if (isActive) {
        filterButton.classList.remove(
          "bg-white",
          "text-slate-700",
          "border",
          "border-slate-200",
          "hover:bg-slate-100",
        );
        filterButton.classList.add(
          "bg-sky-600",
          "text-white",
          "shadow-sm",
          "hover:bg-sky-700",
        );
      } else {
        filterButton.classList.remove(
          "bg-sky-600",
          "text-white",
          "shadow-sm",
          "hover:bg-sky-700",
        );
        filterButton.classList.add(
          "bg-white",
          "text-slate-700",
          "border",
          "border-slate-200",
          "hover:bg-slate-100",
        );
      }
    });

    cards.forEach((card) => {
      card.style.display =
        category === "all" || card.dataset.cat === category ? "flex" : "none";
    });
  });
});
