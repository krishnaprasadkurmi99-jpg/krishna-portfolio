const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const navSections = document.querySelectorAll("main section[id]:not(#journey)");
const navSectionLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-button");
const skillCards = document.querySelectorAll(".skill-card");
const projectShowcase = document.querySelector("#project-showcase");
const projectFilters = document.querySelectorAll(".project-filter");
const projectModal = document.querySelector("#project-modal");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const achievementGrid = document.querySelector("#achievement-grid");
const backToTop = document.querySelector("#back-to-top");
const modalFocusableSelector = "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])";
let lastFocusedElement = null;

document.body.classList.add("js-ready");

// Add verified achievements here when they become available.
const achievements = [];

const renderAchievements = () => {
  if (!achievementGrid) return;
  if (achievements.length === 0) {
    achievementGrid.innerHTML = `<div class="achievement-empty"><span class="achievement-empty-icon" aria-hidden="true">✦</span><h3>Every journey starts somewhere.</h3><p>New milestones will appear here as I progress.</p></div>`;
    return;
  }
  achievementGrid.innerHTML = achievements.map((achievement) => `
    <article class="achievement-card reveal visible">
      <span class="achievement-card-icon" aria-hidden="true">${achievement.icon || "✦"}</span>
      <p class="journey-kicker">${achievement.type}</p>
      <h3>${achievement.title}</h3>
      <p>${achievement.description}</p>
    </article>
  `).join("");
};

