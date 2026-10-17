document.querySelectorAll("#answers-container button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("is-selected");
  });
});
