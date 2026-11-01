const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const filterButtons = document.querySelectorAll(".filter-button");
const skillCards = document.querySelectorAll(".skill-card");
const projectShowcase = document.querySelector("#project-showcase");
const homeFeaturedProjects = document.querySelector("#home-featured-projects");
const projectFilters = document.querySelectorAll(".project-filter");
const projectModal = document.querySelector("#project-modal");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const achievementGrid = document.querySelector("#achievement-grid");
const backToTop = document.querySelector("#back-to-top");
const modalFocusableSelector = "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])";
let lastFocusedElement = null;

// Add verified achievements here when they become available.
const achievements = [];

const renderAchievements = () => {
  if (!achievementGrid) return;
  if (achievements.length === 0) {
    achievementGrid.innerHTML = `<div class="achievement-empty"><span class="achievement-empty-icon" aria-hidden="true">✦</span><h3>Every journey starts somewhere.</h3><p>New milestones will appear here as I progress.</p></div>`;
    return;
  }
  achievementGrid.innerHTML = achievements.map((achievement) => `
    <article class="achievement-card">
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
    title: "SmartPrint — Print-Shop Management & Document Ordering",
    categoryLabel: "PRINT-SHOP OPERATIONS & DOCUMENT ORDERING",
    categories: ["web", "backend"],
    description: "A full-stack print-shop management app where customers upload PDFs, review document analysis and print-cost estimates, and track orders while shop owners manage orders and shop operations from a responsive dashboard.",
    problem: "Customers need a clear way to submit print-ready documents and understand pricing, while print shops need reliable tools to organize orders, customer history, printing preferences, and pickups.",
    technologies: ["React", "TypeScript", "Vite", "FastAPI", "Python", "MySQL", "Aiven", "Supabase Storage", "Vercel", "Render"],
    features: ["Upload PDF documents, review automated page analysis, choose print preferences, and see estimated pricing in INR.", "Classify color and black-and-white pages, detect blank and duplicate pages, and provide print recommendations through automated analysis.", "Manage order statuses, customer history, saved printing profiles, and reprints from the shop-owner dashboard.", "Track orders with customer tracking links, pickup PINs, and QR codes.", "Protect documents with private Supabase Storage, signed upload and download URLs, upload validation, and temporary-file cleanup.", "Use session-based authentication, login throttling, upload limits, and database migrations for backend protections."],
    contribution: ["Built SmartPrint, a full-stack print-shop management app with PDF analysis, customer order tracking, owner workflows, and private cloud storage.", "Connected the React and TypeScript frontend to a FastAPI and MySQL backend, with private document storage in Supabase.", "Implemented automated PDF analysis and customer and shop-owner order workflows."],
    context: "PDF analysis is automated and does not use generative AI. The frontend is deployed on Vercel, the FastAPI backend on Render, MySQL is hosted on Aiven, and Supabase Storage holds private files.",
    github: "",
    demo: "https://smart-print-alpha.vercel.app/",
    visual: "smartprint",
    screenshots: [{ src: "project-images/smartprint-homepage.png", alt: "SmartPrint customer ordering page with PDF upload, page analysis, and print checkout." }]
  },
  {
    id: "campusly",
    title: "Campusly — Student Management Dashboard",
    categoryLabel: "STUDENT MANAGEMENT & ANALYTICS",
    categories: ["web", "backend"],
    description: "A responsive student-management platform for organizing student records, courses, academic progress, attendance, and fee balances in one workspace.",
    problem: "Administrators need a central place to manage student records and academic operations while keeping attendance, grades, fees, and student support information easy to review.",
    technologies: ["Python", "Flask", "SQLAlchemy", "JavaScript", "HTML", "CSS", "SQLite", "PostgreSQL", "Neon"],
    features: ["Student directory with add, edit, search, filters, and CSV import for up to 500 records.", "Course catalog and student 360 profiles with attendance, grades, balances, and achievement badges.", "Attendance tracking, assessment results, and fee balances with manually recorded payments.", "Analytics dashboard with enrollment, attendance, outstanding fees, recent activity, and support insights.", "CSV reports, print/PDF reports, and private Neon object storage with expiring download links.", "Administrator setup and sign-in with hashed passwords and CSRF protection.", "Realtime student-count updates through Neon Realtime."],
    contribution: ["Built the responsive student-management dashboard for student records, courses, attendance, grades, and fee tracking.", "Added analytics, CSV import/export, student profiles, administrator access, and report storage.", "Integrated Neon services for private report storage and realtime student-count updates."],
    context: "Fee payments are recorded manually; the application does not process payments.",
    status: "Live",
    github: "",
    demo: "https://campusly-eight-mauve.vercel.app/",
    visual: "campusly"
  },
  {
    id: "elevix",
    title: "Elevix — Resume Analyzer & Career Intelligence",
    categoryLabel: "RESUME ANALYSIS & CAREER PLANNING",
    categories: ["web", "backend"],
    description: "A responsive career-planning tool that analyzes resumes with transparent, rule-based checks and offers practical guidance for job-search preparation.",
    problem: "Students and early-career candidates need clear feedback on resume structure, role alignment, and skill gaps, along with practical next steps for career preparation.",
    technologies: ["Python", "FastAPI", "JavaScript", "HTML", "CSS", "PDF/DOCX parsing", "ReportLab"],
    features: ["Analyze pasted resume text or upload PDF and DOCX files; review detected skills, strengths, and resume evidence.", "Use an ATS-style checklist, job-description matching, role recommendations, and a placement-readiness snapshot.", "Get a personalized 30/60/90-day learning roadmap and role-specific interview practice.", "Compare two resume versions and receive grounded bullet rewrites without invented achievements or metrics.", "Download PDF analysis reports and use the responsive dashboard with dark and light themes."],
    contribution: ["Built a responsive resume analysis and career-planning app using FastAPI and JavaScript.", "Implemented transparent rule-based resume checks, job-description matching, career guidance, and grounded resume bullet suggestions.", "Added resume comparison and downloadable PDF reports while avoiding persistent storage of uploaded resumes."],
    context: "Resume analysis is rule-based and does not require an external AI service or API key. Uploaded resumes are not persisted.",
    status: "Live",
    github: "",
    demo: "https://resume-analyzer-gamma-rouge.vercel.app/",
    visual: "elevix"
  },
  {
    id: "mindspace",
    title: "MINDSPACE — Personal Productivity Workspace",
    categoryLabel: "PERSONAL PRODUCTIVITY & PLANNING",
    categories: ["web"],
    description: "A responsive productivity workspace for tasks, planning, focus sessions, habits, goals, and progress insights, designed to turn scattered thoughts into a more intentional daily routine.",
    problem: "Keeping tasks, notes, schedules, focus time, and goals in separate tools makes it harder to plan intentionally and understand progress over time.",
    technologies: ["React", "TypeScript", "Vite", "Supabase", "Recharts", "Framer Motion"],
    features: ["Manage tasks with priorities, statuses, subtasks, list and Kanban views, search, filters, and sorting.", "Plan tasks and deadlines with month, week, and day calendar views, time blocks, and rescheduling.", "Capture searchable, tagged, categorized, pinnable notes and turn them into tasks.", "Generate and adjust daily schedules using selected tasks, estimates, working hours, energy level, and break preferences.", "Track focus sessions, habits, goals, milestones, and weekly reflections.", "Review productivity trends from task completions, focus sessions, habits, and goals."],
    contribution: ["Built a responsive personal productivity app that brings task management, planning, focus sessions, habits, goals, and insights into one workspace.", "Implemented list and Kanban task views, calendar scheduling, Brain Dump notes, deterministic daily planning, and productivity tracking.", "Connected browser-stored tasks and schedules with Supabase-backed notes and productivity records."],
    context: "Daily schedules are generated using deterministic planning rules, not AI. Tasks and schedules use browser storage while notes and productivity records use Supabase.",
    status: "Live",
    github: "",
    demo: "https://personal-task-manager-five-pink.vercel.app/",
    visual: "mindspace"
  }
];

const createProjectVisual = (visual) => {
  if (visual === "emergency") {
    return `<div class="project-preview project-preview--emergency" aria-hidden="true"><div class="map-grid"></div><span class="map-route"></span><span class="map-marker marker-ambulance">✚</span><span class="map-marker marker-hospital">+</span><span class="map-marker marker-hospital marker-hospital-two">+</span><div class="emergency-panel"><small>LIVE RESPONSE</small><strong>3 ACTIVE CASES</strong><i></i><i></i><i></i></div></div>`;
  }
  if (visual === "retail") {
    return `<div class="project-preview project-preview--retail" aria-hidden="true"><div class="store-header"><span>shop.</span><b>⌕</b><b>◌</b></div><div class="store-products"><i></i><i></i><i></i></div><div class="store-product-lines"><b></b><b></b><b></b></div></div>`;
  }
  if (visual === "campusly") {
    return `<div class="project-preview project-preview--campusly" aria-hidden="true"><div class="campusly-sidebar"><b>C</b><i></i><i></i><i></i><i></i></div><div class="campusly-content"><small>STUDENT OVERVIEW</small><strong>Campusly</strong><div class="campusly-metrics"><i><b></b><b></b></i><i><b></b><b></b></i><i><b></b><b></b></i></div><div class="campusly-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>`;
  }
  if (visual === "elevix") {
    return `<div class="project-preview project-preview--elevix" aria-hidden="true"><div class="elevix-sidebar"><b>E</b><i></i><i></i><i></i></div><div class="elevix-content"><small>CAREER INTELLIGENCE</small><strong>Resume insights</strong><div class="elevix-score"><b>82</b><span>Resume readiness</span><i></i></div><div class="elevix-skills"><i></i><i></i><i></i><i></i></div><div class="elevix-report"></div></div></div>`;
  }
  if (visual === "mindspace") {
    return `<div class="project-preview project-preview--mindspace" aria-hidden="true"><div class="mindspace-sidebar"><b>M</b><i></i><i></i><i></i><i></i></div><div class="mindspace-content"><small>YOUR DAY, IN FOCUS</small><strong>Today</strong><div class="mindspace-progress"><i></i><span>Tasks in progress</span></div><div class="mindspace-tasks"><i><b></b><span></span></i><i><b></b><span></span></i><i><b></b><span></span></i></div><div class="mindspace-focus"><b>25:00</b><span>FOCUS SESSION</span></div></div></div>`;
  }
  if (visual === "smartprint") {
    return `<div class="project-preview project-preview--smartprint"><img src="project-images/smartprint-homepage.png" alt="SmartPrint customer ordering page with PDF upload, page analysis, and print checkout." loading="lazy"></div>`;
  }
  return `<div class="project-preview project-preview--printing" aria-hidden="true"><div class="print-sidebar"><i></i><i></i><i></i></div><div class="print-content"><small>PRINT QUEUE</small><strong>DOCUMENT WORKFLOW</strong><div class="print-jobs"><i></i><i></i><i></i></div></div></div>`;
};

