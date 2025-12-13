document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 120);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
