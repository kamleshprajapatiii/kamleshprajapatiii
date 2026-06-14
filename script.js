const root = document.documentElement;
const siteHeader = document.querySelector(".site-header");
const typedRole = document.querySelector("#typedRole");
const floatingCta = document.querySelector(".floating-cta");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    const target = href === "#top" ? document.querySelector(".hero-section") : document.querySelector(href);

    return target ? { link, target } : null;
  })
  .filter(Boolean);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");
const whatsappLink =
  "https://wa.me/917043541304?text=Hi+Kamlesh%2C+I+saw+your+portfolio+and+wanted+to+discuss+a+project.";

const roles = [
  "Full-Stack Developer",
  "React + Laravel Expert",
  "SaaS Builder",
  "AI Integrations",
];

const projectGalleries = {
  "restaurant-online-ordering-system": {
    title: "Restaurant Online Ordering System",
    images: [
      {
        src: "images/restaurant-online-ordering-system/menu.svg",
        alt: "Restaurant online ordering menu screen",
        caption: "A simple menu screen where customers can browse, choose, and add items without calling the restaurant.",
      },
      {
        src: "images/restaurant-online-ordering-system/cart.svg",
        alt: "Restaurant online ordering cart screen",
        caption: "A clear cart review with quantities, notes, taxes, delivery fee, and final total.",
      },
      {
        src: "images/restaurant-online-ordering-system/checkout.svg",
        alt: "Restaurant online ordering checkout screen",
        caption: "A smooth checkout flow for address, payment, and order confirmation.",
      },
      {
        src: "images/restaurant-online-ordering-system/kitchen-orders.svg",
        alt: "Restaurant kitchen order management screen",
        caption: "A kitchen board that helps staff track every order from received to delivered.",
      },
      {
        src: "images/restaurant-online-ordering-system/admin-dashboard.svg",
        alt: "Restaurant admin dashboard screen",
        caption: "An admin dashboard for orders, revenue, menu updates, and daily operations.",
      },
    ],
  },
  "saas-analytics-dashboard": {
    title: "SaaS Analytics Dashboard",
    images: [
      {
        src: "images/saas-analytics-dashboard/overview.svg",
        alt: "SaaS analytics dashboard overview screen",
        caption: "A founder-friendly overview of MRR, users, churn, ARPU, and growth trends.",
      },
      {
        src: "images/saas-analytics-dashboard/revenue.svg",
        alt: "SaaS revenue analytics screen",
        caption: "Revenue analytics that make plans, invoices, refunds, and growth easier to review.",
      },
      {
        src: "images/saas-analytics-dashboard/users.svg",
        alt: "SaaS user segmentation screen",
        caption: "User cohorts and account health views for better product and customer decisions.",
      },
      {
        src: "images/saas-analytics-dashboard/reports.svg",
        alt: "SaaS reports screen",
        caption: "Export-ready weekly reports built from real product and billing data.",
      },
      {
        src: "images/saas-analytics-dashboard/settings.svg",
        alt: "SaaS workspace settings screen",
        caption: "Workspace settings for team roles, integrations, billing sync, and permissions.",
      },
    ],
  },
  "e-commerce-booking-platform": {
    title: "E-commerce Booking Platform",
    images: [
      {
        src: "images/e-commerce-booking-platform/storefront.svg",
        alt: "E-commerce booking platform storefront screen",
        caption: "A storefront that shows products, availability, and booking slots in one place.",
      },
      {
        src: "images/e-commerce-booking-platform/booking-calendar.svg",
        alt: "E-commerce booking calendar screen",
        caption: "A booking calendar with blocked dates, capacity rules, and available slots.",
      },
      {
        src: "images/e-commerce-booking-platform/checkout.svg",
        alt: "E-commerce booking checkout screen",
        caption: "Checkout that combines cart details, booking info, and payment capture.",
      },
      {
        src: "images/e-commerce-booking-platform/admin-orders.svg",
        alt: "E-commerce booking admin orders screen",
        caption: "An admin pipeline for booking status, payment state, and fulfillment.",
      },
      {
        src: "images/e-commerce-booking-platform/analytics.svg",
        alt: "E-commerce booking analytics screen",
        caption: "Analytics for revenue, capacity, slot usage, and checkout conversion.",
      },
    ],
  },
};

const techTickerItems = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "Bootstrap",
  "Tailwind CSS",
  "React.js",
  "Vue.js",
  "Angular",
  "Next.js",
  "Redux",
  "Core PHP",
  "Laravel",
  "CodeIgniter",
  "Yii",
  "CakePHP",
  "Node.js",
  "Express.js",
  "Django",
  "MySQL",
  "MariaDB",
  "PostgreSQL",
  "Firebase",
  "MongoDB",
  "REST API",
  "GraphQL",
  "SOAP",
  "WebSocket",
  "JWT",
  "OAuth 2.0",
  "Laravel Sanctum",
  "Laravel Passport",
  "Auth0",
  "Firebase Auth",
  "Apache",
  "Nginx",
  "Docker",
  "GitHub Actions",
  "GitLab CI/CD",
  "AWS",
  "Google Cloud",
  "Microsoft Azure",
  "Git",
  "GitHub",
  "GitLab",
  "Vite",
  "Webpack",
  "PHPUnit",
  "WordPress",
  "Socket.IO",
  "WebSockets",
  "Firebase Realtime Database",
  "Stripe",
  "Razorpay",
  "PayPal",
  "PayU",
  "CCAvenue",
  "Elasticsearch",
  "OpenSearch",
  "React Native",
  "Flutter",
  "Ionic",
  "OpenAI API",
  "Gemini API",
  "Claude API",
];

