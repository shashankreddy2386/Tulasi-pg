const galleryItems = [
  { category: "Rooms", label: "Single-bed room", image: "assets/images/Single-Bed%20PG%20Room.png" },
  { category: "Rooms", label: "Two-bed shared room", image: "assets/images/Two-Bed%20Hostel%20Room.png" },
  { category: "Rooms", label: "Three-bed shared room", image: "assets/images/Minimal%20Three-Bedroom%20Dormitory.png" },
  { category: "Rooms", label: "Modern four-bed shared room", image: "assets/images/Modern%20Dorm%20Room%20with%20Four%20Beds%20and%20Lockers.png" },
  { category: "Rooms", label: "Shared room", image: "assets/images/Modern%20Dorm%20Room%20with%20Four%20Beds%20and%20Lockers.png" },
  { category: "Facilities", label: "Bathroom", image: "assets/images/bathroom.jpg" },
  { category: "Facilities", label: "TV in every room", image: "assets/images/Warm%20Minimalist%20TV%20and%20Sink%20Alcove.png" },
  { category: "Facilities", label: "In-room geyser", image: "assets/images/gyezer.jpg" },
  { category: "Facilities", label: "Water dispenser", image: "assets/images/Warm%20Corridor%20with%20Devotional%20Art%20and%20Water%20Cooler.png" },
  { category: "Facilities", label: "Vast parking area", image: "assets/images/parking.avif" },
  { category: "Facilities", label: "Dining area", image: "assets/images/Modern%20Cafeteria%20Dining%20Space.png" },
  { category: "Facilities", label: "Gym", image: "assets/images/Gym1%20(1).png" },
  { category: "Facilities", label: "Gym equipment", image: "assets/images/Gym1%20(2).png" }
];

function initGallery() {
  const filters = document.querySelector("[data-gallery-filters]");
  const grid = document.querySelector("[data-gallery]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  if (!filters || !grid || !lightbox || !lightboxImage) return;

  let visibleItems = [...galleryItems];
  let currentIndex = 0;
  const categories = ["All", ...new Set(galleryItems.map((item) => item.category))];

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImage.src = visibleItems[currentIndex].image;
    lightboxImage.alt = visibleItems[currentIndex].label;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  const move = (direction) => {
    currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
  };

  const renderGallery = (category = "All") => {
    visibleItems = category === "All" ? [...galleryItems] : galleryItems.filter((item) => item.category === category);
    grid.innerHTML = "";
    visibleItems.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item skeleton";
      button.innerHTML = `<img loading="lazy" src="${item.image}" alt="${item.label}" /><span>${item.label}</span>`;
      button.addEventListener("click", () => openLightbox(index));
      grid.appendChild(button);
    });
  };

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    if (index === 0) button.classList.add("is-active");
    button.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderGallery(category);
    });
    filters.appendChild(button);
  });

  document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  document.querySelector("[data-lightbox-prev]").addEventListener("click", () => move(-1));
  document.querySelector("[data-lightbox-next]").addEventListener("click", () => move(1));
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });

  renderGallery();
}

document.addEventListener("DOMContentLoaded", initGallery);
