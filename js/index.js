// dark mode
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const isDarkMode = localStorage.getItem("darkMode") === "enabled";
if (isDarkMode) {
  body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});
// typedJs
new Typed("#typed", {
  strings: ["Dedicated Programmer ", "MERN Stack Web Developer."],
  typeSpeed: 50,
  delaySpeed: 100,
  loop: true,
});

// Project card hover effects
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
  });
});

// Scroll animations
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }
});

// Add animation delay to project cards for staggered appearance
window.addEventListener("DOMContentLoaded", () => {
  projectCards.forEach((card, index) => {
    card.style.animation = `fadeIn 0.6s ease forwards ${index * 0.2}s`;
    card.style.opacity = "0";
  });
});