let roleIndex = 0;
let charIndex = 0;
let scrollFrame = null;
let activeGallery = null;
let activeGalleryIndex = 0;

function canAnimate() {
  return !reducedMotion.matches;
}

function buildTechTicker() {
  const tickerTrack = document.querySelector("[data-tech-ticker]");

  if (!tickerTrack) {
    return;
  }

  const groups = Array.from({ length: 4 }, () => {
    const group = document.createElement("div");
    group.className = "ticker-group";

    techTickerItems.forEach((item) => {
      const itemNode = document.createElement("span");
      itemNode.textContent = item;
      group.appendChild(itemNode);
    });

    return group;
  });

  tickerTrack.replaceChildren(...groups);
}

function typeRole() {
  if (!typedRole) {
    return;
  }

  if (!canAnimate()) {
    typedRole.textContent = roles[0];
    return;
  }

  const currentRole = roles[roleIndex];
  typedRole.textContent = currentRole.slice(0, charIndex);

  if (charIndex < currentRole.length) {
    charIndex += 1;
    window.setTimeout(typeRole, 42);
    return;
  }

  window.setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    typedRole.textContent = "";
    typeRole();
  }, 2500);
}

function setupScrollReveal() {
  const revealPanels = document.querySelectorAll(".reveal-panel");
  root.classList.add("native-reveal");

  if (!canAnimate() || !("IntersectionObserver" in window)) {
    revealPanels.forEach((panel) => panel.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealPanels.forEach((panel) => revealObserver.observe(panel));
}

function setupMobileNavigation() {
  const toggler = document.querySelector(".navbar-toggler");
  const menu = document.querySelector("#primaryNav");

  if (!toggler || !menu) {
    return;
  }

  function closeMenu() {
    menu.classList.remove("show");
    toggler.classList.remove("is-open");
    toggler.setAttribute("aria-expanded", "false");
    toggler.setAttribute("aria-label", "Open navigation");
  }

  toggler.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("show");
    toggler.classList.toggle("is-open", isOpen);
    toggler.setAttribute("aria-expanded", String(isOpen));
    toggler.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function updateNavSurface() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 8);
}

function updateActiveNav() {
  let currentLink = null;
  const activationPoint = window.scrollY + window.innerHeight * 0.55;

  sections.forEach(({ link, target }) => {
    const sectionTop = window.scrollY + target.getBoundingClientRect().top;

    if (sectionTop <= activationPoint) {
      currentLink = link;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link === currentLink;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateFloatingCtaTarget() {
  if (!floatingCta) {
    return;
  }

  const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
  const label = floatingCta.querySelector("span:first-child");

  floatingCta.href = isMobile ? whatsappLink : "#contact";
  floatingCta.target = isMobile ? "_blank" : "";
  floatingCta.rel = isMobile ? "noopener noreferrer" : "";
  floatingCta.setAttribute(
    "aria-label",
    isMobile ? "Message Kamlesh Prajapati on WhatsApp" : "Start a project with Kamlesh Prajapati"
  );

  if (label) {
    label.textContent = isMobile ? "WhatsApp" : "Start a project";
  }
}

function updateFloatingCta() {
  if (!floatingCta) {
    return;
  }

  const contactSection = document.querySelector("#contact");
  const contactTop = contactSection?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
  const shouldShow = window.scrollY > 220 && contactTop > window.innerHeight * 0.72;

  floatingCta.classList.toggle("is-visible", shouldShow);
}

function runScrollEffects() {
  updateNavSurface();
  updateActiveNav();
  updateFloatingCta();
}

function requestScrollEffects() {
  if (scrollFrame) {
    return;
  }

  scrollFrame = requestAnimationFrame(() => {
    runScrollEffects();
    scrollFrame = null;
  });
}

function scrollToTarget(target) {
  const headerOffset = siteHeader?.offsetHeight ?? 0;
  const top =
    target.id === "top"
      ? 0
      : window.scrollY + target.getBoundingClientRect().top - headerOffset - 12;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: canAnimate() ? "smooth" : "auto",
  });
}

function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#" || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToTarget(target);
      window.history.pushState(null, "", targetId === "#top" ? window.location.pathname : targetId);
    });
  });
}