// Edit this collection when project details, links, or status changes.
const projects = [
  {
    id: "namma-raksha",
    title: "Namma Raksha — Smart Ambulance Dispatch System",
    categoryLabel: "AI & HEALTHCARE TECHNOLOGY",
    categories: ["healthcare", "backend", "web"],
    description: "A real-time emergency response platform that classifies medical emergencies, recommends suitable ambulances and hospitals, and visualizes dispatch routes on an interactive map.",
    problem: "During emergencies, dispatchers must quickly evaluate severity, identify an appropriate ambulance, select a suitable hospital, and coordinate the response. Manual decision-making can cause delays when distance, traffic, medical equipment, hospital specialization, and bed availability all need to be considered.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Leaflet", "React Leaflet", "OSRM", "MongoDB", "Mongoose", "Recharts", "Web Speech API"],
    features: ["Emergency intake through a dispatch form with SOS workflow.", "Rule-based AI-assisted triage from P1 Critical to P4 Minor.", "Medical specialization detection for trauma, cardiac, burns, pediatric, and neurological cases.", "Multi-factor ambulance selection using distance, traffic, equipment compatibility, hospital match, and fuel level.", "Hospital recommendations based on specialization, ICU and emergency bed availability, rating, and distance.", "Interactive ambulance, emergency, and hospital map markers with real-time ambulance monitoring.", "Dashboard polling for updated ambulance locations and analytics for emergency and fleet information.", "OSRM road-following routes with ambulance-to-emergency and emergency-to-hospital route legs."],
    contribution: ["Built the emergency dispatch dashboard with Next.js, React, TypeScript, Tailwind CSS, Leaflet, and Recharts.", "Implemented a rule-based triage engine that maps emergency descriptions to P1-P4 severity levels and medical specializations.", "Designed the weighted dispatch scoring model: distance 30%, traffic 25%, equipment compatibility 20%, hospital match 15%, and fuel level 10%.", "Implemented filtering of available ambulances, hospital suitability checks, candidate ranking, and estimated arrival information.", "Connected MongoDB and Mongoose data flows for ambulance locations and status updates through Next.js API routes.", "Integrated OSRM routing to visualize road-following response routes and route instructions.", "Created API workflows for ambulance tracking, dispatch analysis, dispatch confirmation, SOS requests, and hospital registration."],
    context: "The prototype uses rule-based intelligent triage as a dispatch decision-support system, not a trained machine-learning model or clinically validated medical diagnosis tool. Some ambulance, hospital, and emergency records are simulated demo data.",
    status: "Configurable",
    github: "",
    demo: "",
    visual: "emergency",
    featured: true
  },
  {
    id: "online-retail-shop",
    title: "Sunaina Kirana — Grocery Store Management System",
    categoryLabel: "FULL-STACK RETAIL MANAGEMENT",
    categories: ["web", "backend"],
    description: "A full-stack retail management application built to help a local kirana store manage billing, inventory, customer credit, gas-cylinder transactions, and daily business operations from a single dashboard.",
    problem: "A local grocery store needs one reliable place to manage stock, billing, customer udhaar, multi-currency balances, and gas-cylinder transactions instead of relying on disconnected manual records.",
    technologies: ["React", "React Router", "Axios", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "ExcelJS"],
    features: ["JWT-based authentication with protected frontend routes and backend APIs.", "Dashboard for stock, pending customers, INR/NPR balances, and bills created today.", "Product inventory with search, categories, units, stock status, thresholds, origin, and INR/NPR pricing.", "Customer-wise billing with paid/pending status, filters, separate currency totals, and unique bill IDs.", "Customer credit (udhaar) tracking and price history when product prices change.", "Gas-cylinder purchases and sales with stock validation.", "Excel inventory import/export and JSON backup/restore utilities."],
    contribution: ["Designed REST APIs for products, bills, customers, dashboard statistics, price history, backups, and gas-cylinder inventory.", "Added JWT and bcrypt authentication middleware to protect private API routes.", "Implemented separate INR and NPR calculations for products, bills, and customer balances.", "Added server-side billing and gas-cylinder inventory validation.", "Used MongoDB aggregation for cylinder purchases, sales, and remaining stock.", "Built Excel inventory import and JSON backup/restore utilities.", "Connected frontend application routes and billing, product, and gas-cylinder APIs with authenticated requests."],
    status: "Configurable",
    github: "",
    demo: "",
    screenshots: [],
    demoVideo: "",
    visual: "retail"
  },
  {
    id: "batch-printing",
    title: "Smart Print Cloud – Online Print Ordering and Shop Management System",
    categoryLabel: "PRINT MANAGEMENT & WEB DEVELOPMENT",
    categories: ["web", "backend"],
    description: "A web-based print management platform that allows customers to upload PDF documents, receive automatic page-wise color/B&W analysis and pricing, place print orders, and track order progress using QR codes. Shop owners can manage print queues, merge documents, monitor inventory, and view business analytics.",
    problem: "Customers often need to visit a print shop to check pricing and submit documents, while shop owners manually calculate pages, prices, and print queues. Managing multiple orders and separating black-and-white pages from color pages can be time-consuming, so the platform brings analysis, ordering, processing, and tracking into one workflow.",
    technologies: ["Python", "FastAPI", "MySQL", "PyMuPDF", "Pydantic", "WebSockets", "QRCode", "JavaScript", "Tailwind CSS", "Chart.js"],
    features: ["PDF document upload.", "Automatic page count calculation.", "Black-and-white and color page detection with automatic price calculation.", "B&W-only printing option and unique order IDs.", "QR-code-based order pickup and tracking with an order progress timeline.", "Owner print queue dashboard.", "Batch document merging with separate merged PDFs for black-and-white and color printing.", "Branch and printer management, inventory tracking, and revenue and order analytics.", "Customer notifications and WebSocket infrastructure for real-time updates."],
    contribution: ["Designed the relational database schema for shops, customers, branches, printers, inventory, orders, history, notifications, and QR codes.", "Built FastAPI endpoints for authentication, uploads, orders, tracking, analytics, inventory, and notifications.", "Implemented PDF page classification using PyMuPDF rendering and RGB color analysis in main.py, with standalone analysis logic in pdf_scanner.py.", "Created QR-code order identification, pickup workflows, and batch PDF merging for B&W and color print files.", "Connected customer, tracking, and shop-owner interfaces to backend APIs with JavaScript fetch requests across index.html, admin.html, dashboard.html, and track.html."],
    status: "Configurable",
    github: "",
    demo: "",
    visual: "printing"
  }
];