const createProjectLinks = (project, compact = false) => {
  const links = [];
  if (project.github) links.push(`<a class="project-link project-link--secondary" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);
  if (project.demo) links.push(`<a class="project-link project-link--secondary" href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`);
  return compact && links.length === 0 ? "" : links.join("");
};

const renderFeaturedProjects = () => {
  if (!homeFeaturedProjects) return;
  const featuredProjects = projects.filter((project) => project.featured);
  const selectedProjects = [...featuredProjects, ...projects.filter((project) => !project.featured)].slice(0, 2);
  homeFeaturedProjects.innerHTML = selectedProjects.map((project) => `
    <article class="home-project-card">
      <div class="home-project-preview">${createProjectVisual(project.visual)}</div>
      <div class="home-project-info">
        <p class="project-type">${project.categoryLabel}</p>
        <h3><a href="/projects#${project.id}">${project.title}</a></h3>
        <p>${project.description}</p>
        <div class="tags">${project.technologies.slice(0, 3).map((technology) => `<span>${technology}</span>`).join("")}</div>
        <a class="text-link" href="/projects#${project.id}">Project details <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  `).join("");
};

const renderProjects = (filter = "all") => {
  if (!projectShowcase) return;
  const visibleProjects = projects.filter((project) => filter === "all" || project.categories.includes(filter));
  projectShowcase.innerHTML = visibleProjects.map((project, index) => `
    <article class="showcase-card ${project.featured ? "showcase-card--featured" : ""}" id="${project.id}" data-project-id="${project.id}">
      ${createProjectVisual(project.visual)}
      <div class="showcase-info">
        <div class="showcase-topline"><p class="project-type">${project.categoryLabel}</p><span class="status-badge status-configurable">${project.status}</span></div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${project.technologies.map((technology) => `<span>${technology}</span>`).join("")}</div>
        <ul class="project-feature-list">${project.features.slice(0, 3).map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <div class="showcase-actions"><button class="button button-primary project-details-button" type="button" data-project-details="${project.id}">View Details <span>↗</span></button>${createProjectLinks(project, true) || '<span class="project-link-note">Repository link not listed</span>'}</div>
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
  const screenshotContainer = projectModal.querySelector("#modal-project-screenshots");
  screenshotContainer.replaceChildren();
  (project.screenshots || []).forEach((screenshot) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = screenshot.src;
    image.alt = screenshot.alt;
    image.loading = "lazy";
    figure.append(image);
    screenshotContainer.append(figure);
  });
  screenshotContainer.hidden = !(project.screenshots || []).length;
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

renderFeaturedProjects();
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

const closeMobileNavigation = () => {
  navLinks?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks?.classList.contains("open")) {
    closeMobileNavigation();
    menuToggle?.focus();
  }
});

