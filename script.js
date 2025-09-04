document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const themeButton = document.getElementById("theme-button");
  const circle = themeButton?.querySelector(".circle");
  const header = document.querySelector(".header");
  const scrollTop = document.getElementById("scrollup");
  const sections = document.querySelectorAll("section[id]");
  const form = document.getElementById("form");

  // Toggle nav menu
  navToggle?.addEventListener("click", () =>
    navMenu.classList.add("show-menu")
  );
  navClose?.addEventListener("click", () =>
    navMenu.classList.remove("show-menu")
  );

  // Hide nav menu on link click
  document
    .querySelectorAll(".nav__link")
    .forEach((link) =>
      link.addEventListener("click", () =>
        navMenu.classList.remove("show-menu")
      )
    );

  // Intersection observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  // Scroll behavior
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const isMobile = window.innerWidth <= 768;

    // Change header bg on scroll
    if (scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");

    // Show or hide scroll up button
    if (scrollTop) {
      if (scrollY >= 560) scrollTop.classList.add("show-scroll");
      else scrollTop.classList.remove("show-scroll");
    }

    // Hide header on scroll down mobile
    if (isMobile) {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) header.classList.add("hidden");
      else if (st <= 0) header.classList.remove("hidden");
      lastScrollTop = st <= 0 ? 0 : st;
    } else {
      header.classList.remove("hidden");
    }

    // Highlight active link
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 60;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      const navLinks = document.querySelectorAll(".nav__link");
      navLinks.forEach((link) => link.classList.remove("active-link"));

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        const activeLink = document.querySelector(
          `.nav__list a[href="#${sectionId}"]`
        );
        if (activeLink) activeLink.classList.add("active-link");
      }
    });
  });

  // Theme initialization
  function initTheme() {
    const selectedTheme = localStorage.getItem("selected-theme");
    const localTheme = selectedTheme
      ? selectedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    if (localTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeButton.classList.add("active");
      circle.classList.add("dark");
    } else {
      document.body.classList.remove("dark-theme");
      themeButton.classList.remove("active");
      circle.classList.remove("dark");
    }
  }
  initTheme();

  // Theme toggle button
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      themeButton.classList.toggle("active");
      circle.classList.toggle("dark");

      const currentTheme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
      localStorage.setItem("selected-theme", currentTheme);
    });
  }

  // Contact form submission
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
        });
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Oops! Something went wrong.");
        }
      } catch (error) {
        alert("Oops! Something went wrong.");
        console.error(error);
      }
    });
  }
});
