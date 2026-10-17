document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  });
});
