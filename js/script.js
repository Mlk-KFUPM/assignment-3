// IIFE (Immediately Invoked Function Expression) to avoid polluting global scope
(function () {
  "use strict";

  // --- A1: Set Current Year ---
  function setYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --- A1: Set Time-based Greeting ---
  function setGreeting() {
    const h = new Date().getHours();
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
      const msg =
        h < 12 ? "Good morning." : h < 18 ? "Good afternoon." : "Good evening.";
      greetingEl.textContent = msg;
    }
  }

  // --- A1: Theme Toggle (persisted) ---
  function initThemeToggle() {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      root.classList.add("light");
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        root.classList.toggle("light");
        const currentTheme = root.classList.contains("light")
          ? "light"
          : "dark";
        localStorage.setItem("theme", currentTheme);
      });
    }
  }

  // --- A1: Mobile Navigation Toggle ---
  function initMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const nav = document.querySelector(".nav");
    if (navToggle && nav) {
      navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });

      // Close nav when a link is clicked
      nav.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
          if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
          }
        });
      });
    }
  }

  // --- A1: Smooth Scrolling ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1) {
          // Only process if it's not just "#"
          const el = document.querySelector(id);
          if (el) {
            history.pushState(null, "", id);
          }
        }
      });
    });
  }

  // --- A2: Enhanced Contact Form Validation ---
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
    if (!form) return;

    const showError = (input, message) => {
      const label = input.closest("label");
      const errorEl = label.querySelector(".error-message");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
      }
      input.setAttribute("aria-invalid", "true");
    };

    const clearErrors = () => {
      form.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
      });
      form.querySelectorAll("[aria-invalid]").forEach((input) => {
        input.setAttribute("aria-invalid", "false");
      });
    };

    form.addEventListener("input", (e) => {
      if (e.target.hasAttribute("aria-invalid")) {
        const label = e.target.closest("label");
        const errorEl = label.querySelector(".error-message");
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.style.display = "none";
        }
        e.target.setAttribute("aria-invalid", "false");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;
      const name = form.elements.name;
      const email = form.elements.email;
      const message = form.elements.message;

      if (name.value.length < 2) {
        showError(name, "Name must be at least 2 characters.");
        isValid = false;
      }

      if (!email.validity.valid) {
        if (email.value.length === 0) {
          showError(email, "Email is required.");
        } else {
          showError(email, "Please enter a valid email address.");
        }
        isValid = false;
      }

      if (message.value.length < 10) {
        showError(message, "Message must be at least 10 characters.");
        isValid = false;
      }

      if (isValid) {
        if (formNote) {
          formNote.hidden = false;
          form.reset();
          setTimeout(() => (formNote.hidden = true), 3000);
        }
      } else {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  // --- A2: Load Projects from Local Data Array ---

  const projectsData = [
    {
      title: "Hakeem (startup app)",
      imageUrl: "assets/images/hakeem.png",
      description:
        "Recipe and meal-planning app targeting KSA. Flutter front end, Spring Boot API, and planned AI meal suggestions.",
      tags: ["Flutter", "Spring Boot", "Startup"],
      isPrivate: true,
      link: null,
    },
    {
      title: "Algorithmic Trading Bot",
      imageUrl: "assets/images/trading-bot.png",
      description:
        "Java/Spring service with risk controls and basic strategies. Modular design for data ingestion and order routing.",
      tags: ["Java", "Spring", "Finance"],
      isPrivate: true,
      link: null,
    },
    {
      title: "Reservation system",
      imageUrl: "assets/images/reservation-system.png",
      description:
        "A course project focused on requirements engineering and system design. Built with Spring Boot, MySQL, and React.",
      tags: ["Spring Boot", "React", "SWE-206"],
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/ReservationSystem",
    },
    {
      title: "Tournament Management",
      imageUrl: "assets/images/tournament-management.png",
      description:
        "A database-focused project for managing tournaments. Implemented with PostgreSQL, a Spring Boot backend, and a Flutter front end.",
      tags: ["Flutter", "Spring Boot", "ICS-321"],
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/tournament",
    },
  ];

  // *** UPDATED: Function now accepts a filter ***
  function loadProjectsFromData(filter = "All") {
    const container = document.getElementById("project-cards");
    if (!container) return;

    // 1. Filter the data
    const filteredProjects = projectsData.filter((project) => {
      if (filter === "All") return true;
      return project.tags.includes(filter);
    });

    // 2. Generate the HTML
    const html = filteredProjects
      .map((project) => {
        const linkHtml = project.isPrivate
          ? `<p class="lock">🔒 Private access</p>`
          : `<a 
            href="${project.link}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="link"
            aria-label="View ${project.title} on GitHub"
          >
            Click here to go to the repository
          </a>`;

        return `
        <article class="card project-card">
          <img src="${project.imageUrl}" alt="${project.title} preview" />
          <h3>${project.title}</h3>
          <p class="description">${project.description}</p>
          ${linkHtml}
        </article>
      `;
      })
      .join("");

    // 3. Set the HTML
    // A2: Handle "empty state" if no projects match
    if (filteredProjects.length === 0) {
      container.innerHTML = `<p class="muted" style="grid-column: 1 / -1; text-align: center;">No projects found for the filter "${filter}".</p>`;
    } else {
      container.innerHTML = html;
    }
  }

  // *** NEW: Function to initialize the filter buttons ***
  function initProjectFilters() {
    const filtersContainer = document.getElementById("project-filters");
    if (!filtersContainer) return;

    filtersContainer.addEventListener("click", (e) => {
      // Only act if a button chip was clicked
      if (
        e.target.tagName !== "BUTTON" ||
        !e.target.classList.contains("chip")
      ) {
        return;
      }

      // Remove 'active' from the currently active button
      const currentActive = filtersContainer.querySelector(".active");
      if (currentActive) {
        currentActive.classList.remove("active");
      }

      // Add 'active' to the clicked button
      e.target.classList.add("active");

      // Get the filter value from the data-filter attribute
      const filterValue = e.target.dataset.filter;

      // Reload the projects with the new filter
      loadProjectsFromData(filterValue);
    });
  }

  // --- Run all initializers on DOMContentLoaded ---
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    setGreeting();
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
    loadProjectsFromData(); // <-- Load all projects initially
    initProjectFilters(); // <-- Add event listeners to filter buttons
  });
})(); // End of IIFE
