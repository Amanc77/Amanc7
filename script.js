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

  // Toggle menu
  navToggle?.addEventListener("click", () =>
    navMenu.classList.add("show-menu")
  );
  navClose?.addEventListener("click", () =>
    navMenu.classList.remove("show-menu")
  );

  // Close menu on nav link click
  document
    .querySelectorAll(".nav__link")
    .forEach((link) =>
      link.addEventListener("click", () =>
        navMenu.classList.remove("show-menu")
      )
    );

  // Intersection Observer for qualifications animation
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    })
  );
  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  // Scroll-related functionality
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const isMobile = window.innerWidth <= 768;

    // Header scroll behavior
    if (scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");

    // Scroll top button
    if (scrollY >= 560) scrollTop.classList.add("show-scroll");
    else scrollTop.classList.remove("show-scroll");

    // Hide header on scroll down (mobile only)
    if (isMobile) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) header.classList.add("hidden");
      else if (scrollTop === 0) header.classList.remove("hidden");
      lastScrollTop = scrollTop;
    } else {
      header.classList.remove("hidden");
    }

    // Active link on scroll
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;
      const sectionId = section.getAttribute("id");
      document
        .querySelector(`.nav__menu a[href*=${sectionId}]`)
        ?.classList.toggle(
          "active-link",
          scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
        );
    });
  });

  // Theme toggle
  if (themeButton) {
    document.body.classList.add("dark-theme");
    themeButton.classList.add("active");
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      themeButton.classList.toggle("active");
      circle.classList.toggle("dark");
    });
  }

  // Form submission
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });
      const data = await response.json();
      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
