const roomOptions = [
  {
    sharing: 1,
    title: "Private Room Non-AC",
    copy: "A private, homely room with practical facilities for comfortable independent living.",
    image: "assets/images/Single-Bed%20PG%20Room.png",
    imageAlt: "Single-bed PG room with wardrobe and study table",
    deposit: "₹9,000",
    refund: "₹8,000",
    points: ["20-day notice period", "₹1,000 non-refundable caution deposit", "Attached western toilet", "Hot water", "TV in the room", "Individual wardrobe and safety locker", "Washing machine, cot, mattress, bed sheets, pillows and pillow covers", "Electricity and food"]
  },
  {
    sharing: 2,
    title: "2-Share Non-AC",
    copy: "A balanced shared room with the essentials provided for an easy move-in.",
    image: "assets/images/Two-Bed%20Hostel%20Room.png",
    imageAlt: "Two-bed shared PG room",
    deposit: "₹5,000",
    refund: "₹4,000",
    points: ["20-day notice period", "₹1,000 non-refundable caution deposit", "Attached western toilet", "Hot water", "TV in the room", "Individual wardrobe and safety locker", "Washing machine, cot, mattress, bed sheets, pillows and pillow covers", "Electricity and food"]
  },
  {
    sharing: 3,
    title: "3-Share Non-AC",
    copy: "A practical shared setup for students and professionals who value comfort and convenience.",
    image: "assets/images/Minimal%20Three-Bedroom%20Dormitory.png",
    imageAlt: "Three-bed shared PG room",
    deposit: "₹4,500",
    refund: "₹3,500",
    points: ["20-day notice period", "₹1,000 non-refundable caution deposit", "Attached western toilet", "Hot water", "TV in the room", "Individual wardrobe and safety locker", "Washing machine, cot, mattress, bed sheets, pillows and pillow covers", "Electricity and food"]
  },
  {
    sharing: 4,
    title: "4-Share Non-AC",
    copy: "A value-focused room with essential furnishings and everyday facilities included.",
    image: "assets/images/Modern%20Dorm%20Room%20with%20Four%20Beds%20and%20Lockers.png",
    imageAlt: "Modern four-bed shared PG room with lockers",
    deposit: "₹4,000",
    refund: "₹3,000",
    points: ["20-day notice period", "₹1,000 non-refundable caution deposit", "Attached western toilet", "Hot water", "TV in the room", "Individual wardrobe and safety locker", "Washing machine, cot, mattress, bed sheets, pillows and pillow covers", "Electricity and food"]
  },
  {
    sharing: 5,
    title: "5 Sharing",
    copy: "Simple and functional living for residents who prioritize affordability.",
    points: ["Functional shared room", "Flexible food options", "Enquire for current price"]
  },
  {
    sharing: 6,
    title: "6 Sharing",
    copy: "The most economical sharing format, subject to current availability.",
    points: ["Economical option", "Availability and facilities to be confirmed", "Enquire for current price"]
  }
];

const whatsappNumber = "919701898891";

function initRooms() {
  const tabs = document.querySelector("[data-room-tabs]");
  const card = document.querySelector("[data-room-card]");
  if (!tabs || !card) return;

  const renderCard = (room) => {
    const roomImage = card.querySelector(".room-card__image img");
    const roomImageContainer = roomImage.closest(".room-card__image");
    roomImageContainer.hidden = !room.image;
    if (room.image) {
      roomImage.src = room.image;
      roomImage.alt = room.imageAlt || "PG room interior";
    }
    card.querySelector("h3").textContent = room.title;
    card.querySelector("p").textContent = room.copy;
    const details = card.querySelector("[data-room-details]");
    details.innerHTML = room.deposit
      ? `<span><strong>Security deposit</strong>${room.deposit}</span><span><strong>Refundable amount</strong>${room.refund}</span>`
      : "<span><strong>Pricing and deposit</strong>Ask on WhatsApp</span>";
    card.querySelector("ul").innerHTML = room.points.map((point) => `<li>${point}</li>`).join("");
    const enquiryLink = card.querySelector("a");
    const message = `Hi, I am interested in the ${room.title} option at Tulasi Men's PG. Please share the current price and availability.`;
    enquiryLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    enquiryLink.target = "_blank";
    enquiryLink.rel = "noreferrer";
  };

  roomOptions.forEach((room, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = room.sharing;
    button.setAttribute("aria-label", `${room.title} option`);
    if (index === 0) button.classList.add("is-active");
    button.addEventListener("click", () => {
      tabs.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderCard(room);
    });
    tabs.appendChild(button);
  });

  renderCard(roomOptions[0]);
}

document.addEventListener("DOMContentLoaded", initRooms);