const createProjectVisual = (visual) => {
  if (visual === "emergency") {
    return `<div class="project-preview project-preview--emergency" aria-hidden="true"><div class="map-grid"></div><span class="map-route"></span><span class="map-marker marker-ambulance">✚</span><span class="map-marker marker-hospital">+</span><span class="map-marker marker-hospital marker-hospital-two">+</span><div class="emergency-panel"><small>LIVE RESPONSE</small><strong>3 ACTIVE CASES</strong><i></i><i></i><i></i></div></div>`;
  }
  if (visual === "retail") {
    return `<div class="project-preview project-preview--retail" aria-hidden="true"><div class="store-header"><span>shop.</span><b>⌕</b><b>◌</b></div><div class="store-products"><i></i><i></i><i></i></div><div class="store-product-lines"><b></b><b></b><b></b></div></div>`;
  }
  return `<div class="project-preview project-preview--printing" aria-hidden="true"><div class="print-sidebar"><i></i><i></i><i></i></div><div class="print-content"><small>PRINT QUEUE</small><strong>DOCUMENT WORKFLOW</strong><div class="print-jobs"><i></i><i></i><i></i></div></div></div>`;
};

const createProjectLinks = (project, compact = false) => {
  const links = [];
  if (project.github) links.push(`<a class="project-link project-link--secondary" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);
  if (project.demo) links.push(`<a class="project-link project-link--secondary" href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`);
  return compact && links.length === 0 ? "" : links.join("");
};

const renderProjects = (filter = "all") => {
  if (!projectShowcase) return;
  const visibleProjects = projects.filter((project) => filter === "all" || project.categories.includes(filter));
  projectShowcase.innerHTML = visibleProjects.map((project, index) => `
    <article class="showcase-card ${project.featured ? "showcase-card--featured" : ""} reveal visible" data-project-id="${project.id}">
      ${createProjectVisual(project.visual)}
      <div class="showcase-info">
        <div class="showcase-topline"><p class="project-type">${project.categoryLabel}</p><span class="status-badge status-configurable">${project.status}</span></div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${project.technologies.slice(0, 4).map((technology) => `<span>${technology}</span>`).join("")}</div>
        <div class="showcase-actions"><button class="button button-primary project-details-button" type="button" data-project-details="${project.id}">View Details <span>↗</span></button>${createProjectLinks(project, true)}</div>
      </div>
    </article>
  `).join("");
  projectShowcase.classList.toggle("project-showcase--single", visibleProjects.length === 1);
  projectShowcase.querySelectorAll("[data-project-details]").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.projectDetails, button));
  });
};

const openProjectModal = (projectId, trigger) => {
  const project = projects.find((item) => item.id === projectId);
  if (!projectModal || !project) return;
  lastFocusedElement = trigger;
  projectModal.querySelector("#modal-project-category").textContent = project.categoryLabel;
  projectModal.querySelector("#modal-project-title").textContent = project.title;
  projectModal.querySelector("#modal-project-description").textContent = project.description;
  projectModal.querySelector("#modal-project-tech").innerHTML = project.technologies.map((technology) => `<span>${technology}</span>`).join("");
  projectModal.querySelector("#modal-project-features").innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join("");
  const problemElement = projectModal.querySelector("#modal-project-problem");
  const contributionElement = projectModal.querySelector("#modal-project-contribution");
  const contextElement = projectModal.querySelector("#modal-project-context-text");
  const contextLabel = projectModal.querySelector("#modal-project-context-label");
  problemElement.textContent = project.problem || "";
  contributionElement.innerHTML = (project.contribution || []).map((item) => `<li>${item}</li>`).join("");
  contextElement.textContent = project.context || "";
  contextLabel.hidden = !project.context;
  contextElement.hidden = !project.context;
  problemElement.closest(".modal-project-context").hidden = !project.problem && !(project.contribution || []).length && !project.context;
  const modalStatus = projectModal.querySelector("#modal-project-status");
  modalStatus.textContent = project.status;
  modalStatus.className = "status-badge status-configurable";
  projectModal.querySelector("#modal-project-links").innerHTML = createProjectLinks(project);
  projectModal.hidden = false;
  document.body.classList.add("modal-open");
  projectModal.querySelector(".modal-close").focus();
};

const closeProjectModal = () => {
  if (!projectModal || projectModal.hidden) return;
  projectModal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
};

renderProjects();
renderAchievements();

projectFilters.forEach((button) => {
  button.addEventListener("click", () => {
    projectFilters.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderProjects(button.dataset.projectFilter);
  });
});

modalCloseButtons.forEach((button) => button.addEventListener("click", closeProjectModal));
document.addEventListener("keydown", (event) => {
  if (!projectModal || projectModal.hidden) return;
  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }
  if (event.key !== "Tab") return;
  const focusableElements = projectModal.querySelectorAll(modalFocusableSelector);
  if (!focusableElements.length) return;
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const observedNavSections = [...navSections];
const navObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
  if (!visibleSection) return;
  navSectionLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${visibleSection.target.id}`);
  });
}, { rootMargin: "-96px 0px -55% 0px", threshold: [0.1, 0.35, 0.6] });

