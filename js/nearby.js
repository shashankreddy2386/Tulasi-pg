const nearbyPlaces = [
  {
    name: "Mandi King",
    category: "Food",
    description: "A local food landmark identified behind the PG.",
    proximity: "Behind the PG",
    address: "Anjaiah Nagar, Gachibowli, Hyderabad, Telangana 500032",
    destination: "Mandi King, Anjaiah Nagar, Gachibowli, Hyderabad"
  },
  {
    name: "Le Méridien Hyderabad",
    category: "Landmarks",
    description: "A prominent local landmark identified opposite the PG.",
    proximity: "Opposite the PG",
    address: "Gachibowli, Hyderabad, Telangana 500032",
    destination: "Le Meridien Hyderabad, Gachibowli, Hyderabad"
  },
  {
    name: "AIG Hospitals",
    category: "Healthcare",
    description: "Multi-speciality hospital on Mindspace Road in Gachibowli.",
    proximity: "Gachibowli",
    address: "Plot No. 2/3/4/5, Survey No. 136/1, Mindspace Road, Gachibowli, Hyderabad 500032",
    destination: "AIG Hospitals, Mindspace Road, Gachibowli, Hyderabad"
  },
  {
    name: "Raidurg Metro Station",
    category: "Transport",
    description: "Hyderabad Metro Blue Line station serving the HITEC City and Mindspace area.",
    proximity: "HITEC City / Mindspace",
    address: "Mindspace, Hitech City Road, Phase 2, HITEC City, Hyderabad 500081",
    destination: "Raidurg Metro Station, Hyderabad"
  },
  {
    name: "Sarath City Capital Mall & AMB Cinemas",
    category: "Shopping",
    description: "Shopping, dining and entertainment destination; AMB Cinemas is inside the mall.",
    proximity: "Kothaguda Junction",
    address: "Survey #40, Kothaguda Junction, Gachibowli-Miyapur Road, Whitefields, Kondapur, Hyderabad 500084",
    destination: "Sarath City Capital Mall, Kondapur, Hyderabad"
  }
];

function initNearbyPlaces() {
  const filters = document.querySelector("[data-nearby-filters]");
  const grid = document.querySelector("[data-nearby-places]");
  if (!filters || !grid) return;

  const categories = ["All", ...new Set(nearbyPlaces.map((place) => place.category))];

  const render = (category = "All") => {
    const places = category === "All" ? nearbyPlaces : nearbyPlaces.filter((place) => place.category === category);
    grid.innerHTML = places
      .map(
        (place) => `
          <article class="nearby-card reveal is-visible">
            <div class="nearby-card__top">
              <span class="nearby-card__category">${place.category}</span>
              <span class="nearby-card__proximity">${place.proximity}</span>
            </div>
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <address>${place.address}</address>
            <a class="nearby-card__link" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.destination)}" target="_blank" rel="noreferrer">Get directions to ${place.name}</a>
          </article>
        `
      )
      .join("");
  };

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(index === 0));
    if (index === 0) button.classList.add("is-active");
    button.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      render(category);
    });
    filters.appendChild(button);
  });

  render();
}

document.addEventListener("DOMContentLoaded", initNearbyPlaces);
