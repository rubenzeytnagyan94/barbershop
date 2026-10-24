
"use strict";

// Բջջային մենյու
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Մենյուն փակել հղման ընտրությունից հետո
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Սանրվածքների ֆիլտր
const filterButtons = document.querySelectorAll(".filter-btn");
const styleCards = document.querySelectorAll(".style-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    styleCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matches;
    });
  });
});

// Ամրագրման ամսաթիվ. թույլատրել միայն այսօրվա կամ ապագա օրերը
const bookingDate = document.getElementById("bookingDate");

function setMinimumDate() {
  const now = new Date();
  const localDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");

  bookingDate.min = localDate;
}

setMinimumDate();

// Ամրագրման ձևի ստուգում
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const service = document.getElementById("serviceSelect").value;
  const date = bookingDate.value;

  if (!name || !phone || !service || !date) {
    formMessage.textContent = "Խնդրում ենք լրացնել բոլոր դաշտերը։";
    return;
  }

  if (date < bookingDate.min) {
    formMessage.textContent =
      "Խնդրում ենք ընտրել այսօրվա կամ ապագա ամսաթիվ։";
    return;
  }

  // Այս տարբերակը ցուցադրում է հաստատման հաղորդագրություն։
  // Իրական ամրագրման համար անհրաժեշտ է backend կամ ամրագրման ծառայություն։
  formMessage.textContent =
    `Շնորհակալություն, ${name}! Ձեր հարցումն ընդունված է։ ` +
    "Այցի ժամը հաստատելու համար անհրաժեշտ է կապ հաստատել ձեզ հետ։";

  bookingForm.reset();
  setMinimumDate();
});

// Ավտոմատ թարմացվող հեղինակային իրավունք
document.getElementById("year").textContent =
  new Date().getFullYear();
