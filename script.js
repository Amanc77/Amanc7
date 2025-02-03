const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// Menu show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Close menu when clicking on a nav link
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Animation in the qualifications section
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const elements = document.querySelectorAll(".hidden");
elements.forEach((element) => observer.observe(element));

// Scroll active link
const sections = document.querySelectorAll("section[id]");
const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    document
      .querySelector(".nav__menu a[href*=" + sectionId + "]")
      ?.classList.toggle(
        "active-link",
        scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
      );
  });
};
window.addEventListener("scroll", scrollActive);

// Change header on scroll
function scrollHeader() {
  const header = document.getElementById("header");
  if (window.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Show scroll top button
function scrollUp() {
  const scrollTop = document.getElementById("scrollup");
  if (window.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

// Change theme
const themeButton = document.getElementById("theme-button");
const circle = document.querySelector("#theme-button .circle");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeButton.classList.toggle("active");
    circle.classList.toggle("dark");
  });

  document.body.classList.add("dark-theme");
  themeButton.classList.toggle("active");
}

// Contact form submission
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch((error) => console.error("Error:", error));
  });
}

let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  let isMobile = window.innerWidth <= 768; // Adjust this value as needed

  if (isMobile) {
    if (scrollTop > lastScrollTop) {
      header.classList.add("hidden"); // Hide header on scroll down
    } else if (scrollTop === 0) {
      header.classList.remove("hidden"); // Show header only when at the top
    }
  } else {
    header.classList.remove("hidden"); // Always visible on larger screens
  }

  lastScrollTop = scrollTop;
});
