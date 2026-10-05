// 1. Mobile Menu Toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.toggle("active");
  }
}

// Close mobile nav when clicking a link
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navMenu = document.getElementById("navMenu");
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // Run initial calculator update
  updateCalculator();
});

// 2. Cost Estimator Logic
function updateCalculator() {
  const selectElem = document.getElementById("grassTypeSelect");
  const lengthElem = document.getElementById("lawnLength");
  const widthElem = document.getElementById("lawnWidth");

  if (!selectElem || !lengthElem || !widthElem) return;

  const rate = parseFloat(selectElem.value) || 0;
  const length = parseFloat(lengthElem.value) || 0;
  const width = parseFloat(widthElem.value) || 0;

  const area = length * width;
  const rolls = Math.ceil(area / 2); // 1 Roll = 2 sq. ft.
  const totalCost = area * rate;

  document.getElementById("calcArea").textContent = area.toLocaleString() + " Sq. Ft.";
  document.getElementById("calcRolls").textContent = rolls.toLocaleString() + " Rolls (2 sq.ft/roll)";
  document.getElementById("calcCost").textContent = "Rs. " + totalCost.toLocaleString();
}

function bookFromCalculator() {
  const selectElement = document.getElementById("grassTypeSelect");
  const grassName = selectElement.options[selectElement.selectedIndex].text.split("(")[0].trim();
  const length = document.getElementById("lawnLength").value;
  const width = document.getElementById("lawnWidth").value;
  const area = document.getElementById("calcArea").textContent;
  const cost = document.getElementById("calcCost").textContent;

  const message = `Hello, I checked your Lawn Calculator:\n\n- Grass Type: ${grassName}\n- Dimensions: ${length}ft x ${width}ft (${area})\n- Estimated Price: ${cost}\n\nPlease confirm availability and booking.`;
  
  window.open(`https://wa.me/923452268329?text=${encodeURIComponent(message)}`, "_blank");
}

// 3. FAQ Accordion Toggle
function toggleAccordion(button) {
  const item = button.parentElement;
  const isActive = item.classList.contains("active");

  document.querySelectorAll(".accordion-item").forEach((el) => {
    el.classList.remove("active");
  });

  if (!isActive) {
    item.classList.add("active");
  }
}

// 4. Gallery Filtering
function filterGallery(category, button) {
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// 5. Lightbox Modal
function openLightbox(imgSrc, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");

  if (modal && img && cap) {
    img.src = imgSrc;
    cap.textContent = caption;
    modal.classList.add("active");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
}

// 6. Booking Modal
function openBookingModal(grassName = "") {
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.classList.add("active");
    if (grassName) {
      const select = document.getElementById("modalGrassSelect");
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase().includes(grassName.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
  }
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("active");
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("modalName").value;
  const phone = document.getElementById("modalPhone").value;
  const location = document.getElementById("modalLocation").value;
  const grass = document.getElementById("modalGrassSelect").value;
  const area = document.getElementById("modalAreaInput").value || "N/A";

  const message = `New Installation Booking Request:\n\n- Name: ${name}\n- Phone: ${phone}\n- Area/Society: ${location}\n- Grass Type: ${grass}\n- Size: ${area} sq.ft.`;
  
  window.open(`https://wa.me/923452268329?text=${encodeURIComponent(message)}`, "_blank");
  closeBookingModal();
}

// 7. Review Modal & Dynamic Review Adding
function openReviewModal() {
  const modal = document.getElementById("reviewModal");
  if (modal) modal.classList.add("active");
}

function closeReviewModal() {
  const modal = document.getElementById("reviewModal");
  if (modal) modal.classList.remove("active");
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("revName").value;
  const location = document.getElementById("revLocation").value || "Lahore";
  const grass = document.getElementById("revGrass").value;
  const rating = document.getElementById("revRating").value;
  const text = document.getElementById("revText").value;

  const reviewsGrid = document.getElementById("reviewsGrid");
  if (reviewsGrid) {
    let starsHtml = "";
    for (let i = 0; i < parseInt(rating); i++) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    }

    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    reviewCard.innerHTML = `
      <div class="review-header">
        <div>
          <h4 class="customer-name">${name}</h4>
          <span class="customer-location"><i class="fa-solid fa-location-dot"></i> ${location}</span>
        </div>
        <div class="star-rating">${starsHtml}</div>
      </div>
      <div class="grass-bought">Grass Purchased: <strong>${grass}</strong></div>
      <p class="review-text">"${text}"</p>
    `;

    reviewsGrid.prepend(reviewCard);
  }

  alert("Thank you! Your review has been published.");
  closeReviewModal();
  document.getElementById("reviewForm").reset();
}
