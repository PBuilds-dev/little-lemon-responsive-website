// reservation \ book now button in homepage

document.getElementById("reserve-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const reservationPageUrl = "reservation.html";
    window.location.href = reservationPageUrl;
});












// reservation form modal pop up 
const policyCheckbox = document.getElementById("policy-confirmation");
const continueButton = document.getElementById("continue-to-booking");
const policyModal = document.getElementById("policy-modal");
const agreeButton = document.getElementById("agree-policy-btn");
const reviewButton = document.getElementById("review-policies-btn");
const reservationFormSection = document.getElementById("reservation-form-section");

continueButton.addEventListener("click", function () {
    if (!policyCheckbox.ariaChecked) {
        alert("Please read and agree to the reservation policies before continuing.");
        return;
    }

    policyModal.classList.remove("is-hidden");
});

agreeButton.addEventListener("click", function () {
    policyModal.classList.add("is-hidden");
    reservationFormSection.classList.remove("is-hidden");
    reservationFormSection.scrollIntoView({ behavior: "smooth" });
});

reviewButton.addEventListener("click", function () {
    policyModal.classList.add("is-hidden");
});