function setupStackFilters() {
  const filterButtons = [...document.querySelectorAll("[data-stack-filter]")];
  const techGroups = [...document.querySelectorAll("[data-stack-category]")];

  if (!filterButtons.length || !techGroups.length) {
    return;
  }

  function applyFilter(filter) {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.stackFilter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    techGroups.forEach((group) => {
      const categories = group.dataset.stackCategory.split(/\s+/);
      const shouldShow = filter === "all" || categories.includes(filter);
      group.classList.toggle("is-filtered-out", !shouldShow);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.stackFilter);
    });
  });

  applyFilter("all");
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continue to legacy fallback.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function setupEmailCopy() {
  document.querySelectorAll("[data-copy-email]").forEach((link) => {
    const originalText = link.textContent.trim();

    link.addEventListener("click", async (event) => {
      if (link.dataset.copiedOnce === "true") {
        return;
      }

      event.preventDefault();
      const email = link.dataset.copyEmail;
      let copied = false;

      try {
        copied = await copyTextToClipboard(email);
      } catch {
        copied = false;
      }

      link.dataset.copiedOnce = "true";
      link.classList.add("is-copied");
      link.textContent = copied ? "Email copied" : "Email ready";

      window.setTimeout(() => {
        link.textContent = originalText;
        link.classList.remove("is-copied");
        delete link.dataset.copiedOnce;
      }, 1700);
    });
  });
}

function setupCustomCursor() {
  if (!cursorDot || !cursorRing || !canAnimate() || coarsePointer.matches) {
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;

  document.body.classList.add("has-custom-cursor");

  function renderCursor() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;

    cursorDot.style.left = `${targetX}px`;
    cursorDot.style.top = `${targetY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }

  document.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    document.body.classList.add("cursor-visible");
  });

  document.addEventListener("pointerover", (event) => {
    document.body.classList.toggle(
      "cursor-hovering",
      Boolean(event.target.closest("a, button, input, textarea, select"))
    );
  });

  document.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-visible", "cursor-hovering");
  });

  renderCursor();
}

function setupProjectGallery() {
  const modal = document.querySelector("#projectGallery");
  const title = modal?.querySelector("#galleryTitle");
  const image = modal?.querySelector("[data-gallery-image]");
  const caption = modal?.querySelector("[data-gallery-caption]");
  const count = modal?.querySelector("[data-gallery-count]");
  const thumbs = modal?.querySelector("[data-gallery-thumbs]");
  const prevButton = modal?.querySelector("[data-gallery-prev]");
  const nextButton = modal?.querySelector("[data-gallery-next]");
  const triggers = document.querySelectorAll("[data-gallery]");

  if (!modal || !title || !image || !caption || !count || !thumbs || !triggers.length) {
    return;
  }

  function renderGallery() {
    if (!activeGallery) {
      return;
    }

    const item = activeGallery.images[activeGalleryIndex];
    title.textContent = activeGallery.title;
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.caption;
    count.textContent = `${activeGalleryIndex + 1} / ${activeGallery.images.length}`;

    thumbs.querySelectorAll("button").forEach((button, index) => {
      button.classList.toggle("is-active", index === activeGalleryIndex);
    });
  }

  function buildThumbs() {
    thumbs.replaceChildren(
      ...activeGallery.images.map((item, index) => {
        const button = document.createElement("button");
        const thumb = document.createElement("img");

        button.type = "button";
        button.setAttribute("aria-label", `View screenshot ${index + 1}`);
        thumb.src = item.src;
        thumb.alt = "";
        thumb.loading = "lazy";
        button.appendChild(thumb);
        button.addEventListener("click", () => {
          activeGalleryIndex = index;
          renderGallery();
        });

        return button;
      })
    );
  }

  function openGallery(galleryKey) {
    activeGallery = projectGalleries[galleryKey];

    if (!activeGallery) {
      return;
    }

    activeGalleryIndex = 0;
    buildThumbs();
    renderGallery();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector("[data-gallery-close]")?.focus();
  }

  function closeGallery() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeGallery = null;
  }

  function moveGallery(direction) {
    if (!activeGallery) {
      return;
    }

    activeGalleryIndex =
      (activeGalleryIndex + direction + activeGallery.images.length) % activeGallery.images.length;
    renderGallery();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openGallery(trigger.dataset.gallery);
    });
  });

  modal.querySelectorAll("[data-gallery-close]").forEach((button) => {
    button.addEventListener("click", closeGallery);
  });

  prevButton?.addEventListener("click", () => moveGallery(-1));
  nextButton?.addEventListener("click", () => moveGallery(1));

  document.addEventListener("keydown", (event) => {
    if (!activeGallery) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
    } else if (event.key === "ArrowLeft") {
      moveGallery(-1);
    } else if (event.key === "ArrowRight") {
      moveGallery(1);
    }
  });
}

function init() {
  buildTechTicker();
  typeRole();
  setupScrollReveal();
  setupMobileNavigation();
  setupSmoothAnchors();
  setupStackFilters();
  setupEmailCopy();
  setupCustomCursor();
  setupProjectGallery();
  updateFloatingCtaTarget();
  runScrollEffects();
  window.setTimeout(runScrollEffects, 120);
  window.setTimeout(runScrollEffects, 420);
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", runScrollEffects);
window.addEventListener("hashchange", runScrollEffects);
window.addEventListener("scroll", requestScrollEffects, { passive: true });
window.addEventListener(
  "resize",
  () => {
    updateFloatingCtaTarget();
    runScrollEffects();
  },
  { passive: true }
);
