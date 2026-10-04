document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCalculator();
  initGalleryFilters();
  initAccordion();
});

/* Mobile Navigation Toggle */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* Grass Quantity & Cost Calculator Logic */
function initCalculator() {
  const select = document.getElementById('grassTypeSelect');
  const lengthInput = document.getElementById('lawnLength');
  const widthInput = document.getElementById('lawnWidth');

  if (select && lengthInput && widthInput) {
    select.addEventListener('change', calculateLawnCost);
    lengthInput.addEventListener('input', calculateLawnCost);
    widthInput.addEventListener('input', calculateLawnCost);
    calculateLawnCost();
  }
}

function calculateLawnCost() {
  const pricePerSqFt = parseFloat(document.getElementById('grassTypeSelect').value) || 35;
  const length = parseFloat(document.getElementById('lawnLength').value) || 0;
  const width = parseFloat(document.getElementById('lawnWidth').value) || 0;

  const totalArea = Math.ceil(length * width);
  const rollsNeeded = Math.ceil(totalArea / 2); // Each roll is approx 2 sq. ft.
  const totalCost = totalArea * pricePerSqFt;

  document.getElementById('calcArea').innerText = `${totalArea.toLocaleString()} Sq. Ft.`;
  document.getElementById('calcRolls').innerText = `${rollsNeeded.toLocaleString()} Rolls (2 sq.ft/roll)`;
  document.getElementById('calcCost').innerText = `Rs. ${totalCost.toLocaleString()}`;
}

function bookFromCalculator() {
  const typeText = document.getElementById('grassTypeSelect').options[document.getElementById('grassTypeSelect').selectedIndex].text.split('(')[0].trim();
  const areaText = document.getElementById('calcArea').innerText;
  const costText = document.getElementById('calcCost').innerText;

  const message = `Hello Lahore Green Lawns, I calculated my lawn estimate on your website:\n- Grass Type: ${typeText}\n- Area: ${areaText}\n- Estimated Cost: ${costText}\n\nI would like to schedule an on-site visit.`;
  window.open(`https://wa.me/923452268329?text=${encodeURIComponent(message)}`, '_blank');
}

/* Gallery Filtering System */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* Lightbox Modal Trigger */
function openLightbox(imgSrc, caption) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');

  modal.style.display = 'flex';
  modalImg.src = imgSrc;
  modalCaption.innerText = caption;
}

function closeLightbox() {
  document.getElementById('lightboxModal').style.display = 'none';
}

/* Accordion Component */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
}

/* Modal Open / Close Controllers */
function openBookingModal(grassType = '') {
  const modal = document.getElementById('bookingModal');
  modal.style.display = 'flex';
  if (grassType) {
    document.getElementById('modalGrassSelect').value = grassType;
  }
}

function closeBookingModal() {
  document.getElementById('bookingModal').style.display = 'none';
}

function handleBookingSubmit(event) {
  event.preventDefault();
  alert('Thank you! Your installation request has been received. Our team will reach out within 30 minutes.');
  closeBookingModal();
}

function openReviewModal() {
  document.getElementById('reviewModal').style.display = 'flex';
}

function closeReviewModal() {
  document.getElementById('reviewModal').style.display = 'none';
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('revName').value;
  const location = document.getElementById('revLocation').value || 'Lahore';
  const grass = document.getElementById('revGrass').value;
  const rating = parseInt(document.getElementById('revRating').value);
  const text = document.getElementById('revText').value;

  const reviewsGrid = document.getElementById('reviewsGrid');
  const card = document.createElement('div');
  card.className = 'review-card';

  let starsHtml = '';
  for (let i = 0; i < rating; i++) {
    starsHtml += '<i class="fa-solid fa-star"></i>';
  }

  card.innerHTML = `
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

  reviewsGrid.prepend(card);
  alert('Thank you for sharing your review! It has been posted.');
  closeReviewModal();
}
