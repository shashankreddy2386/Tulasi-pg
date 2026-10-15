const facilities = [
  ["assets/icons/wifi.svg", "24x7 Wi-Fi", "For classes, meetings, work and entertainment.", "assets/images/Modern%20Dorm%20Room%20with%20Four%20Beds%20and%20Lockers.png"],
  ["assets/icons/water.svg", "24x7 Water", "Water dispenser available for residents throughout the day.", "assets/images/Warm%20Corridor%20with%20Devotional%20Art%20and%20Water%20Cooler.png"],
  ["assets/icons/kitchen.svg", "Open Self-Cooking Kitchen", "Cook for yourself when you prefer flexibility.", "assets/images/Modern%20Cafeteria%20Dining%20Space.png"],
  ["assets/icons/room.svg", "Refrigerator", "Convenient cold storage for residents.", "assets/images/fridge.jpg"],
  ["assets/icons/laundry.svg", "Laundry", "Support for everyday clothing care.", "assets/images/Warm%20Corridor%20with%20Devotional%20Art%20and%20Water%20Cooler.png"],
  ["assets/icons/parking.svg", "Vast Bike Parking Area", "Plenty of space for convenient bike parking.", "assets/images/parking.avif"],
  ["assets/icons/iron.svg", "Ironing", "Keep your clothes ready for college or work.", "assets/images/iron.jpg"],
  ["assets/icons/room.svg", "Clean & Neat Rooms", "Simple, comfortable and maintained spaces.", "assets/images/Modern%20Dorm%20Room%20with%20Four%20Beds%20and%20Lockers.png"],
  ["assets/icons/maintenance.svg", "Room Maintenance", "Practical help for room upkeep.", "assets/images/Minimal%20Three-Bedroom%20Dormitory.png"],
  ["assets/icons/room.svg", "TV in Every Room", "Enjoy the convenience of a TV in your room.", "assets/images/Warm%20Minimalist%20TV%20and%20Sink%20Alcove.png"],
  ["assets/icons/room.svg", "AC & Non-AC Rooms", "Choose the room type that suits your comfort and budget.", "assets/images/Two-Bed%20Hostel%20Room.png"],
  ["assets/icons/room.svg", "Mattresses & Pillows", "Mattresses and pillows are provided for your stay.", "assets/images/Single-Bed%20PG%20Room.png"],
  ["assets/icons/room.svg", "Individual Wardrobes", "Separate luggage storage is provided for every resident.", "assets/images/Modern%20Dorm%20Room%20with%20Four%20Beds%20and%20Lockers.png"],
  ["assets/icons/veg.svg", "Veg Food", "Food option listed, details to be verified.", "assets/images/Modern%20Cafeteria%20Dining%20Space.png"],
  ["assets/icons/nonveg.svg", "Non-Veg Food", "Food option listed, details to be verified.", "assets/images/Modern%20Cafeteria%20Dining%20Space.png"],
  ["assets/icons/cctv.svg", "CCTV Surveillance", "A visible trust feature without exaggerated claims.", "assets/images/cctv.jpg"],
  ["assets/icons/gym.svg", "Gym Facility", "Support your fitness routine.", "assets/images/Gym1%20(1).png"],
  ["assets/icons/geyser.svg", "In-Room Geyser", "Hot water support in rooms.", "assets/images/gyezer.jpg"]
];

function initNavigation() {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = [...document.querySelectorAll(".nav__links a[href^='#']")];

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initFacilities() {
  const grid = document.querySelector("[data-facilities]");
  if (!grid) return;

  grid.innerHTML = facilities
    .map(
      ([icon, title, copy, image]) => `
        <article class="facility-card reveal">
          <img class="facility-card__photo" src="${image}" alt="" aria-hidden="true" loading="lazy" />
          <div class="facility-card__content">
            <span class="facility-card__icon"><img src="${icon}" alt="" aria-hidden="true" /></span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function initReveals() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  initFacilities();
  initNavigation();
  initReveals();
});
