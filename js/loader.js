(function () {
  const loader = document.querySelector("[data-loader]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.classList.add("is-loading");

  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    window.setTimeout(() => loader.remove(), 600);
  };

  window.addEventListener("load", () => {
    window.setTimeout(hideLoader, reducedMotion ? 0 : 2800);
  });
})();
