const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
}

function updateThemeToggle() {
    if (!themeToggle) {
        return;
    }

    const isDark = root.dataset.theme === "dark";
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeToggle();
});

updateThemeToggle();

// Reservation button on the homepage.

document.getElementById("reserve-btn")?.addEventListener("click", function(event) {
    event.preventDefault();
    const reservationPageUrl = "reservation.html";
    window.location.href = reservationPageUrl;
});


// testimonials logic 

const testimonialCards = [
    ...document.querySelectorAll(".testimonial-trigger")
];

const testimonialTrack = document.querySelector(".testimonials-track");
const testimonialModal = document.querySelector("#testimonial-modal");
const modalImage = document.querySelector("#modal-image");
const modalRating = document.querySelector("#modal-rating");
const modalName = document.querySelector("#modal-name");
const modalJob = document.querySelector("#modal-job");
const modalReview = document.querySelector("#modal-review-text");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector("#modal-next");

let currentIndex = 0;
let sliderInterval;

function showTestimonial(index) {
    if (!testimonialCards.length || !testimonialTrack) {
        return;
    }

    currentIndex = (index + testimonialCards.length) 
    % testimonialCards.length;

    testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function openTestimonial(card) {
    if (!modalImage || !modalName || !modalJob || !modalReview || !testimonialModal) {
        return;
    }

    modalImage.src = card.dataset.image;
    modalImage.alt = card.dataset.alt;
    modalRating.textContent = `${card.dataset.rating}/5 stars`;
    modalName.textContent = card.dataset.name;
    modalJob.textContent = card.dataset.job;
    modalReview.replaceChildren();

    const highlights = (card.dataset.highlight || "")
        .split("|")
        .filter(Boolean)
        .sort((first, second) => second.length - first.length);
    const highlightPattern = highlights.length
        ? new RegExp(`(${highlights.map((value) => value.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")).join("|")})`, "gi")
        : null;

    card.dataset.review.split(highlightPattern || /(\\b$\\b)/).forEach((part) => {
        if (highlightPattern?.test(part)) {
            const highlight = document.createElement("mark");
            highlight.className = "review-highlight";
            highlight.textContent = part;
            modalReview.append(highlight);
            highlightPattern.lastIndex = 0;
        } else {
            modalReview.append(document.createTextNode(part));
        }
    });

    testimonialModal.setAttribute("aria-hidden", "false");
    testimonialModal.classList.add("is-visible");

}

function closeTestimonial() {
    if (!testimonialModal) {
        return;
    }

    testimonialModal.setAttribute("aria-hidden", "true");
    testimonialModal.classList.remove("is-visible");
}

function startSlider() {
    sliderInterval = setInterval(() => {
        showTestimonial(currentIndex + 1);
    }, 5000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

testimonialCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        currentIndex = index;
        showTestimonial(currentIndex);
        openTestimonial(card);
    });
});

modalNext?.addEventListener("click", () => {
    currentIndex =
        (currentIndex + 1) % testimonialCards.length;

        showTestimonial(currentIndex);
        openTestimonial(testimonialCards[currentIndex]);
});

modalClose?.addEventListener("click", closeTestimonial);

testimonialModal?.addEventListener("click", (event) => {
    if (event.target === testimonialModal) {
        testimonialModal && closeTestimonial();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && testimonialModal?.classList.contains("is-visible")) {
        closeTestimonial();
    }
});

if (testimonialCards.length) {
    startSlider();
}

// reservation form modal pop up 
const policyCheckbox = document.getElementById("policy-confirmation");
const continueButton = document.getElementById("continue-to-booking");
const policyModal = document.getElementById("policy-modal");
const agreeButton = document.getElementById("agree-policy-btn");
const reviewButton = document.getElementById("review-policies");
const reservationFormSection = document.getElementById("reservation-form-section");

continueButton?.addEventListener("click", function () {
    if (!policyCheckbox.checked) {
        alert("Please read and agree to the reservation policies before continuing.");
        return;
    }

    policyModal.classList.remove("is-hidden");
});

agreeButton?.addEventListener("click", function () {
    policyModal.classList.add("is-hidden");
    reservationFormSection.classList.remove("is-hidden");
    reservationFormSection.scrollIntoView({ behavior: "smooth" });
});

reviewButton?.addEventListener("click", function () {
    policyModal.classList.add("is-hidden");
});