const updateNavigation = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
  backToTop?.classList.toggle("is-visible", window.scrollY > 520);
};

window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) closeMobileNavigation();
  updateNavigation();
});
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

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isValid = contactFields.map(validateContactField).every(Boolean);
  if (!isValid) {
    if (formStatus) {
      formStatus.textContent = "Please review the highlighted fields.";
      formStatus.classList.add("is-error");
    }
    return;
  }
  const submitButton = contactForm.querySelector(".form-submit");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
  }
  if (formStatus) {
    formStatus.textContent = "Sending your message...";
    formStatus.classList.remove("is-error");
  }
  if (emailAppButton) emailAppButton.hidden = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Form submission failed with status ${response.status}.`);
    contactForm.reset();
    if (formStatus) formStatus.textContent = "Thanks for reaching out! Your message was sent successfully.";
  } catch (error) {
    console.error("Contact form submission failed:", error);
    if (formStatus) {
      formStatus.textContent = "Your message could not be sent right now. Please try again or email me directly.";
      formStatus.classList.add("is-error");
    }
    if (emailAppButton) emailAppButton.hidden = false;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  }
});

emailAppButton?.addEventListener("click", () => {
  const name = document.querySelector("#contact-name")?.value.trim() ?? "";
  const email = document.querySelector("#contact-email")?.value.trim() ?? "";
  const subject = document.querySelector("#contact-subject")?.value.trim() ?? "";
  const message = document.querySelector("#contact-message")?.value.trim() ?? "";
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:krishnaprasadkurmi99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});