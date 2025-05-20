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
  strings: ["Dedicated Programmer.", "MERN Stack Web Developer."],
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


// about js

// Initialize the progress bars
document.addEventListener("DOMContentLoaded", function () {
  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width") + "%";
      bar.style.width = width;
    }, 500);
  });

  // Tab navigation functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

      // Apply entrance animation for items inside the tab
      animateTabContent(tabId);
    });
  });

  // Function to animate content inside tabs
  function animateTabContent(tabId) {
    const tab = document.getElementById(tabId);

    // Different animation for each tab type
    if (tabId === "languages") {
      const items = tab.querySelectorAll(".language-item");
      animateItems(items);
    } else if (tabId === "technologies") {
      const items = tab.querySelectorAll(".tech-item");
      animateItems(items);
    } else if (tabId === "experience") {
      const items = tab.querySelectorAll(".timeline-item");
      animateItems(items);
    } else if (tabId === "education") {
      const items = tab.querySelectorAll(".education-item");
      animateItems(items);
    }
  }

  // Generic function to animate items with delay
  function animateItems(items) {
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.transition = "all 0.5s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 100 * index);
    });
  }

  // Initial animation for the first tab
  animateTabContent("languages");
});

// about js