observedNavSections.forEach((section) => navObserver.observe(section));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
});

const updateNavigation = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
  backToTop?.classList.toggle("is-visible", window.scrollY > 520);
};

window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    skillCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });

  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const emailAppButton = document.querySelector("#open-email-app");
  const copyrightYear = document.querySelector("#copyright-year");

  if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());

  const contactFields = [
    { input: "contact-name", error: "contact-name-error", message: "Please enter your name." },
    { input: "contact-email", error: "contact-email-error", message: "Please enter a valid email address." },
    { input: "contact-subject", error: "contact-subject-error", message: "Please enter a subject." },
    { input: "contact-message", error: "contact-message-error", message: "Please enter a message." }
  ];

  const validateContactField = (field) => {
    const input = document.querySelector(`#${field.input}`);
    const error = document.querySelector(`#${field.error}`);
    const wrapper = input?.closest(".form-field");
    if (!input || !error || !wrapper) return false;
    let message = "";
    if (!input.value.trim()) message = field.message;
    else if (input.type === "email" && !input.validity.valid) message = field.message;
    error.textContent = message;
    wrapper.classList.toggle("has-error", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  };

  contactFields.forEach((field) => {
    document.querySelector(`#${field.input}`)?.addEventListener("input", () => {
      validateContactField(field);
      if (formStatus) {
        formStatus.textContent = "";
        formStatus.classList.remove("is-error");
      }
    });
  });

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = contactFields.map(validateContactField).every(Boolean);
    if (!isValid) {
      if (formStatus) {
        formStatus.textContent = "Please review the highlighted fields.";
        formStatus.classList.add("is-error");
      }
      return;
    }
    if (formStatus) {
      formStatus.textContent = "Form validated successfully! Message delivery is not connected yet. Please contact me directly by email.";
      formStatus.classList.remove("is-error");
    }
    if (emailAppButton) emailAppButton.hidden = false;
  });

  emailAppButton?.addEventListener("click", () => {
    const name = document.querySelector("#contact-name")?.value.trim() ?? "";
    const email = document.querySelector("#contact-email")?.value.trim() ?? "";
    const subject = document.querySelector("#contact-subject")?.value.trim() ?? "";
    const message = document.querySelector("#contact-message")?.value.trim() ?? "";
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:krishnaprasadkurmi99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});