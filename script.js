const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 1500,
  delay: 100,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 200,
});
sr.reveal(".home__social-icon", { interval: 100 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 50 });

// Function to open link in a new tab
function openInNewTab(event) {
  event.preventDefault();
  window.open(event.currentTarget.href, "_blank");
}

// Add event listener after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  const button2 = document.getElementById("button2");
  if (button2) {
    button2.addEventListener("click", openInNewTab);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode");
  const darkModeIcon = document.getElementById("dark-mode-icon");

  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);

    // Update the icon dynamically
    if (darkModeToggle.checked) {
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
    } else {
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
    }
  });
});
