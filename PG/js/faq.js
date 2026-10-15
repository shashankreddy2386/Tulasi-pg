const faqs = [
  ["What sharing options are available?", "Verified room details currently include a private non-AC room and 2-, 3- and 4-share non-AC options. Ask on WhatsApp about other sharing options and current availability."],
  ["What is the security deposit?", "The listed security deposits are ₹9,000 for the private non-AC room, ₹5,000 for 2-share non-AC, ₹4,500 for 3-share non-AC and ₹4,000 for 4-share non-AC."],
  ["How much of the security deposit is refunded?", "The listed refundable amounts are ₹8,000 for the private room, ₹4,000 for 2-share, ₹3,500 for 3-share and ₹3,000 for 4-share non-AC rooms."],
  ["What is the notice period?", "The listed notice period is 20 days for the verified room options."],
  ["What is included in the room?", "Rooms include an attached western toilet, hot water, TV, wardrobe, washing machine access, cot, mattress, bed sheets, pillows, pillow covers, safety locker, electricity and food."],
  ["Is Wi-Fi available?", "Yes, 24x7 Wi-Fi is listed as a core facility."],
  ["Is water available 24x7?", "Yes, 24x7 water is listed as a core facility."],
  ["Can I cook my own food?", "Yes, an open self-cooking kitchen is included in the plan."],
  ["Is laundry available?", "Yes, laundry is listed as an available facility."],
  ["Is a refrigerator available?", "Yes, a refrigerator is available for residents."],
  ["Is there a gym?", "Yes, residents have access to a gym facility."],
  ["Is hot water available?", "In-room geyser is listed as a facility."],
  ["Does every room have a TV?", "Yes, every room is planned to have its own TV."],
  ["Are AC and non-AC rooms available?", "Yes, both AC and non-AC room options are available, subject to current availability."],
  ["Are mattresses and pillows provided?", "Yes, mattresses and pillows are provided for residents."],
  ["Is separate luggage storage available?", "Yes, every resident will have a separate wardrobe for luggage and personal belongings."],
  ["Does the PG feel homely?", "Tulasi Men's PG is designed to provide a homely, comfortable and clean living environment."],
  ["Is parking available?", "Yes, a vast parking area is available for residents' bikes."],
  ["Is CCTV available?", "Yes, CCTV surveillance is listed. No exaggerated safety claims are made."],
  ["Is food available?", "Veg and non-veg food are listed, but exact menu and schedule should be verified before publishing."],
  ["How can I check availability?", "Use the call or WhatsApp buttons to ask for current availability and pricing."]
];

function initFaq() {
  const list = document.querySelector("[data-faq]");
  if (!list) return;

  faqs.forEach(([question, answer], index) => {
    const item = document.createElement("article");
    item.className = "faq-item";
    item.innerHTML = `
      <button type="button" aria-expanded="false">
        <span>${question}</span>
        <span aria-hidden="true">+</span>
      </button>
      <p>${answer}</p>
    `;
    const button = item.querySelector("button");
    button.addEventListener("click", () => {
      list.querySelectorAll(".faq-item").forEach((faq) => {
        if (faq !== item) {
          faq.classList.remove("is-open");
          faq.querySelector("button").setAttribute("aria-expanded", "false");
          faq.querySelector("button span:last-child").textContent = "+";
        }
      });
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.querySelector("span:last-child").textContent = isOpen ? "-" : "+";
    });
    if (index === 0) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      button.querySelector("span:last-child").textContent = "-";
    }
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", initFaq);
