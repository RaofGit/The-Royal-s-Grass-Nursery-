document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. Cost Estimator Calculations
  const grassTypeSelect = document.getElementById("grassTypeSelect");
  const lawnLength = document.getElementById("lawnLength");
  const lawnWidth = document.getElementById("lawnWidth");

  if (grassTypeSelect && lawnLength && lawnWidth) {
    grassTypeSelect.addEventListener("change", updateCalculator);
    lawnLength.addEventListener("input", updateCalculator);
    lawnWidth.addEventListener("input", updateCalculator);

    updateCalculator(); // Initial Run
  }

  // 3. Accordion FAQ
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const parent = this.parentElement;
      const isActive = parent.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });

      if (!isActive) {
        parent.classList.add("active");
      }
    });
  });

  // 4. Gallery Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

// Live Calculator Calculation Logic
function updateCalculator() {
  const rate = parseFloat(document.getElementById("grassTypeSelect").value) || 0;
  const length = parseFloat(document.getElementById("lawnLength").value) || 0;
  const width = parseFloat(document.getElementById("lawnWidth").value) || 0;

  const area = length * width;
  const rolls = Math.ceil(area / 2); // 1 Roll = 2 sq. ft.
  const totalCost = area * rate;

  document.getElementById("calcArea").textContent = area.toLocaleString() + " Sq. Ft.";
  document.getElementById("calcRolls").textContent = rolls.toLocaleString() + " Rolls (2 sq.ft/roll)";
  document.getElementById("calcCost").textContent = "Rs. " + totalCost.toLocaleString();
}

// Redirect Calculator Quote Directly to WhatsApp
function bookFromCalculator() {
  const selectElement = document.getElementById("grassTypeSelect");
  const grassName = selectElement.options[selectElement.selectedIndex].text.split("(")[0].trim();
  const length = document.getElementById("lawnLength").value;
  const width = document.getElementById("lawnWidth").value;
  const area = document.getElementById("calcArea").textContent;
  const cost = document.getElementById("calcCost").textContent;

  const message = `Hello, I checked your Grass Calculator and need a quote:\n\n- Grass Type: ${grassName}\n- Dimensions: ${length}ft x ${width}ft (${area})\n- Estimated Price: ${cost}\n\nPlease confirm availability and delivery slot.`;
  
  const whatsappUrl = `https://wa.me/923452268329?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

// Booking Modal Control
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

  const message = `New Installation Booking Request:\n\n- Name: ${name}\n- Phone: ${phone}\n- Area/Society: ${location}\n- Grass Type: ${grass}\n- Approximate Size: ${area} sq.ft.`;
  
  const whatsappUrl = `https://wa.me/923452268329?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
  closeBookingModal();
}

// Review Modal Control
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

  alert("Thank you for submitting your review!");
  closeReviewModal();
  document.getElementById("reviewForm").reset();
}

// Gallery Lightbox Modal Control
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
